package main

import (
	"context"
	"fmt"
	"net/http"
	"net/http/httputil"
	"net/url"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/gorilla/mux"
	"github.com/heptiolabs/healthcheck"
	"github.com/kubeapps_plus/cmd/tiller-proxy/internal/handler"
	"github.com/spf13/pflag"
	"github.com/urfave/negroni"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/rest"
	"k8s.io/helm/pkg/helm"
	"k8s.io/helm/pkg/helm/environment"
	"k8s.io/helm/pkg/tlsutil"

	appRepo "github.com/kubeapps_plus/cmd/apprepository-controller/pkg/client/clientset/versioned"
	chartUtils "github.com/kubeapps_plus/pkg/chart"
	tillerProxy "github.com/kubeapps_plus/pkg/proxy"
	log "github.com/sirupsen/logrus"
	helmChartUtil "k8s.io/helm/pkg/chartutil"
)

var (
	settings    environment.EnvSettings
	proxy       *tillerProxy.Proxy
	kubeClient  kubernetes.Interface
	disableAuth bool
	listLimit   int
	timeout     int64

	tlsCaCertFile string // TLS CA证书文件的路径
	tlsCertFile   string // TLS证书文件的路径
	tlsKeyFile    string // TLS密钥文件的路径
	tlsVerify     bool   // 启用TLS并验证远程证书
	tlsEnable     bool   // 启用TLS

	tlsCaCertDefault = fmt.Sprintf("%s/ca.crt", os.Getenv("HELM_HOME"))
	tlsCertDefault   = fmt.Sprintf("%s/tls.crt", os.Getenv("HELM_HOME"))
	tlsKeyDefault    = fmt.Sprintf("%s/tls.key", os.Getenv("HELM_HOME"))

	chartsvcURL string
)

func init() {
	settings.AddFlags(pflag.CommandLine)
	// TLS Flags
	pflag.StringVar(&tlsCaCertFile, "tls-ca-cert", tlsCaCertDefault, "path to TLS CA certificate file")
	pflag.StringVar(&tlsCertFile, "tls-cert", tlsCertDefault, "path to TLS certificate file")
	pflag.StringVar(&tlsKeyFile, "tls-key", tlsKeyDefault, "path to TLS key file")
	pflag.BoolVar(&tlsVerify, "tls-verify", false, "enable TLS for request and verify remote")
	pflag.BoolVar(&tlsEnable, "tls", false, "enable TLS for request")
	pflag.BoolVar(&disableAuth, "disable-auth", false, "Disable authorization check")
	pflag.IntVar(&listLimit, "list-max", 256, "maximum number of releases to fetch")
	pflag.StringVar(&userAgentComment, "user-agent-comment", "", "UserAgent comment used during outbound requests")
	// Default timeout from https://github.com/helm/helm/blob/b0b0accdfc84e154b3d48ec334cd5b4f9b345667/cmd/helm/install.go#L216
	pflag.Int64Var(&timeout, "timeout", 300, "Timeout to perform release operations (install, upgrade, rollback, delete)")
	pflag.StringVar(&chartsvcURL, "chartsvc-url", "http://kubeapps-internal-chartsvc:8080", "URL to the internal chartsvc")
}

func main() {
	pflag.Parse()

	//环境设置默认值
	settings.Init(pflag.CommandLine)

	config, err := rest.InClusterConfig()
	if err != nil {
		log.Fatalf("Unable to get cluster config: %v", err)
	}

	kubeClient, err = kubernetes.NewForConfig(config)
	if err != nil {
		log.Fatalf("Unable to create a kubernetes client: %v", err)
	}

	appRepoClient, err := appRepo.NewForConfig(config)
	if err != nil {
		log.Fatalf("Unable to create an app repository client: %v", err)
	}

	log.Printf("Using tiller host: %s", settings.TillerHost)
	helmOptions := []helm.Option{helm.Host(settings.TillerHost)}
	if tlsVerify || tlsEnable {
		if tlsCaCertFile == "" {
			tlsCaCertFile = settings.Home.TLSCaCert()
		}
		if tlsCertFile == "" {
			tlsCertFile = settings.Home.TLSCert()
		}
		if tlsKeyFile == "" {
			tlsKeyFile = settings.Home.TLSKey()
		}
		log.Printf("Using Key=%q, Cert=%q, CA=%q", tlsKeyFile, tlsCertFile, tlsCaCertFile)
		tlsopts := tlsutil.Options{KeyFile: tlsKeyFile, CertFile: tlsCertFile, InsecureSkipVerify: true}
		if tlsVerify {
			tlsopts.CaCertFile = tlsCaCertFile
			tlsopts.InsecureSkipVerify = false
		}
		tlscfg, err := tlsutil.ClientConfig(tlsopts)
		if err != nil {
			log.Fatal(err)
		}
		helmOptions = append(helmOptions, helm.WithTLS(tlscfg))
		helmClient := helm.NewClient(helmOptions...)
		err = helmClient.PingTiller()
		if err != nil {
			log.Fatalf("Unable to connect to Tiller: %v", err)
		}

		proxy = tillerProxy.NewProxy(kubeClient, helmClient, timeout)
		chartutils := chartUtils.NewChart(kubeClient, appRepoClient, helmChartUtil.LoadArchive, userAgent())

		r := mux.NewRouter()

		// Healthcheck
		health := healthcheck.NewHandler()
		r.Handle("/live", health)
		r.Handle("/ready", health)

		authGate := handler.AuthGate()

		// HTTP Handler
		h := handler.TillerProxy{
			DisableAuth: disableAuth,
			ListLimit:   listLimit,
			ChartClient: chartutils,
			ProxyClient: proxy,
		}

		// Routes
		apiv1 := r.PathPrefix("/v1").Subrouter()
		apiv1.Methods("GET").Path("/releases").Handler(negroni.New(
			authGate,
			negroni.Wrap(handler.WithoutParams(h.ListAllReleases)),
		))
		apiv1.Methods("GET").Path("/namespaces/{namespace}/releases").Handler(negroni.New(
			authGate,
			negroni.Wrap(handler.WithParams(h.ListReleases)),
		))
		apiv1.Methods("POST").Path("/namespaces/{namespace}/releases").Handler(negroni.New(
			authGate,
			negroni.Wrap(handler.WithParams(h.CreateRelease)),
		))
		apiv1.Methods("GET").Path("/namespaces/{namespace}/releases/{releaseName}").Handler(negroni.New(
			authGate,
			negroni.Wrap(handler.WithParams(h.GetRelease)),
		))
		apiv1.Methods("PUT").Path("/namespaces/{namespace}/releases/{releaseName}").Handler(negroni.New(
			authGate,
			negroni.Wrap(handler.WithParams(h.OperateRelease)),
		))
		apiv1.Methods("DELETE").Path("/namespaces/{namespace}/releases/{releaseName}").Handler(negroni.New(
			authGate,
			negroni.Wrap(handler.WithParams(h.DeleteRelease)),
		))

		// Chartsvc reverse proxy
		parsedChartsvcURL, err := url.Parse(chartsvcURL)
		if err != nil {
			log.Fatalf("Unable to parse the chartsvc URL: %v", err)
		}
		chartsvcProxy := httputil.NewSingleHostReverseProxy(parsedChartsvcURL)
		chartsvcPrefix := "/chartsvc"
		chartsvcRouter := r.PathPrefix(chartsvcPrefix).Subrouter()

		//Logos不需要验证，因此请跳过该步骤
		chartsvcRouter.Methods("GET").Path("/v1/assets/{repo}/{id}/logo").Handler(negroni.New(
			negroni.Wrap(http.StripPrefix(chartsvcPrefix, chartsvcProxy)),
		))
		chartsvcRouter.Methods("GET").Handler(negroni.New(
			authGate,
			negroni.Wrap(http.StripPrefix(chartsvcPrefix, chartsvcProxy)),
		))

		n := negroni.Classic()
		n.UseHandler(r)

		port := os.Getenv("PORT")
		if port == "" {
			port = "8080"
		}

		addr := ":" + port

		srv := &http.Server{
			Addr:    addr,
			Handler: n,
		}

		go func() {
			log.WithFields(log.Fields{"addr": addr}).Info("Started Tiller Proxy")
			err = srv.ListenAndServe()
			if err != nil {
				log.Info(err)
			}
		}()

		//捕捉SIGINT和SIGTERM
		//设置发送信号通知的通道。
		c := make(chan os.Signal, 1)
		signal.Notify(c, os.Interrupt, syscall.SIGTERM)
		log.Debug("Set system to get notified on signals")
		s := <-c
		log.Infof("Received signal: %v. Waiting for existing requests to finish", s)
		//设置一个足够高的超时值，让k8s终止宽限期秒生效
		//相应地，如果需要，发送一个SIGKILL
		ctx, cancel := context.WithTimeout(context.Background(), time.Second*3600)
		defer cancel()
		//如果没有连接，则不阻止，否则将等待
		//直到最后期限
		srv.Shutdown(ctx)
		log.Info("All requests have been served. Exiting")
		os.Exit(0)
	}
}
