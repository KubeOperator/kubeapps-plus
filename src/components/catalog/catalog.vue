<template>
  <div class="catalog-content">
    <el-row>
      <el-col :span="24">
        <div class="grid-content">
          <h1 style="float: left">{{$t('message.catalog')}}</h1>
          <el-input class="catalog-search"
                  :placeholder="$t('message.search_charts')"
                  prefix-icon="el-icon-search"
                  v-model="input"
                  clearable>
          </el-input>
        </div>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" v-for="catalog in catalogList" :key="catalog.attributes.name" class="el-col">
        <el-card :body-style="{ padding: '0px' }">
          <div class="catalog-image">
            <img v-show="catalog.attributes.icon" :src="catalog.attributes.icon" class="image">
            <img v-show="!catalog.attributes.icon" src="../../.././static/catalog/default.png" class="image">
          </div>
          <div style="padding: 1em;">
            <h3 class="catalog-label">{{catalog.attributes.name}}</h3>
            <h5 class="catalog-desc">{{catalog.attributes.description}}</h5>
            <div class="bottom clearfix">
              <el-button type="text" class="button-left" disabled>
                <i class="iconfont">&#xe67b;</i>&nbsp;{{catalog.relationships.latestChartVersion.data.app_version ? catalog.relationships.latestChartVersion.data.app_version : catalog.relationships.latestChartVersion.data.version}}
              </el-button>
              <el-button size="medium" type="primary" class="button-right" v-show="catalog.id.indexOf('stable') > -1
              || catalog.id.indexOf('bitnami') > -1 || catalog.id.indexOf('svc-cat') > -1" round>
                  {{catalog.id | splitName(catalog.id)}}
              </el-button>
              <el-button type="warning" class="button-right" v-show="catalog.id.indexOf('incubator') > -1" round>
                  {{catalog.id | splitName(catalog.id)}}
              </el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  let catalogList = []
export default {
  name: "catalog",
  data(){
    return {
      input: '',
      currentDate: new Date(),
      catalogList: catalogList
    }
  },
  created() {
    this.init()
  },
  methods:{
    init(){
      this.catalogList =  [
          {
              "id": "stable/aerospike",
              "type": "chart",
              "attributes": {
                  "name": "aerospike",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "A Helm chart for Aerospike in Kubernetes",
                  "home": "http://aerospike.com",
                  "keywords": [
                      "aerospike",
                      "big-data"
                  ],
                  "maintainers": [
                      {
                          "name": "kavehmz",
                          "email": "kavehmz@gmail.com"
                      },
                      {
                          "name": "okgolove",
                          "email": "okgolove@markeloff.net"
                      }
                  ],
                  "sources": [
                      "https://github.com/aerospike/aerospike-server"
                  ],
                  "icon": "/v1/assets/stable/aerospike/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/aerospike"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.2.11",
                          "app_version": "v4.5.0.5",
                          "created": "2019-11-06T08:58:33.545Z",
                          "digest": "36339323b0e1c3c07b64e15bfff0e6151435a421e52fca557e61d11ff80f0cc1",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/aerospike-0.2.11.tgz"
                          ],
                          "readme": "/v1/assets/stable/aerospike/versions/0.2.11/README.md",
                          "values": "/v1/assets/stable/aerospike/versions/0.2.11/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/aerospike/versions/0.2.11"
                      }
                  }
              }
          },
          {
              "id": "stable/airflow",
              "type": "chart",
              "attributes": {
                  "name": "airflow",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Airflow is a platform to programmatically author, schedule and monitor workflows",
                  "home": "https://airflow.apache.org/",
                  "keywords": [
                      "workflow",
                      "dag"
                  ],
                  "maintainers": [
                      {
                          "name": "gsemet",
                          "email": "gaetan@xeberon.net"
                      }
                  ],
                  "sources": [
                      "https://airflow.apache.org/"
                  ],
                  "icon": "/v1/assets/stable/airflow/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/airflow"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "4.2.0",
                          "app_version": "1.10.4",
                          "created": "2019-11-06T08:58:33.548Z",
                          "digest": "988d86594c62413e045574671b853755c8bfabc27645651f3a1873daef967d72",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/airflow-4.2.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/airflow/versions/4.2.0/README.md",
                          "values": "/v1/assets/stable/airflow/versions/4.2.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/airflow/versions/4.2.0"
                      }
                  }
              }
          },
          {
              "id": "bitnami/airflow",
              "type": "chart",
              "attributes": {
                  "name": "airflow",
                  "repo": {
                      "name": "bitnami",
                      "url": "https://charts.bitnami.com/bitnami"
                  },
                  "description": "Apache Airflow is a platform to programmatically author, schedule and monitor workflows.",
                  "home": "https://airflow.apache.org/",
                  "keywords": [
                      "apache",
                      "airflow",
                      "workflow",
                      "dag"
                  ],
                  "maintainers": [
                      {
                          "name": "Bitnami",
                          "email": "containers@bitnami.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/bitnami/bitnami-docker-airflow"
                  ],
                  "icon": "/v1/assets/bitnami/airflow/logo"
              },
              "links": {
                  "self": "/v1/charts/bitnami/airflow"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "4.0.9",
                          "app_version": "1.10.5",
                          "created": "2019-11-06T09:38:39.575Z",
                          "digest": "c9ac833c08a06b1899bff04003453ad57f911107a9e882ae801501908b3e50d3",
                          "urls": [
                              "https://charts.bitnami.com/bitnami/airflow-4.0.9.tgz"
                          ],
                          "readme": "/v1/assets/bitnami/airflow/versions/4.0.9/README.md",
                          "values": "/v1/assets/bitnami/airflow/versions/4.0.9/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/bitnami/airflow/versions/4.0.9"
                      }
                  }
              }
          },
          {
              "id": "stable/ambassador",
              "type": "chart",
              "attributes": {
                  "name": "ambassador",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "A Helm chart for Datawire Ambassador",
                  "home": "https://www.getambassador.io/",
                  "keywords": [
                      "api gateway",
                      "ambassador",
                      "datawire",
                      "envoy"
                  ],
                  "maintainers": [
                      {
                          "name": "flydiverny",
                          "email": "markus@maga.se"
                      },
                      {
                          "name": "kflynn",
                          "email": "flynn@datawire.io"
                      },
                      {
                          "name": "nbkrause",
                          "email": "nkrause@datawire.io"
                      }
                  ],
                  "sources": [
                      "https://github.com/datawire/ambassador",
                      "https://github.com/prometheus/statsd_exporter"
                  ],
                  "icon": "/v1/assets/stable/ambassador/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/ambassador"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "4.4.4",
                          "app_version": "0.85.0",
                          "created": "2019-11-06T08:58:33.549Z",
                          "digest": "e68e5c99cc095eb39ccc914e886724bd91a545ff429417e5a961133aae91c563",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/ambassador-4.4.4.tgz"
                          ],
                          "readme": "/v1/assets/stable/ambassador/versions/4.4.4/README.md",
                          "values": "/v1/assets/stable/ambassador/versions/4.4.4/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/ambassador/versions/4.4.4"
                      }
                  }
              }
          },
          {
              "id": "stable/anchore-engine",
              "type": "chart",
              "attributes": {
                  "name": "anchore-engine",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Anchore container analysis and policy evaluation engine service",
                  "home": "https://anchore.com",
                  "keywords": [
                      "analysis",
                      "docker",
                      "anchore",
                      "anchore-engine",
                      "image",
                      "security",
                      "vulnerability",
                      "scanner"
                  ],
                  "maintainers": [
                      {
                          "name": "zhill",
                          "email": "zach@anchore.com"
                      },
                      {
                          "name": "btodhunter",
                          "email": "bradyt@anchore.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/anchore/anchore-engine"
                  ],
                  "icon": "/v1/assets/stable/anchore-engine/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/anchore-engine"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.3.4",
                          "app_version": "0.5.1",
                          "created": "2019-11-06T08:58:33.553Z",
                          "digest": "3abed6d5a124c1ef240e9b56993de368355864d3094731ca9ac1b363b1de531b",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/anchore-engine-1.3.4.tgz"
                          ],
                          "readme": "/v1/assets/stable/anchore-engine/versions/1.3.4/README.md",
                          "values": "/v1/assets/stable/anchore-engine/versions/1.3.4/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/anchore-engine/versions/1.3.4"
                      }
                  }
              }
          },
          {
              "id": "bitnami/apache",
              "type": "chart",
              "attributes": {
                  "name": "apache",
                  "repo": {
                      "name": "bitnami",
                      "url": "https://charts.bitnami.com/bitnami"
                  },
                  "description": "Chart for Apache HTTP Server",
                  "home": "https://httpd.apache.org",
                  "keywords": [
                      "apache",
                      "http",
                      "https",
                      "www",
                      "web",
                      "reverse proxy"
                  ],
                  "maintainers": [
                      {
                          "name": "Bitnami",
                          "email": "containers@bitnami.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/bitnami/bitnami-docker-apache"
                  ],
                  "icon": "/v1/assets/bitnami/apache/logo"
              },
              "links": {
                  "self": "/v1/charts/bitnami/apache"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "7.2.3",
                          "app_version": "2.4.41",
                          "created": "2019-11-06T09:38:39.583Z",
                          "digest": "d1703c7dead87d9503f38fbbf1950d8997e268df7eeb2387a12e0fc8a205cd3f",
                          "urls": [
                              "https://charts.bitnami.com/bitnami/apache-7.2.3.tgz"
                          ],
                          "readme": "/v1/assets/bitnami/apache/versions/7.2.3/README.md",
                          "values": "/v1/assets/bitnami/apache/versions/7.2.3/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/bitnami/apache/versions/7.2.3"
                      }
                  }
              }
          },
          {
              "id": "stable/apm-server",
              "type": "chart",
              "attributes": {
                  "name": "apm-server",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "The server receives data from the Elastic APM agents and stores the data into a datastore like Elasticsearch",
                  "home": "https://www.elastic.co/solutions/apm",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "mumoshu",
                          "email": "ykuoka@gmail.com"
                      },
                      {
                          "name": "at-k",
                          "email": "atushi.k@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://www.elastic.co/guide/en/apm/get-started/current/index.html"
                  ],
                  "icon": "/v1/assets/stable/apm-server/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/apm-server"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "2.1.5",
                          "app_version": "7.0.0",
                          "created": "2019-11-06T08:58:33.554Z",
                          "digest": "0cf50cc75e3b9104baebd9cde8bc1ef8df62912906935acfd1ead91a684327eb",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/apm-server-2.1.5.tgz"
                          ],
                          "readme": "/v1/assets/stable/apm-server/versions/2.1.5/README.md",
                          "values": "/v1/assets/stable/apm-server/versions/2.1.5/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/apm-server/versions/2.1.5"
                      }
                  }
              }
          },
          {
              "id": "stable/atlantis",
              "type": "chart",
              "attributes": {
                  "name": "atlantis",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "A Helm chart for Atlantis https://www.runatlantis.io",
                  "home": "https://www.runatlantis.io",
                  "keywords": [
                      "terraform"
                  ],
                  "maintainers": [
                      {
                          "name": "jkodroff"
                      },
                      {
                          "name": "callmeradical"
                      },
                      {
                          "name": "jeff-knurek"
                      },
                      {
                          "name": "lkysow"
                      },
                      {
                          "name": "anubhavmishra"
                      }
                  ],
                  "sources": [
                      "https://github.com/runatlantis/atlantis"
                  ],
                  "icon": "/v1/assets/stable/atlantis/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/atlantis"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "3.8.4",
                          "app_version": "v0.8.2",
                          "created": "2019-11-06T08:58:33.56Z",
                          "digest": "1fe457fd2c93648d83e8b327ac108b9af765160e9f9c19f729c117a320cdb89a",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/atlantis-3.8.4.tgz"
                          ],
                          "readme": "/v1/assets/stable/atlantis/versions/3.8.4/README.md",
                          "values": "/v1/assets/stable/atlantis/versions/3.8.4/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/atlantis/versions/3.8.4"
                      }
                  }
              }
          },
          {
              "id": "stable/auditbeat",
              "type": "chart",
              "attributes": {
                  "name": "auditbeat",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "A lightweight shipper to audit the activities of users and processes on your systems",
                  "home": "https://www.elastic.co/products/beats/auditbeat",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "cpanato",
                          "email": "ctadeu@gmail.com"
                      },
                      {
                          "name": "mumoshu",
                          "email": "ykuoka@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://www.elastic.co/guide/en/beats/auditbeat/current/index.html"
                  ],
                  "icon": "/v1/assets/stable/auditbeat/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/auditbeat"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.1.0",
                          "app_version": "6.7.0",
                          "created": "2019-11-06T08:58:33.56Z",
                          "digest": "11d47209f44f4b9a6806c007472b448918df8eb208825afa4c7eecc34e89e9e1",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/auditbeat-1.1.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/auditbeat/versions/1.1.0/README.md",
                          "values": "/v1/assets/stable/auditbeat/versions/1.1.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/auditbeat/versions/1.1.0"
                      }
                  }
              }
          },
          {
              "id": "incubator/aws-alb-ingress-controller",
              "type": "chart",
              "attributes": {
                  "name": "aws-alb-ingress-controller",
                  "repo": {
                      "name": "incubator",
                      "url": "https://kubernetes-charts-incubator.storage.googleapis.com"
                  },
                  "description": "A Helm chart for AWS ALB Ingress Controller",
                  "home": "https://github.com/kubernetes-sigs/aws-alb-ingress-controller",
                  "keywords": [
                      "aws",
                      "ingress"
                  ],
                  "maintainers": [
                      {
                          "name": "bigkraig",
                          "email": "kraig.amador@ticketmaster.com"
                      },
                      {
                          "name": "M00nF1sh",
                          "email": "yyyng@amazon.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/kubernetes-sigs/aws-alb-ingress-controller"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/incubator/aws-alb-ingress-controller"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.1.11",
                          "app_version": "v1.1.3",
                          "created": "2019-11-06T09:29:01.987Z",
                          "digest": "6164a9d02cd29870c0d7db6ce9f6c4862d9b86c22d20b6ef649824e4f12199c8",
                          "urls": [
                              "https://kubernetes-charts-incubator.storage.googleapis.com/aws-alb-ingress-controller-0.1.11.tgz"
                          ],
                          "readme": "/v1/assets/incubator/aws-alb-ingress-controller/versions/0.1.11/README.md",
                          "values": "/v1/assets/incubator/aws-alb-ingress-controller/versions/0.1.11/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/incubator/aws-alb-ingress-controller/versions/0.1.11"
                      }
                  }
              }
          },
          {
              "id": "stable/aws-iam-authenticator",
              "type": "chart",
              "attributes": {
                  "name": "aws-iam-authenticator",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "A Helm chart for aws-iam-authenticator",
                  "home": "https://github.com/kubernetes-sigs/aws-iam-authenticator",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "plumdog",
                          "email": "plummer574@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/kubernetes-sigs/aws-iam-authenticator"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/aws-iam-authenticator"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.1.1",
                          "app_version": "1.0",
                          "created": "2019-11-06T08:58:33.561Z",
                          "digest": "735b9a6b9d106c65c22a1d41d8c34568cf7f91b576096445e9338088ed080110",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/aws-iam-authenticator-0.1.1.tgz"
                          ],
                          "readme": "/v1/assets/stable/aws-iam-authenticator/versions/0.1.1/README.md",
                          "values": "/v1/assets/stable/aws-iam-authenticator/versions/0.1.1/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/aws-iam-authenticator/versions/0.1.1"
                      }
                  }
              }
          },
          {
              "id": "incubator/azuremonitor-containers",
              "type": "chart",
              "attributes": {
                  "name": "azuremonitor-containers",
                  "repo": {
                      "name": "incubator",
                      "url": "https://kubernetes-charts-incubator.storage.googleapis.com"
                  },
                  "description": "Helm chart for deploying Azure Monitor container monitoring agent in Kubernetes",
                  "home": "https://docs.microsoft.com/en-us/azure/monitoring/monitoring-container-health",
                  "keywords": [
                      "monitoring",
                      "azuremonitor",
                      "azure",
                      "oms",
                      "containerinsights",
                      "metric",
                      "event",
                      "logs",
                      "containerhealth",
                      "kubernetesmonitoring",
                      "acs-engine",
                      "aks-engine",
                      "azurestack",
                      "on-prem kubernetes monitoring",
                      "containerlogs",
                      "containerhealth",
                      "containermonitoring",
                      "hybrid kubernetes monitoring",
                      "kubernetes",
                      "kuberneteshealth"
                  ],
                  "maintainers": [
                      {
                          "name": "vishiy",
                          "email": "visnara@microsoft.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/Microsoft/OMS-docker/tree/ci_feature_prod"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/incubator/azuremonitor-containers"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "2.3.0",
                          "app_version": "7.0.0-1",
                          "created": "2019-11-06T09:29:01.988Z",
                          "digest": "ffbb050afbc0882a1f7d69d499f27d43ecf5ed558ff2670d4389d58151f49902",
                          "urls": [
                              "https://kubernetes-charts-incubator.storage.googleapis.com/azuremonitor-containers-2.3.0.tgz"
                          ],
                          "readme": "/v1/assets/incubator/azuremonitor-containers/versions/2.3.0/README.md",
                          "values": "/v1/assets/incubator/azuremonitor-containers/versions/2.3.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/incubator/azuremonitor-containers/versions/2.3.0"
                      }
                  }
              }
          },
          {
              "id": "stable/bitcoind",
              "type": "chart",
              "attributes": {
                  "name": "bitcoind",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Bitcoin is an innovative payment network and a new kind of money.",
                  "home": "https://bitcoin.org/",
                  "keywords": [
                      "bitcoind",
                      "cryptocurrency",
                      "blockchain"
                  ],
                  "maintainers": [
                      {
                          "name": "daniel-yavorovich",
                          "email": "daniel@arilot.com"
                      },
                      {
                          "name": "govale",
                          "email": "shiyanval@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/kubernetes/charts",
                      "https://github.com/kuberstack/bitcoind",
                      "https://github.com/kylemanna/docker-bitcoind"
                  ],
                  "icon": "/v1/assets/stable/bitcoind/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/bitcoind"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.2.2",
                          "app_version": "0.17.1",
                          "created": "2019-11-06T08:58:33.561Z",
                          "digest": "28500f37e87d1d56d5b897bf4be0223c54dc5b8a66da5658633974d85d6958e9",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/bitcoind-0.2.2.tgz"
                          ],
                          "readme": "/v1/assets/stable/bitcoind/versions/0.2.2/README.md",
                          "values": "/v1/assets/stable/bitcoind/versions/0.2.2/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/bitcoind/versions/0.2.2"
                      }
                  }
              }
          },
          {
              "id": "bitnami/bitnami-common",
              "type": "chart",
              "attributes": {
                  "name": "bitnami-common",
                  "repo": {
                      "name": "bitnami",
                      "url": "https://charts.bitnami.com/bitnami"
                  },
                  "description": "Chart with custom templates used in Bitnami charts.",
                  "home": "",
                  "keywords": [
                      "helper",
                      "template",
                      "bitnami",
                      "broker",
                      "service",
                      "catalog"
                  ],
                  "maintainers": [
                      {
                          "name": "Bitnami",
                          "email": "containers@bitnami.com"
                      }
                  ],
                  "sources": [],
                  "icon": "/v1/assets/bitnami/bitnami-common/logo"
              },
              "links": {
                  "self": "/v1/charts/bitnami/bitnami-common"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.0.8",
                          "app_version": "0.0.8",
                          "created": "2019-11-06T09:38:39.584Z",
                          "digest": "d61639c9a71812e3ae9e0437bba69c80426bea7df52b6021badcae4f7a1c970e",
                          "urls": [
                              "https://charts.bitnami.com/bitnami/bitnami-common-0.0.8.tgz"
                          ],
                          "readme": "/v1/assets/bitnami/bitnami-common/versions/0.0.8/README.md",
                          "values": "/v1/assets/bitnami/bitnami-common/versions/0.0.8/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/bitnami/bitnami-common/versions/0.0.8"
                      }
                  }
              }
          },
          {
              "id": "stable/bookstack",
              "type": "chart",
              "attributes": {
                  "name": "bookstack",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "BookStack is a simple, self-hosted, easy-to-use platform for organising and storing information.",
                  "home": "https://www.bookstackapp.com/",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "verwilst",
                          "email": "bart@verwilst.be"
                      }
                  ],
                  "sources": [
                      "https://github.com/BookStackApp/BookStack"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/bookstack"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.1.2",
                          "app_version": "0.27.4-1",
                          "created": "2019-11-06T08:58:33.563Z",
                          "digest": "36770cc637bc310ec2afcc176d3bae8d5a46f32e3218d3b793d27bd77dd15e0f",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/bookstack-1.1.2.tgz"
                          ],
                          "readme": "/v1/assets/stable/bookstack/versions/1.1.2/README.md",
                          "values": "/v1/assets/stable/bookstack/versions/1.1.2/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/bookstack/versions/1.1.2"
                      }
                  }
              }
          },
          {
              "id": "stable/burrow",
              "type": "chart",
              "attributes": {
                  "name": "burrow",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Burrow is a permissionable smart contract machine",
                  "home": "https://github.com/hyperledger/burrow",
                  "keywords": [
                      "blockchain",
                      "smart contracts",
                      "ethereum",
                      "hyperledger",
                      "evm",
                      "web3"
                  ],
                  "maintainers": [
                      {
                          "name": "compleatang",
                          "email": "casey@monax.io"
                      },
                      {
                          "name": "gregdhill",
                          "email": "greg.hill@monax.io"
                      }
                  ],
                  "sources": [
                      "https://github.com/hyperledger/burrow"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/burrow"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.5.2",
                          "app_version": "0.29.0",
                          "created": "2019-11-06T08:58:33.565Z",
                          "digest": "9a9fb1cc044bdd4fe98e60b309357975d57731f5864452a248240dea8a6d429d",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/burrow-1.5.2.tgz"
                          ],
                          "readme": "/v1/assets/stable/burrow/versions/1.5.2/README.md",
                          "values": "/v1/assets/stable/burrow/versions/1.5.2/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/burrow/versions/1.5.2"
                      }
                  }
              }
          },
          {
              "id": "incubator/buzzfeed-sso",
              "type": "chart",
              "attributes": {
                  "name": "buzzfeed-sso",
                  "repo": {
                      "name": "incubator",
                      "url": "https://kubernetes-charts-incubator.storage.googleapis.com"
                  },
                  "description": "Single sign-on for your Kubernetes services using Google OAuth",
                  "home": "https://github.com/buzzfeed/sso",
                  "keywords": [
                      "sso",
                      "octoboi",
                      "ssoctopus"
                  ],
                  "maintainers": [
                      {
                          "name": "darioblanco",
                          "email": "dblanco@minddoc.de"
                      },
                      {
                          "name": "komljen",
                          "email": "alen.komljen@live.com"
                      }
                  ],
                  "sources": [
                      "https://hub.docker.com/r/buzzfeed/sso/"
                  ],
                  "icon": "/v1/assets/incubator/buzzfeed-sso/logo"
              },
              "links": {
                  "self": "/v1/charts/incubator/buzzfeed-sso"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.1.1",
                          "app_version": "2.0.0",
                          "created": "2019-11-06T09:29:01.989Z",
                          "digest": "fed29ccd867e29f45f2142576c5a2a6666472eb8eb895257acb2d002b5498246",
                          "urls": [
                              "https://kubernetes-charts-incubator.storage.googleapis.com/buzzfeed-sso-0.1.1.tgz"
                          ],
                          "readme": "/v1/assets/incubator/buzzfeed-sso/versions/0.1.1/README.md",
                          "values": "/v1/assets/incubator/buzzfeed-sso/versions/0.1.1/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/incubator/buzzfeed-sso/versions/0.1.1"
                      }
                  }
              }
          },
          {
              "id": "bitnami/cassandra",
              "type": "chart",
              "attributes": {
                  "name": "cassandra",
                  "repo": {
                      "name": "bitnami",
                      "url": "https://charts.bitnami.com/bitnami"
                  },
                  "description": "Apache Cassandra is a free and open-source distributed database management system designed to handle large amounts of data across many commodity servers, providing high availability with no single point of failure. Cassandra offers robust support for clusters spanning multiple datacenters, with asynchronous masterless replication allowing low latency operations for all clients.",
                  "home": "http://cassandra.apache.org",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "Bitnami",
                          "email": "containers@bitnami.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/bitnami/bitnami-docker-cassandra"
                  ],
                  "icon": "/v1/assets/bitnami/cassandra/logo"
              },
              "links": {
                  "self": "/v1/charts/bitnami/cassandra"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "4.1.6",
                          "app_version": "3.11.5",
                          "created": "2019-11-06T09:38:39.586Z",
                          "digest": "085289de3f35741278023a7a4bd4e2f42008363e9e3fe11057d3fe9a256fd9af",
                          "urls": [
                              "https://charts.bitnami.com/bitnami/cassandra-4.1.6.tgz"
                          ],
                          "readme": "/v1/assets/bitnami/cassandra/versions/4.1.6/README.md",
                          "values": "/v1/assets/bitnami/cassandra/versions/4.1.6/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/bitnami/cassandra/versions/4.1.6"
                      }
                  }
              }
          },
          {
              "id": "incubator/cassandra",
              "type": "chart",
              "attributes": {
                  "name": "cassandra",
                  "repo": {
                      "name": "incubator",
                      "url": "https://kubernetes-charts-incubator.storage.googleapis.com"
                  },
                  "description": "Apache Cassandra is a free and open-source distributed database management system designed to handle large amounts of data across many commodity servers, providing high availability with no single point of failure.",
                  "home": "http://cassandra.apache.org",
                  "keywords": [
                      "cassandra",
                      "database",
                      "nosql"
                  ],
                  "maintainers": [
                      {
                          "name": "KongZ",
                          "email": "goonohc@gmail.com"
                      },
                      {
                          "name": "maorfr",
                          "email": "maor.friedman@redhat.com"
                      }
                  ],
                  "sources": [],
                  "icon": "/v1/assets/incubator/cassandra/logo"
              },
              "links": {
                  "self": "/v1/charts/incubator/cassandra"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.13.3",
                          "app_version": "3.11.3",
                          "created": "2019-11-06T09:29:01.989Z",
                          "digest": "e81cd142b711d2b33455fd3d0152e44a913be3832d01123aa54821fc5be502f7",
                          "urls": [
                              "https://kubernetes-charts-incubator.storage.googleapis.com/cassandra-0.13.3.tgz"
                          ],
                          "readme": "/v1/assets/incubator/cassandra/versions/0.13.3/README.md",
                          "values": "/v1/assets/incubator/cassandra/versions/0.13.3/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/incubator/cassandra/versions/0.13.3"
                      }
                  }
              }
          },
          {
              "id": "incubator/cassandra-operator",
              "type": "chart",
              "attributes": {
                  "name": "cassandra-operator",
                  "repo": {
                      "name": "incubator",
                      "url": "https://kubernetes-charts-incubator.storage.googleapis.com"
                  },
                  "description": "A Helm chart for CassKop - the Orange Cassandra Kubernetes operator",
                  "home": "https://github.com/Orange-OpenSource/cassandra-k8s-operator",
                  "keywords": [
                      "operator",
                      "cassandra",
                      "casskop",
                      "database",
                      "nosql"
                  ],
                  "maintainers": [
                      {
                          "name": "allamand",
                          "email": "sebastien.allamand@orange.com"
                      },
                      {
                          "name": "Orange-cscetbon",
                          "email": "cscetbon.ext@orange.com"
                      },
                      {
                          "name": "jal06",
                          "email": "jeanarmel.luce@orange.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/Orange-OpenSource/cassandra-k8s-operator"
                  ],
                  "icon": "/v1/assets/incubator/cassandra-operator/logo"
              },
              "links": {
                  "self": "/v1/charts/incubator/cassandra-operator"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.3.2",
                          "app_version": "0.3.1-mater",
                          "created": "2019-11-06T09:29:01.99Z",
                          "digest": "b47f33716cb26fc7cf6ea91d594216380453290716194294cde86febf3586e52",
                          "urls": [
                              "https://kubernetes-charts-incubator.storage.googleapis.com/cassandra-operator-0.3.2.tgz"
                          ],
                          "readme": "/v1/assets/incubator/cassandra-operator/versions/0.3.2/README.md",
                          "values": "/v1/assets/incubator/cassandra-operator/versions/0.3.2/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/incubator/cassandra-operator/versions/0.3.2"
                      }
                  }
              }
          },
          {
              "id": "incubator/cassandra-reaper",
              "type": "chart",
              "attributes": {
                  "name": "cassandra-reaper",
                  "repo": {
                      "name": "incubator",
                      "url": "https://kubernetes-charts-incubator.storage.googleapis.com"
                  },
                  "description": "Reaper is a centralized, stateful, and highly configurable tool for running Apache Cassandra repairs against single or multi-site clusters.",
                  "home": "http://cassandra-reaper.io/",
                  "keywords": [
                      "cassandra"
                  ],
                  "maintainers": [
                      {
                          "name": "kamsz",
                          "email": "kamil@szczygiel.io"
                      }
                  ],
                  "sources": [],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/incubator/cassandra-reaper"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.2.1",
                          "app_version": "1.3.0",
                          "created": "2019-11-06T09:29:01.99Z",
                          "digest": "77f5bdcb4f21446bd05904e24722b8181fc81204ed7061a959620eae775f414d",
                          "urls": [
                              "https://kubernetes-charts-incubator.storage.googleapis.com/cassandra-reaper-0.2.1.tgz"
                          ],
                          "readme": "/v1/assets/incubator/cassandra-reaper/versions/0.2.1/README.md",
                          "values": "/v1/assets/incubator/cassandra-reaper/versions/0.2.1/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/incubator/cassandra-reaper/versions/0.2.1"
                      }
                  }
              }
          },
          {
              "id": "svc-cat/catalog",
              "type": "chart",
              "attributes": {
                  "name": "catalog",
                  "repo": {
                      "name": "svc-cat",
                      "url": "https://svc-catalog-charts.storage.googleapis.com"
                  },
                  "description": "service-catalog webhook server and controller-manager helm chart",
                  "home": "",
                  "keywords": [],
                  "maintainers": [],
                  "sources": [],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/svc-cat/catalog"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.3.0-beta.2",
                          "app_version": "",
                          "created": "2019-11-05T19:13:49.283Z",
                          "digest": "5a97532aaff89cd3a4228d841160900d01531b6bce5f49101037746536450838",
                          "urls": [
                              "https://svc-catalog-charts.storage.googleapis.com/catalog-0.3.0-beta.2.tgz"
                          ],
                          "readme": "/v1/assets/svc-cat/catalog/versions/0.3.0-beta.2/README.md",
                          "values": "/v1/assets/svc-cat/catalog/versions/0.3.0-beta.2/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/svc-cat/catalog/versions/0.3.0-beta.2"
                      }
                  }
              }
          },
          {
              "id": "svc-cat/catalog-v0.2",
              "type": "chart",
              "attributes": {
                  "name": "catalog-v0.2",
                  "repo": {
                      "name": "svc-cat",
                      "url": "https://svc-catalog-charts.storage.googleapis.com"
                  },
                  "description": "service-catalog API server and controller-manager helm chart",
                  "home": "",
                  "keywords": [],
                  "maintainers": [],
                  "sources": [],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/svc-cat/catalog-v0.2"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.2.2",
                          "app_version": "",
                          "created": "2019-08-26T10:48:31.635Z",
                          "digest": "8f17b6d9b4661f0fed9172e0b7d80936a8ae966b971d6b10a84c085a82680527",
                          "urls": [
                              "https://svc-catalog-charts.storage.googleapis.com/catalog-v0.2-0.2.2.tgz"
                          ],
                          "readme": "/v1/assets/svc-cat/catalog-v0.2/versions/0.2.2/README.md",
                          "values": "/v1/assets/svc-cat/catalog-v0.2/versions/0.2.2/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/svc-cat/catalog-v0.2/versions/0.2.2"
                      }
                  }
              }
          },
          {
              "id": "stable/centrifugo",
              "type": "chart",
              "attributes": {
                  "name": "centrifugo",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Centrifugo is a real-time messaging server.",
                  "home": "https://github.com/centrifugal/centrifugo",
                  "keywords": [
                      "centrifugo",
                      "websocket",
                      "golang"
                  ],
                  "maintainers": [
                      {
                          "name": "oleh-ozimok",
                          "email": "ozimok.oleg@gmail.com"
                      }
                  ],
                  "sources": [],
                  "icon": "/v1/assets/stable/centrifugo/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/centrifugo"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "3.1.0",
                          "app_version": "2.1.0",
                          "created": "2019-11-06T08:58:33.565Z",
                          "digest": "f642d357c847dc932226a234d50e3d34de2dd011e3110a9f657870437a49b9e1",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/centrifugo-3.1.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/centrifugo/versions/3.1.0/README.md",
                          "values": "/v1/assets/stable/centrifugo/versions/3.1.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/centrifugo/versions/3.1.0"
                      }
                  }
              }
          },
          {
              "id": "stable/cerebro",
              "type": "chart",
              "attributes": {
                  "name": "cerebro",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "A Helm chart for Cerebro - a web admin tool that replaces Kopf.",
                  "home": "https://github.com/lmenezes/cerebro",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "davidkarlsen",
                          "email": "david@davidkarlsen.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/lmenezes/cerebro-docker",
                      "https://github.com/lmenezes/cerebro"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/cerebro"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.2.0",
                          "app_version": "0.8.4",
                          "created": "2019-11-06T08:58:33.565Z",
                          "digest": "b792c0b41e7a4e87c9e60c048dd9cd19965409ac66cc8892cbfe053830151fec",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/cerebro-1.2.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/cerebro/versions/1.2.0/README.md",
                          "values": "/v1/assets/stable/cerebro/versions/1.2.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/cerebro/versions/1.2.0"
                      }
                  }
              }
          },
          {
              "id": "stable/chaoskube",
              "type": "chart",
              "attributes": {
                  "name": "chaoskube",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Chaoskube periodically kills random pods in your Kubernetes cluster.",
                  "home": "https://github.com/linki/chaoskube",
                  "keywords": [
                      "chaos-monkey",
                      "chaos-engineering"
                  ],
                  "maintainers": [
                      {
                          "name": "linki",
                          "email": "linki+kubernetes.io@posteo.de"
                      },
                      {
                          "name": "alexvicegrab",
                          "email": "a.vicente.grab@gmail.com"
                      },
                      {
                          "name": "syedimam0012",
                          "email": "syedimam0012@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/linki/chaoskube"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/chaoskube"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "3.1.2",
                          "app_version": "0.14.0",
                          "created": "2019-11-06T08:58:33.567Z",
                          "digest": "98a3555dad256401f11ce3913897ac5e13eb0c8e7e5bc8178b7af89aff80e883",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/chaoskube-3.1.2.tgz"
                          ],
                          "readme": "/v1/assets/stable/chaoskube/versions/3.1.2/README.md",
                          "values": "/v1/assets/stable/chaoskube/versions/3.1.2/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/chaoskube/versions/3.1.2"
                      }
                  }
              }
          },
          {
              "id": "stable/chartmuseum",
              "type": "chart",
              "attributes": {
                  "name": "chartmuseum",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Host your own Helm Chart Repository",
                  "home": "https://github.com/helm/chartmuseum",
                  "keywords": [
                      "chartmuseum",
                      "helm",
                      "charts repo"
                  ],
                  "maintainers": [
                      {
                          "name": "codefresh-io",
                          "email": "opensource@codefresh.io"
                      },
                      {
                          "name": "cloudposse",
                          "email": "hello@cloudposse.com"
                      },
                      {
                          "name": "chartmuseum",
                          "email": "chartmuseum@gmail.com"
                      }
                  ],
                  "sources": [],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/chartmuseum"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "2.4.0",
                          "app_version": "0.8.2",
                          "created": "2019-11-06T08:58:33.568Z",
                          "digest": "126883997a14f6f6d38fd69c8254bf06f9f33563ad30f762fea5fe560e235945",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/chartmuseum-2.4.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/chartmuseum/versions/2.4.0/README.md",
                          "values": "/v1/assets/stable/chartmuseum/versions/2.4.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/chartmuseum/versions/2.4.0"
                      }
                  }
              }
          },
          {
              "id": "incubator/check-mk",
              "type": "chart",
              "attributes": {
                  "name": "check-mk",
                  "repo": {
                      "name": "incubator",
                      "url": "https://kubernetes-charts-incubator.storage.googleapis.com"
                  },
                  "description": "check_mk monitoring",
                  "home": "https://mathias-kettner.de/check_mk.html",
                  "keywords": [
                      "check_mk",
                      "nagios",
                      "monitoring"
                  ],
                  "maintainers": [
                      {
                          "name": "junaid18183",
                          "email": "junaid18183@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/kubernetes/charts",
                      "http://git.mathias-kettner.de/git/"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/incubator/check-mk"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.2.1",
                          "app_version": "1.4.0p26",
                          "created": "2019-11-06T09:29:01.991Z",
                          "digest": "3417e26a1e32db048f046dc9f2877c1bc0ed1b2eb104a0b3cde09babd96f7b9b",
                          "urls": [
                              "https://kubernetes-charts-incubator.storage.googleapis.com/check-mk-0.2.1.tgz"
                          ],
                          "readme": "/v1/assets/incubator/check-mk/versions/0.2.1/README.md",
                          "values": "/v1/assets/incubator/check-mk/versions/0.2.1/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/incubator/check-mk/versions/0.2.1"
                      }
                  }
              }
          },
          {
              "id": "stable/chronograf",
              "type": "chart",
              "attributes": {
                  "name": "chronograf",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Open-source web application written in Go and React.js that provides the tools to visualize your monitoring data and easily create alerting and automation rules.",
                  "home": "https://www.influxdata.com/time-series-platform/chronograf/",
                  "keywords": [
                      "chronograf",
                      "visualizaion",
                      "timeseries"
                  ],
                  "maintainers": [
                      {
                          "name": "jackzampolin",
                          "email": "jack@influxdb.com"
                      }
                  ],
                  "sources": [],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/chronograf"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.1.0",
                          "app_version": "1.7.12",
                          "created": "2019-11-06T08:58:33.569Z",
                          "digest": "7d866359eee2f9e309dce4754a1ef6a29d0b038a4a3c17e32e88b6c99b37b767",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/chronograf-1.1.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/chronograf/versions/1.1.0/README.md",
                          "values": "/v1/assets/stable/chronograf/versions/1.1.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/chronograf/versions/1.1.0"
                      }
                  }
              }
          },
          {
              "id": "stable/clamav",
              "type": "chart",
              "attributes": {
                  "name": "clamav",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "An Open-Source antivirus engine for detecting trojans, viruses, malware & other malicious threats.",
                  "home": "https://www.clamav.net",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "zakkg3",
                          "email": "zakkg3@gmail.com"
                      }
                  ],
                  "sources": [],
                  "icon": "/v1/assets/stable/clamav/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/clamav"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.0.4",
                          "app_version": "1.6",
                          "created": "2019-11-06T08:58:33.569Z",
                          "digest": "893170c6c1accc29d70c55c69fdeb68259961e99513e2c14ea469ed810cf422d",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/clamav-1.0.4.tgz"
                          ],
                          "readme": "/v1/assets/stable/clamav/versions/1.0.4/README.md",
                          "values": "/v1/assets/stable/clamav/versions/1.0.4/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/clamav/versions/1.0.4"
                      }
                  }
              }
          },
          {
              "id": "stable/cloudserver",
              "type": "chart",
              "attributes": {
                  "name": "cloudserver",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "An open-source Node.js implementation of the Amazon S3 protocol on the front-end and backend storage capabilities to multiple clouds, including Azure and Google.",
                  "home": "https://www.zenko.io/cloudserver/",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "ssalaues",
                          "email": "salimsalaues@gmail.com"
                      },
                      {
                          "name": "tmacro",
                          "email": "mail@tmacs.space"
                      }
                  ],
                  "sources": [
                      "https://github.com/scality/cloudserver"
                  ],
                  "icon": "/v1/assets/stable/cloudserver/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/cloudserver"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.0.3",
                          "app_version": "8.1.5",
                          "created": "2019-11-06T08:58:33.571Z",
                          "digest": "e1527aa227e0e7cd3a783bf7f2ca5260d705b4b5501404018986c74ec87e27db",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/cloudserver-1.0.3.tgz"
                          ],
                          "readme": "/v1/assets/stable/cloudserver/versions/1.0.3/README.md",
                          "values": "/v1/assets/stable/cloudserver/versions/1.0.3/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/cloudserver/versions/1.0.3"
                      }
                  }
              }
          },
          {
              "id": "stable/cluster-autoscaler",
              "type": "chart",
              "attributes": {
                  "name": "cluster-autoscaler",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Scales worker nodes within autoscaling groups.",
                  "home": "https://github.com/kubernetes/autoscaler",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "mgoodness",
                          "email": "mgoodness@gmail.com"
                      },
                      {
                          "name": "yurrriq",
                          "email": "e.bailey@sportradar.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/kubernetes/autoscaler/tree/master/cluster-autoscaler",
                      "https://github.com/spotinst/kubernetes-autoscaler/tree/master/cluster-autoscaler"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/cluster-autoscaler"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "6.1.0",
                          "app_version": "1.14.6",
                          "created": "2019-11-06T08:58:33.572Z",
                          "digest": "2de5c319e0ee5c68f64f9608e43484bf531c3dce4806b5326150a00a11ba0ac7",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/cluster-autoscaler-6.1.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/cluster-autoscaler/versions/6.1.0/README.md",
                          "values": "/v1/assets/stable/cluster-autoscaler/versions/6.1.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/cluster-autoscaler/versions/6.1.0"
                      }
                  }
              }
          },
          {
              "id": "stable/cluster-overprovisioner",
              "type": "chart",
              "attributes": {
                  "name": "cluster-overprovisioner",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Installs the a deployment that overprovisions the cluster",
                  "home": "https://github.com/kubernetes/autoscaler/blob/master/cluster-autoscaler",
                  "keywords": [
                      "cluster",
                      "autoscaling",
                      "overprovision",
                      "cluster-autoscaler"
                  ],
                  "maintainers": [
                      {
                          "name": "max-rocket-internet",
                          "email": "max.williams@deliveryhero.com"
                      },
                      {
                          "name": "mmingorance-dh",
                          "email": "miguel.mingorance@deliveryhero.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/kubernetes/autoscaler/blob/master/cluster-autoscaler/FAQ.md#how-can-i-configure-overprovisioning-with-cluster-autoscaler",
                      "https://github.com/kubernetes/autoscaler/blob/master/cluster-autoscaler",
                      "https://github.com/kubernetes/kubernetes/tree/master/build/pause"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/cluster-overprovisioner"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.2.6",
                          "app_version": "1.0",
                          "created": "2019-11-06T08:58:33.572Z",
                          "digest": "5d4704233424443cc18dce8b27bb4863d932c239853c8cd7afa74f5b8ab01094",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/cluster-overprovisioner-0.2.6.tgz"
                          ],
                          "readme": "/v1/assets/stable/cluster-overprovisioner/versions/0.2.6/README.md",
                          "values": "/v1/assets/stable/cluster-overprovisioner/versions/0.2.6/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/cluster-overprovisioner/versions/0.2.6"
                      }
                  }
              }
          },
          {
              "id": "incubator/cockroachdb",
              "type": "chart",
              "attributes": {
                  "name": "cockroachdb",
                  "repo": {
                      "name": "incubator",
                      "url": "https://kubernetes-charts-incubator.storage.googleapis.com"
                  },
                  "description": "CockroachDB Helm chart for Kubernetes.",
                  "home": "https://www.cockroachlabs.com",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "Alex Robinson",
                          "email": "alex@cockroachlabs.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/cockroachdb/cockroach"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/incubator/cockroachdb"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.1.1",
                          "app_version": "",
                          "created": "2017-01-13T20:48:35.895Z",
                          "digest": "2b00697b9a176ea4a678956f9d669c9d3803a1f501243046c280f9c522aa36ec",
                          "urls": [
                              "https://kubernetes-charts-incubator.storage.googleapis.com/cockroachdb-0.1.1.tgz"
                          ],
                          "readme": "/v1/assets/incubator/cockroachdb/versions/0.1.1/README.md",
                          "values": "/v1/assets/incubator/cockroachdb/versions/0.1.1/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/incubator/cockroachdb/versions/0.1.1"
                      }
                  }
              }
          },
          {
              "id": "stable/cockroachdb",
              "type": "chart",
              "attributes": {
                  "name": "cockroachdb",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "CockroachDB is a scalable, survivable, strongly-consistent SQL database.",
                  "home": "https://www.cockroachlabs.com",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "a-robinson",
                          "email": "alexdwanerobinson@gmail.com"
                      },
                      {
                          "name": "DuskEagle",
                          "email": "Joel.A.Kenny@gmail.com"
                      },
                      {
                          "name": "joshimhoff",
                          "email": "joshimhoff13@gmail.com"
                      },
                      {
                          "name": "keith-mcclellan",
                          "email": "keith.mcclellan@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/cockroachdb/cockroach"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/cockroachdb"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "2.1.16",
                          "app_version": "19.1.5",
                          "created": "2019-11-06T08:58:33.573Z",
                          "digest": "940272512e4c71026acf7063afcb3ff099ec61b61270fa207cc956c55d9f771e",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/cockroachdb-2.1.16.tgz"
                          ],
                          "readme": "/v1/assets/stable/cockroachdb/versions/2.1.16/README.md",
                          "values": "/v1/assets/stable/cockroachdb/versions/2.1.16/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/cockroachdb/versions/2.1.16"
                      }
                  }
              }
          },
          {
              "id": "stable/collabora-code",
              "type": "chart",
              "attributes": {
                  "name": "collabora-code",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "A Helm chart for Collabora Office - CODE-Edition",
                  "home": "https://www.collaboraoffice.com/code/",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "Christian",
                          "email": "christian.ingenhaag@googlemail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/CollaboraOnline/Docker-CODE"
                  ],
                  "icon": "/v1/assets/stable/collabora-code/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/collabora-code"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.0.5",
                          "app_version": "4.0.3.1",
                          "created": "2019-11-06T08:58:33.573Z",
                          "digest": "d34fa29eed5dc3edba4cc0bb79b3e075ac24790bdbea18ee4048a845ab1910ab",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/collabora-code-1.0.5.tgz"
                          ],
                          "readme": "/v1/assets/stable/collabora-code/versions/1.0.5/README.md",
                          "values": "/v1/assets/stable/collabora-code/versions/1.0.5/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/collabora-code/versions/1.0.5"
                      }
                  }
              }
          },
          {
              "id": "incubator/common",
              "type": "chart",
              "attributes": {
                  "name": "common",
                  "repo": {
                      "name": "incubator",
                      "url": "https://kubernetes-charts-incubator.storage.googleapis.com"
                  },
                  "description": "Common chartbuilding components and helpers",
                  "home": "https://helm.sh",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "technosophos",
                          "email": "technosophos@gmail.com"
                      },
                      {
                          "name": "prydonius",
                          "email": "adnan@bitnami.com"
                      }
                  ],
                  "sources": [],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/incubator/common"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.0.5",
                          "app_version": "0.0.5",
                          "created": "2019-11-06T09:29:01.991Z",
                          "digest": "6bed63434c6d23bc6e3226f9181480b65e6f079d04ca3f9b82c3a2934cd0d7a8",
                          "urls": [
                              "https://kubernetes-charts-incubator.storage.googleapis.com/common-0.0.5.tgz"
                          ],
                          "readme": "/v1/assets/incubator/common/versions/0.0.5/README.md",
                          "values": "/v1/assets/incubator/common/versions/0.0.5/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/incubator/common/versions/0.0.5"
                      }
                  }
              }
          },
          {
              "id": "stable/concourse",
              "type": "chart",
              "attributes": {
                  "name": "concourse",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Concourse is a simple and scalable CI system.",
                  "home": "https://concourse-ci.org/",
                  "keywords": [
                      "ci",
                      "concourse",
                      "concourse.ci"
                  ],
                  "maintainers": [
                      {
                          "name": "cirocosta",
                          "email": "cscosta@pivotal.io"
                      },
                      {
                          "name": "william-tran",
                          "email": "will@autonomic.ai"
                      },
                      {
                          "name": "YoussB",
                          "email": "byoussef@pivotal.io"
                      }
                  ],
                  "sources": [
                      "https://github.com/concourse/concourse",
                      "https://github.com/helm/charts"
                  ],
                  "icon": "/v1/assets/stable/concourse/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/concourse"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "8.2.7",
                          "app_version": "5.6.0",
                          "created": "2019-11-06T08:58:33.576Z",
                          "digest": "66fe105b0050b93016e31a3d0b13059cda8387cb8b8138971bc6be09e1674b2d",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/concourse-8.2.7.tgz"
                          ],
                          "readme": "/v1/assets/stable/concourse/versions/8.2.7/README.md",
                          "values": "/v1/assets/stable/concourse/versions/8.2.7/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/concourse/versions/8.2.7"
                      }
                  }
              }
          },
          {
              "id": "bitnami/consul",
              "type": "chart",
              "attributes": {
                  "name": "consul",
                  "repo": {
                      "name": "bitnami",
                      "url": "https://charts.bitnami.com/bitnami"
                  },
                  "description": "Highly available and distributed service discovery and key-value store designed with support for the modern data center to make distributed systems and configuration easy.",
                  "home": "https://www.consul.io/",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "Bitnami",
                          "email": "containers@bitnami.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/bitnami/bitnami-docker-consul"
                  ],
                  "icon": "/v1/assets/bitnami/consul/logo"
              },
              "links": {
                  "self": "/v1/charts/bitnami/consul"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "6.0.7",
                          "app_version": "1.6.1",
                          "created": "2019-11-06T09:38:39.587Z",
                          "digest": "9bfb96ff9234c55f7a3ce5b055c79aa7fc2352994725f32c91bda0baa66c5f39",
                          "urls": [
                              "https://charts.bitnami.com/bitnami/consul-6.0.7.tgz"
                          ],
                          "readme": "/v1/assets/bitnami/consul/versions/6.0.7/README.md",
                          "values": "/v1/assets/bitnami/consul/versions/6.0.7/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/bitnami/consul/versions/6.0.7"
                      }
                  }
              }
          },
          {
              "id": "stable/consul",
              "type": "chart",
              "attributes": {
                  "name": "consul",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Highly available and distributed service discovery and key-value store designed with support for the modern data center to make distributed systems and configuration easy.",
                  "home": "https://github.com/hashicorp/consul",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "lachie83",
                          "email": "lachlan.evenson@microsoft.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/kelseyhightower/consul-on-kubernetes"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/consul"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "3.9.2",
                          "app_version": "1.5.3",
                          "created": "2019-11-06T08:58:33.577Z",
                          "digest": "a5cfafe75a1db8fe6a4ea8a43d2076902a217408889e3a16616066bbdb141286",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/consul-3.9.2.tgz"
                          ],
                          "readme": "/v1/assets/stable/consul/versions/3.9.2/README.md",
                          "values": "/v1/assets/stable/consul/versions/3.9.2/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/consul/versions/3.9.2"
                      }
                  }
              }
          },
          {
              "id": "incubator/consul",
              "type": "chart",
              "attributes": {
                  "name": "consul",
                  "repo": {
                      "name": "incubator",
                      "url": "https://kubernetes-charts-incubator.storage.googleapis.com"
                  },
                  "description": "Highly available and distributed service discovery and key-value store designed with support for the modern data center to make distributed systems and configuration easy.",
                  "home": "https://github.com/hashicorp/consul",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "Lachlan Evenson",
                          "email": "lachlan@deis.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/kelseyhightower/consul-on-kubernetes"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/incubator/consul"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.1.4",
                          "app_version": "",
                          "created": "2017-03-17T22:33:36.796Z",
                          "digest": "66cd5bd49cde68e966be7d271574f7c1c3f8582bb95042ef45b4b02b730b07fd",
                          "urls": [
                              "https://kubernetes-charts-incubator.storage.googleapis.com/consul-0.1.4.tgz"
                          ],
                          "readme": "/v1/assets/incubator/consul/versions/0.1.4/README.md",
                          "values": "/v1/assets/incubator/consul/versions/0.1.4/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/incubator/consul/versions/0.1.4"
                      }
                  }
              }
          },
          {
              "id": "stable/coredns",
              "type": "chart",
              "attributes": {
                  "name": "coredns",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "CoreDNS is a DNS server that chains plugins and provides Kubernetes DNS Services",
                  "home": "https://coredns.io",
                  "keywords": [
                      "coredns",
                      "dns",
                      "kubedns"
                  ],
                  "maintainers": [
                      {
                          "name": "Acaleph",
                          "email": "hello@acale.ph"
                      },
                      {
                          "name": "shashidharatd",
                          "email": "shashidhara.huawei@gmail.com"
                      },
                      {
                          "name": "andor44",
                          "email": "andor44@gmail.com"
                      },
                      {
                          "name": "mrueg",
                          "email": "manuel@rueg.eu"
                      }
                  ],
                  "sources": [
                      "https://github.com/coredns/coredns"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/coredns"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.7.4",
                          "app_version": "1.6.4",
                          "created": "2019-11-06T08:58:33.577Z",
                          "digest": "9c9937841eda77b877a5b622c214974eea4fda8ec519abdaf90d8b9f8398f9b3",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/coredns-1.7.4.tgz"
                          ],
                          "readme": "/v1/assets/stable/coredns/versions/1.7.4/README.md",
                          "values": "/v1/assets/stable/coredns/versions/1.7.4/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/coredns/versions/1.7.4"
                      }
                  }
              }
          },
          {
              "id": "stable/cosbench",
              "type": "chart",
              "attributes": {
                  "name": "cosbench",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "A benchmark tool for cloud object storage services",
                  "home": "https://github.com/intel-cloud/cosbench",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "giacomoguiulfo",
                          "email": "giacomoguiulfo@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/intel-cloud/cosbench",
                      "https://github.com/scality/zenko-cosbench"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/cosbench"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.0.1",
                          "app_version": "0.0.6",
                          "created": "2019-11-06T08:58:33.578Z",
                          "digest": "0db7db3f4c09c04dbc47985dd36112f2e15b880f154da2adec79faeeaf2e04c7",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/cosbench-1.0.1.tgz"
                          ],
                          "readme": "/v1/assets/stable/cosbench/versions/1.0.1/README.md",
                          "values": "/v1/assets/stable/cosbench/versions/1.0.1/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/cosbench/versions/1.0.1"
                      }
                  }
              }
          },
          {
              "id": "stable/coscale",
              "type": "chart",
              "attributes": {
                  "name": "coscale",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "CoScale Agent",
                  "home": "https://www.coscale.com/",
                  "keywords": [
                      "monitoring",
                      "alerting",
                      "metric",
                      "event",
                      "anomaly detection"
                  ],
                  "maintainers": [
                      {
                          "name": "fryckbos",
                          "email": "frederick.ryckbosch@coscale.com"
                      }
                  ],
                  "sources": [
                      "https://app.coscale.com/"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/coscale"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.0.0",
                          "app_version": "3.16.0",
                          "created": "2019-11-06T08:58:33.578Z",
                          "digest": "8907e6c15c7020e123a6430684104c682c7a8836c8edc31a0858e10c345c5d65",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/coscale-1.0.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/coscale/versions/1.0.0/README.md",
                          "values": "/v1/assets/stable/coscale/versions/1.0.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/coscale/versions/1.0.0"
                      }
                  }
              }
          },
          {
              "id": "stable/couchbase-operator",
              "type": "chart",
              "attributes": {
                  "name": "couchbase-operator",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "A Helm chart to deploy the Couchbase Autonomous Operator for easily deploying, managing, and maintaining Couchbase Clusters.",
                  "home": "https://www.couchbase.com",
                  "keywords": [
                      "couchbase",
                      "operator",
                      "database",
                      "nosql",
                      "cluster",
                      "replication"
                  ],
                  "maintainers": [
                      {
                          "name": "tahmmee",
                          "email": "tahmmee@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/couchbase/docker/tree/master/enterprise/couchbase-operator/1.0.0"
                  ],
                  "icon": "/v1/assets/stable/couchbase-operator/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/couchbase-operator"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.0.1",
                          "app_version": "1.2.1",
                          "created": "2019-11-06T08:58:33.578Z",
                          "digest": "147dc9e1251cf04ed4e120e6d002229cd1cda8f7d777aaebbf259b7933e4ccbb",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/couchbase-operator-1.0.1.tgz"
                          ],
                          "readme": "/v1/assets/stable/couchbase-operator/versions/1.0.1/README.md",
                          "values": "/v1/assets/stable/couchbase-operator/versions/1.0.1/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/couchbase-operator/versions/1.0.1"
                      }
                  }
              }
          },
          {
              "id": "stable/dask",
              "type": "chart",
              "attributes": {
                  "name": "dask",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Distributed computation in Python with task scheduling",
                  "home": "https://dask.org",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "danielfrg",
                          "email": "df.rodriguez143@gmail.com"
                      },
                      {
                          "name": "mrocklin",
                          "email": "mrocklin@gmail.com"
                      },
                      {
                          "name": "beberg",
                          "email": "beberg@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/dask/dask"
                  ],
                  "icon": "/v1/assets/stable/dask/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/dask"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "3.1.0",
                          "app_version": "1.1.5",
                          "created": "2019-11-06T08:58:33.579Z",
                          "digest": "6e79c9e1514017d87771ac5577f52375b7dec7cd69c0fe9721475d8416d30cc6",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/dask-3.1.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/dask/versions/3.1.0/README.md",
                          "values": "/v1/assets/stable/dask/versions/3.1.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/dask/versions/3.1.0"
                      }
                  }
              }
          },
          {
              "id": "stable/datadog",
              "type": "chart",
              "attributes": {
                  "name": "datadog",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "DataDog Agent",
                  "home": "https://www.datadoghq.com",
                  "keywords": [
                      "monitoring",
                      "alerting",
                      "metric"
                  ],
                  "maintainers": [
                      {
                          "name": "hkaj",
                          "email": "haissam@datadoghq.com"
                      },
                      {
                          "name": "irabinovitch",
                          "email": "ilan@datadoghq.com"
                      },
                      {
                          "name": "charlyf",
                          "email": "charly@datadoghq.com"
                      },
                      {
                          "name": "mfpierre",
                          "email": "pierre.margueritte@datadoghq.com"
                      },
                      {
                          "name": "clamoriniere",
                          "email": "cedric.lamoriniere@datadoghq.com"
                      },
                      {
                          "name": "xlucas",
                          "email": "xavier.lucas@datadoghq.com"
                      }
                  ],
                  "sources": [
                      "https://app.datadoghq.com/account/settings#agent/kubernetes",
                      "https://github.com/DataDog/datadog-agent"
                  ],
                  "icon": "/v1/assets/stable/datadog/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/datadog"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.38.2",
                          "app_version": "6.14.0",
                          "created": "2019-11-06T08:58:33.582Z",
                          "digest": "6ad7ec35d50758e3d9042d987f1a7cc273f7f3ef2663b0e58803dcaa387b3fa0",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/datadog-1.38.2.tgz"
                          ],
                          "readme": "/v1/assets/stable/datadog/versions/1.38.2/README.md",
                          "values": "/v1/assets/stable/datadog/versions/1.38.2/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/datadog/versions/1.38.2"
                      }
                  }
              }
          },
          {
              "id": "stable/dex",
              "type": "chart",
              "attributes": {
                  "name": "dex",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "CoreOS Dex",
                  "home": "https://github.com/dexidp/dex/",
                  "keywords": [
                      "dex",
                      "oidc"
                  ],
                  "maintainers": [
                      {
                          "name": "kfox1111",
                          "email": "Kevin.Fox@pnnl.gov"
                      },
                      {
                          "name": "sstarcher",
                          "email": "shane.starcher@gmail.com"
                      },
                      {
                          "name": "rendhalver",
                          "email": "pete.brown@powerhrg.com"
                      },
                      {
                          "name": "vi7",
                          "email": "vi7alya@gmail.com"
                      }
                  ],
                  "sources": [],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/dex"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "2.3.2",
                          "app_version": "2.19.0",
                          "created": "2019-11-06T08:58:33.583Z",
                          "digest": "fa078ddb9888751dd8449c32fc020256d8cf7107fcfde1c88673833877dca9d6",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/dex-2.3.2.tgz"
                          ],
                          "readme": "/v1/assets/stable/dex/versions/2.3.2/README.md",
                          "values": "/v1/assets/stable/dex/versions/2.3.2/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/dex/versions/2.3.2"
                      }
                  }
              }
          },
          {
              "id": "stable/distributed-jmeter",
              "type": "chart",
              "attributes": {
                  "name": "distributed-jmeter",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "A Distributed JMeter Helm chart",
                  "home": "http://jmeter.apache.org/",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "pedrocesar-ti",
                          "email": "pedrocesar.ti@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/pedrocesar-ti/distributed-jmeter-docker"
                  ],
                  "icon": "/v1/assets/stable/distributed-jmeter/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/distributed-jmeter"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.0.1",
                          "app_version": "3.3",
                          "created": "2019-11-06T08:58:33.583Z",
                          "digest": "450849b1ae9c0d45aa4a59a9b3506e5e3aea6e740be4e6b3684cb42b3c09340f",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/distributed-jmeter-1.0.1.tgz"
                          ],
                          "readme": "/v1/assets/stable/distributed-jmeter/versions/1.0.1/README.md",
                          "values": "/v1/assets/stable/distributed-jmeter/versions/1.0.1/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/distributed-jmeter/versions/1.0.1"
                      }
                  }
              }
          },
          {
              "id": "stable/distributed-tensorflow",
              "type": "chart",
              "attributes": {
                  "name": "distributed-tensorflow",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "A Helm chart for running distributed TensorFlow on Kubernetes",
                  "home": "https://www.tensorflow.org",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "cheyang",
                          "email": "cheyang@163.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/tensorflow/tensorflow",
                      "https://www.tensorflow.org/deploy/distributed"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/distributed-tensorflow"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.1.2",
                          "app_version": "1.6.0",
                          "created": "2019-11-06T08:58:33.584Z",
                          "digest": "52d97ae11ab450d4abae79c3f07bc3295107ba1db37848283682dbd9d3381e09",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/distributed-tensorflow-0.1.2.tgz"
                          ],
                          "readme": "/v1/assets/stable/distributed-tensorflow/versions/0.1.2/README.md",
                          "values": "/v1/assets/stable/distributed-tensorflow/versions/0.1.2/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/distributed-tensorflow/versions/0.1.2"
                      }
                  }
              }
          },
          {
              "id": "stable/dmarc2logstash",
              "type": "chart",
              "attributes": {
                  "name": "dmarc2logstash",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Provides a POP3-polled DMARC XML report injector into Elasticsearch via Logstash and Filebeat",
                  "home": "https://github.com/jertel/dmarc2logstash",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "jertel",
                          "email": "jertel@codesim.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/jertel/dmarc2logstash"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/dmarc2logstash"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.2.0",
                          "app_version": "1.0.3",
                          "created": "2019-11-06T08:58:33.586Z",
                          "digest": "501f046ef60fc46c2e5d54dc5bc4803722904d6071a58978b7df12038eec71f5",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/dmarc2logstash-1.2.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/dmarc2logstash/versions/1.2.0/README.md",
                          "values": "/v1/assets/stable/dmarc2logstash/versions/1.2.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/dmarc2logstash/versions/1.2.0"
                      }
                  }
              }
          },
          {
              "id": "stable/docker-registry",
              "type": "chart",
              "attributes": {
                  "name": "docker-registry",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "A Helm chart for Docker Registry",
                  "home": "https://hub.docker.com/_/registry/",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "jpds",
                          "email": "jpds@protonmail.com"
                      },
                      {
                          "name": "rendhalver",
                          "email": "pete.brown@powerhrg.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/docker/distribution-library-image"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/docker-registry"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.8.3",
                          "app_version": "2.7.1",
                          "created": "2019-11-06T08:58:33.587Z",
                          "digest": "54b08c89a18db1108fd7bb6dbb77879a0693d79974101a03e37395466881da4e",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/docker-registry-1.8.3.tgz"
                          ],
                          "readme": "/v1/assets/stable/docker-registry/versions/1.8.3/README.md",
                          "values": "/v1/assets/stable/docker-registry/versions/1.8.3/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/docker-registry/versions/1.8.3"
                      }
                  }
              }
          },
          {
              "id": "incubator/docker-registry",
              "type": "chart",
              "attributes": {
                  "name": "docker-registry",
                  "repo": {
                      "name": "incubator",
                      "url": "https://kubernetes-charts-incubator.storage.googleapis.com"
                  },
                  "description": "A Helm chart for Docker Registry",
                  "home": "https://hub.docker.com/_/registry/",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "jpds",
                          "email": "jpds@protonmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/docker/distribution-library-image"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/incubator/docker-registry"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.3.0",
                          "app_version": "2.6.2",
                          "created": "2017-12-07T21:04:13.347Z",
                          "digest": "484505f1494bf17307ace2ea593ccedb953a2fc19c01a961614a72969aa1d7c3",
                          "urls": [
                              "https://kubernetes-charts-incubator.storage.googleapis.com/docker-registry-0.3.0.tgz"
                          ],
                          "readme": "/v1/assets/incubator/docker-registry/versions/0.3.0/README.md",
                          "values": "/v1/assets/incubator/docker-registry/versions/0.3.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/incubator/docker-registry/versions/0.3.0"
                      }
                  }
              }
          },
          {
              "id": "bitnami/dokuwiki",
              "type": "chart",
              "attributes": {
                  "name": "dokuwiki",
                  "repo": {
                      "name": "bitnami",
                      "url": "https://charts.bitnami.com/bitnami"
                  },
                  "description": "DokuWiki is a standards-compliant, simple to use wiki optimized for creating documentation. It is targeted at developer teams, workgroups, and small companies. All data is stored in plain text files, so no database is required.",
                  "home": "http://www.dokuwiki.org/",
                  "keywords": [
                      "dokuwiki",
                      "wiki",
                      "http",
                      "web",
                      "application",
                      "php"
                  ],
                  "maintainers": [
                      {
                          "name": "Bitnami",
                          "email": "containers@bitnami.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/bitnami/bitnami-docker-dokuwiki"
                  ],
                  "icon": "/v1/assets/bitnami/dokuwiki/logo"
              },
              "links": {
                  "self": "/v1/charts/bitnami/dokuwiki"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "5.2.11",
                          "app_version": "0.20180422.201901061035",
                          "created": "2019-11-06T09:38:39.588Z",
                          "digest": "8c3a08d849366ebe6afa1b0bfac6b930c47a97210bfa418bdba60525d085919e",
                          "urls": [
                              "https://charts.bitnami.com/bitnami/dokuwiki-5.2.11.tgz"
                          ],
                          "readme": "/v1/assets/bitnami/dokuwiki/versions/5.2.11/README.md",
                          "values": "/v1/assets/bitnami/dokuwiki/versions/5.2.11/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/bitnami/dokuwiki/versions/5.2.11"
                      }
                  }
              }
          },
          {
              "id": "stable/drone",
              "type": "chart",
              "attributes": {
                  "name": "drone",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Drone is a Continuous Delivery system built on container technology",
                  "home": "https://drone.io/",
                  "keywords": [
                      "continuous-delivery",
                      "continuous-deployment",
                      "continuous-integration",
                      "docker",
                      "drone",
                      "drone.io",
                      "go"
                  ],
                  "maintainers": [
                      {
                          "name": "christian-roggia",
                          "email": "christian.roggia@gmail.com"
                      },
                      {
                          "name": "paulczar",
                          "email": "username.taken@gmail.com"
                      },
                      {
                          "name": "zakkg3",
                          "email": "zakkg3@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/drone/drone"
                  ],
                  "icon": "/v1/assets/stable/drone/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/drone"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "2.3.0",
                          "app_version": "1.6.1",
                          "created": "2019-11-06T08:58:33.588Z",
                          "digest": "fbfbf3d7a53acd4c9fe479b193eb42884d2082172c26aec7403fa7667ad26a45",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/drone-2.3.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/drone/versions/2.3.0/README.md",
                          "values": "/v1/assets/stable/drone/versions/2.3.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/drone/versions/2.3.0"
                      }
                  }
              }
          },
          {
              "id": "incubator/druid",
              "type": "chart",
              "attributes": {
                  "name": "druid",
                  "repo": {
                      "name": "incubator",
                      "url": "https://kubernetes-charts-incubator.storage.googleapis.com"
                  },
                  "description": "Apache Druid (incubating) is a high performance analytics data store for event-driven data.",
                  "home": "http://druid.io/",
                  "keywords": [
                      "olap",
                      "database",
                      "analytics"
                  ],
                  "maintainers": [
                      {
                          "name": "maver1ck",
                          "email": "maciek@brynski.pl"
                      }
                  ],
                  "sources": [
                      "https://github.com/apache/incubator-druid"
                  ],
                  "icon": "/v1/assets/incubator/druid/logo"
              },
              "links": {
                  "self": "/v1/charts/incubator/druid"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.1.1",
                          "app_version": "0.12.3",
                          "created": "2019-11-06T09:29:01.996Z",
                          "digest": "b14e9585c702fd6a799f24b89b9d323abdb850bc2c877c588adb8af93fd10f84",
                          "urls": [
                              "https://kubernetes-charts-incubator.storage.googleapis.com/druid-0.1.1.tgz"
                          ],
                          "readme": "/v1/assets/incubator/druid/versions/0.1.1/README.md",
                          "values": "/v1/assets/incubator/druid/versions/0.1.1/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/incubator/druid/versions/0.1.1"
                      }
                  }
              }
          },
          {
              "id": "bitnami/drupal",
              "type": "chart",
              "attributes": {
                  "name": "drupal",
                  "repo": {
                      "name": "bitnami",
                      "url": "https://charts.bitnami.com/bitnami"
                  },
                  "description": "One of the most versatile open source content management systems.",
                  "home": "http://www.drupal.org/",
                  "keywords": [
                      "drupal",
                      "cms",
                      "blog",
                      "http",
                      "web",
                      "application",
                      "php"
                  ],
                  "maintainers": [
                      {
                          "name": "Bitnami",
                          "email": "containers@bitnami.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/bitnami/bitnami-docker-drupal"
                  ],
                  "icon": "/v1/assets/bitnami/drupal/logo"
              },
              "links": {
                  "self": "/v1/charts/bitnami/drupal"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "5.2.9",
                          "app_version": "8.7.8",
                          "created": "2019-11-06T09:38:39.593Z",
                          "digest": "2b37aa4fe5dd8ffe501898e9bf9d4eb3f9e196f90b757aef44535e8b473ca6cb",
                          "urls": [
                              "https://charts.bitnami.com/bitnami/drupal-5.2.9.tgz"
                          ],
                          "readme": "/v1/assets/bitnami/drupal/versions/5.2.9/README.md",
                          "values": "/v1/assets/bitnami/drupal/versions/5.2.9/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/bitnami/drupal/versions/5.2.9"
                      }
                  }
              }
          },
          {
              "id": "stable/efs-provisioner",
              "type": "chart",
              "attributes": {
                  "name": "efs-provisioner",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "A Helm chart for the AWS EFS external storage provisioner",
                  "home": "https://github.com/kubernetes-incubator/external-storage/tree/master/aws/efs",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "whereisaaron",
                          "email": "aaron@roydhouse.com"
                      },
                      {
                          "name": "mariusv",
                          "email": "myself@mariusv.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/kubernetes-incubator/external-storage/tree/master/aws/efs",
                      "https://github.com/mirror/busybox"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/efs-provisioner"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.8.0",
                          "app_version": "v2.2.0-k8s1.12",
                          "created": "2019-11-06T08:58:33.591Z",
                          "digest": "25e82d2c61ec80fc8000f2144ff6f83fb4251a6a55773f9aea615d12e5637f72",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/efs-provisioner-0.8.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/efs-provisioner/versions/0.8.0/README.md",
                          "values": "/v1/assets/stable/efs-provisioner/versions/0.8.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/efs-provisioner/versions/0.8.0"
                      }
                  }
              }
          },
          {
              "id": "stable/elastabot",
              "type": "chart",
              "attributes": {
                  "name": "elastabot",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "A Helm chart for Elastabot - a Slack bot companion for Elasticsearch and ElastAlert",
                  "home": "https://github.com/jertel/elastabot",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "jertel",
                          "email": "jertel@codesim.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/jertel/elastabot"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/elastabot"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.2.0",
                          "app_version": "1.1.0",
                          "created": "2019-11-06T08:58:33.592Z",
                          "digest": "3652aaca8e4b6920d0deb0a013a3de4edac5c6daef9d38baf36222f5b7ced6b7",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/elastabot-1.2.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/elastabot/versions/1.2.0/README.md",
                          "values": "/v1/assets/stable/elastabot/versions/1.2.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/elastabot/versions/1.2.0"
                      }
                  }
              }
          },
          {
              "id": "stable/elastalert",
              "type": "chart",
              "attributes": {
                  "name": "elastalert",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "ElastAlert is a simple framework for alerting on anomalies, spikes, or other patterns of interest from data in Elasticsearch.",
                  "home": "https://github.com/Yelp/elastalert",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "jertel",
                          "email": "jertel@codesim.com"
                      },
                      {
                          "name": "olemarkus",
                          "email": "o.with@sportradar.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/jertel/elastalert-docker",
                      "https://github.com/Yelp/elastalert"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/elastalert"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.2.3",
                          "app_version": "0.2.1",
                          "created": "2019-11-06T08:58:33.592Z",
                          "digest": "38f433341c109d59cf293f0d597a3f781f844b384361a80a98d1c9b07abd1f16",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/elastalert-1.2.3.tgz"
                          ],
                          "readme": "/v1/assets/stable/elastalert/versions/1.2.3/README.md",
                          "values": "/v1/assets/stable/elastalert/versions/1.2.3/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/elastalert/versions/1.2.3"
                      }
                  }
              }
          },
          {
              "id": "stable/elastic-stack",
              "type": "chart",
              "attributes": {
                  "name": "elastic-stack",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "A Helm chart for ELK",
                  "home": "https://www.elastic.co/products",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "rendhalver",
                          "email": "pete.brown@powerhrg.com"
                      },
                      {
                          "name": "jar361",
                          "email": "jrodgers@powerhrg.com"
                      },
                      {
                          "name": "christian-roggia",
                          "email": "christian.roggia@gmail.com"
                      }
                  ],
                  "sources": [],
                  "icon": "/v1/assets/stable/elastic-stack/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/elastic-stack"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.8.0",
                          "app_version": "6",
                          "created": "2019-11-06T08:58:33.598Z",
                          "digest": "8b1575212f5655acf3c40e8faac9ade182b29d71df76ada508ecf48a22e5b36b",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/elastic-stack-1.8.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/elastic-stack/versions/1.8.0/README.md",
                          "values": "/v1/assets/stable/elastic-stack/versions/1.8.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/elastic-stack/versions/1.8.0"
                      }
                  }
              }
          },
          {
              "id": "bitnami/elasticsearch",
              "type": "chart",
              "attributes": {
                  "name": "elasticsearch",
                  "repo": {
                      "name": "bitnami",
                      "url": "https://charts.bitnami.com/bitnami"
                  },
                  "description": "A highly scalable open-source full-text search and analytics engine",
                  "home": "https://www.elastic.co/products/elasticsearch",
                  "keywords": [
                      "elasticsearch"
                  ],
                  "maintainers": [
                      {
                          "name": "Bitnami",
                          "email": "containers@bitnami.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/bitnami/bitnami-docker-elasticsearch"
                  ],
                  "icon": "/v1/assets/bitnami/elasticsearch/logo"
              },
              "links": {
                  "self": "/v1/charts/bitnami/elasticsearch"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "8.0.2",
                          "app_version": "7.4.2",
                          "created": "2019-11-06T09:38:39.595Z",
                          "digest": "ee1dbe549ae9523b30144816b6bcb7fa148a5814ba33efc367076d9f5fdadbd1",
                          "urls": [
                              "https://charts.bitnami.com/bitnami/elasticsearch-8.0.2.tgz"
                          ],
                          "readme": "/v1/assets/bitnami/elasticsearch/versions/8.0.2/README.md",
                          "values": "/v1/assets/bitnami/elasticsearch/versions/8.0.2/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/bitnami/elasticsearch/versions/8.0.2"
                      }
                  }
              }
          },
          {
              "id": "stable/elasticsearch",
              "type": "chart",
              "attributes": {
                  "name": "elasticsearch",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Flexible and powerful open source, distributed real-time search and analytics engine.",
                  "home": "https://www.elastic.co/products/elasticsearch",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "simonswine",
                          "email": "christian@jetstack.io"
                      },
                      {
                          "name": "icereval",
                          "email": "michael.haselton@gmail.com"
                      },
                      {
                          "name": "rendhalver",
                          "email": "pete.brown@powerhrg.com"
                      },
                      {
                          "name": "desaintmartin",
                          "email": "cedric@desaintmartin.fr"
                      },
                      {
                          "name": "KongZ",
                          "email": "goonohc@gmail.com"
                      },
                      {
                          "name": "hectorj2f",
                          "email": "hfernandez@mesosphere.com"
                      }
                  ],
                  "sources": [
                      "https://www.elastic.co/products/elasticsearch",
                      "https://github.com/jetstack/elasticsearch-pet",
                      "https://github.com/giantswarm/kubernetes-elastic-stack",
                      "https://github.com/GoogleCloudPlatform/elasticsearch-docker",
                      "https://github.com/clockworksoul/helm-elasticsearch",
                      "https://github.com/pires/kubernetes-elasticsearch-cluster"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/elasticsearch"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.32.0",
                          "app_version": "6.8.2",
                          "created": "2019-11-06T08:58:33.6Z",
                          "digest": "6fe41d84b6319231c970a237a48def533e6c973cfae6a0fbf0b3d44ccd42b180",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/elasticsearch-1.32.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/elasticsearch/versions/1.32.0/README.md",
                          "values": "/v1/assets/stable/elasticsearch/versions/1.32.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/elasticsearch/versions/1.32.0"
                      }
                  }
              }
          },
          {
              "id": "stable/elasticsearch-curator",
              "type": "chart",
              "attributes": {
                  "name": "elasticsearch-curator",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "A Helm chart for Elasticsearch Curator",
                  "home": "https://github.com/elastic/curator",
                  "keywords": [
                      "curator",
                      "elasticsearch",
                      "elasticsearch-curator"
                  ],
                  "maintainers": [
                      {
                          "name": "desaintmartin",
                          "email": "cedric.dsm@gmail.com"
                      },
                      {
                          "name": "gianrubio",
                          "email": "gianrubio@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/kubernetes/charts/elasticsearch-curator",
                      "https://github.com/pires/docker-elasticsearch-curator"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/elasticsearch-curator"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "2.1.0",
                          "app_version": "5.7.6",
                          "created": "2019-11-06T08:58:33.601Z",
                          "digest": "698a6d996cd1d4f88bfa51c8aac530755006fa9769e2a480861855ef0da6de18",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/elasticsearch-curator-2.1.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/elasticsearch-curator/versions/2.1.0/README.md",
                          "values": "/v1/assets/stable/elasticsearch-curator/versions/2.1.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/elasticsearch-curator/versions/2.1.0"
                      }
                  }
              }
          },
          {
              "id": "stable/elasticsearch-exporter",
              "type": "chart",
              "attributes": {
                  "name": "elasticsearch-exporter",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Elasticsearch stats exporter for Prometheus",
                  "home": "https://github.com/justwatchcom/elasticsearch_exporter",
                  "keywords": [
                      "metrics",
                      "elasticsearch",
                      "monitoring"
                  ],
                  "maintainers": [
                      {
                          "name": "svenmueller",
                          "email": "sven.mueller@commercetools.com"
                      },
                      {
                          "name": "caarlos0",
                          "email": "carlos@carlosbecker.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/justwatchcom/elasticsearch_exporter"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/elasticsearch-exporter"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "2.1.0",
                          "app_version": "1.1.0",
                          "created": "2019-11-06T08:58:33.602Z",
                          "digest": "88e36f496b0cf33d0cb3e885844565f28e26a67811bd8abe9883922b737c65d1",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/elasticsearch-exporter-2.1.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/elasticsearch-exporter/versions/2.1.0/README.md",
                          "values": "/v1/assets/stable/elasticsearch-exporter/versions/2.1.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/elasticsearch-exporter/versions/2.1.0"
                      }
                  }
              }
          },
          {
              "id": "stable/envoy",
              "type": "chart",
              "attributes": {
                  "name": "envoy",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Envoy is an open source edge and service proxy, designed for cloud-native applications.",
                  "home": "https://www.envoyproxy.io/",
                  "keywords": [
                      "envoy",
                      "proxy"
                  ],
                  "maintainers": [
                      {
                          "name": "josdotso",
                          "email": "josdotso@cisco.com"
                      },
                      {
                          "name": "mumoshu",
                          "email": "ykuoka@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/envoyproxy/envoy"
                  ],
                  "icon": "/v1/assets/stable/envoy/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/envoy"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.8.2",
                          "app_version": "1.11.2",
                          "created": "2019-11-06T08:58:33.602Z",
                          "digest": "89b54b342867012eaa8de27140197190024e2408fea3b61c612e217fff739b4c",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/envoy-1.8.2.tgz"
                          ],
                          "readme": "/v1/assets/stable/envoy/versions/1.8.2/README.md",
                          "values": "/v1/assets/stable/envoy/versions/1.8.2/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/envoy/versions/1.8.2"
                      }
                  }
              }
          },
          {
              "id": "incubator/etcd",
              "type": "chart",
              "attributes": {
                  "name": "etcd",
                  "repo": {
                      "name": "incubator",
                      "url": "https://kubernetes-charts-incubator.storage.googleapis.com"
                  },
                  "description": "Distributed reliable key-value store for the most critical data of a distributed system.",
                  "home": "https://github.com/coreos/etcd",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "lachie83",
                          "email": "lachlan@deis.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/coreos/etcd"
                  ],
                  "icon": "/v1/assets/incubator/etcd/logo"
              },
              "links": {
                  "self": "/v1/charts/incubator/etcd"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.7.3",
                          "app_version": "3.2.26",
                          "created": "2019-11-06T09:29:02Z",
                          "digest": "bb3b1ea34577702c68a84e710f9aa8bf665ebfd4af18b239b4869126f109ba2b",
                          "urls": [
                              "https://kubernetes-charts-incubator.storage.googleapis.com/etcd-0.7.3.tgz"
                          ],
                          "readme": "/v1/assets/incubator/etcd/versions/0.7.3/README.md",
                          "values": "/v1/assets/incubator/etcd/versions/0.7.3/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/incubator/etcd/versions/0.7.3"
                      }
                  }
              }
          },
          {
              "id": "bitnami/etcd",
              "type": "chart",
              "attributes": {
                  "name": "etcd",
                  "repo": {
                      "name": "bitnami",
                      "url": "https://charts.bitnami.com/bitnami"
                  },
                  "description": "etcd is a distributed key value store that provides a reliable way to store data across a cluster of machines",
                  "home": "https://coreos.com/etcd/",
                  "keywords": [
                      "etcd",
                      "cluster",
                      "database",
                      "cache",
                      "key-value"
                  ],
                  "maintainers": [
                      {
                          "name": "Bitnami",
                          "email": "containers@bitnami.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/bitnami/bitnami-docker-etcd"
                  ],
                  "icon": "/v1/assets/bitnami/etcd/logo"
              },
              "links": {
                  "self": "/v1/charts/bitnami/etcd"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "4.4.1",
                          "app_version": "3.4.3",
                          "created": "2019-11-06T09:38:39.597Z",
                          "digest": "69fb49b0c9bd05c0e0f4728a69eead3c5e6eaf1639a7b52a0518172db2060c07",
                          "urls": [
                              "https://charts.bitnami.com/bitnami/etcd-4.4.1.tgz"
                          ],
                          "readme": "/v1/assets/bitnami/etcd/versions/4.4.1/README.md",
                          "values": "/v1/assets/bitnami/etcd/versions/4.4.1/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/bitnami/etcd/versions/4.4.1"
                      }
                  }
              }
          },
          {
              "id": "stable/etcd-operator",
              "type": "chart",
              "attributes": {
                  "name": "etcd-operator",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "CoreOS etcd-operator Helm chart for Kubernetes",
                  "home": "https://github.com/coreos/etcd-operator",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "lachie83",
                          "email": "lachlan@deis.com"
                      },
                      {
                          "name": "alejandroEsc",
                          "email": "jaescobar.cell@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/coreos/etcd-operator"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/etcd-operator"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.10.0",
                          "app_version": "0.9.4",
                          "created": "2019-11-06T08:58:33.603Z",
                          "digest": "5bc4d29fdd4b8f6fe8273ed91d67f1cbebb8275add849beccc9baaa248036f16",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/etcd-operator-0.10.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/etcd-operator/versions/0.10.0/README.md",
                          "values": "/v1/assets/stable/etcd-operator/versions/0.10.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/etcd-operator/versions/0.10.0"
                      }
                  }
              }
          },
          {
              "id": "stable/ethereum",
              "type": "chart",
              "attributes": {
                  "name": "ethereum",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "private Ethereum network Helm chart for Kubernetes",
                  "home": "https://www.ethereum.org/",
                  "keywords": [
                      "ethereum",
                      "blockchain"
                  ],
                  "maintainers": [
                      {
                          "name": "jpoon",
                          "email": "kubernetes@jasonpoon.ca"
                      }
                  ],
                  "sources": [
                      "https://github.com/ethereum/go-ethereum"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/ethereum"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.0.0",
                          "app_version": "v1.7.3",
                          "created": "2019-11-06T08:58:33.604Z",
                          "digest": "0708ae1169805ad383ea799cfd530eeadf5a5bd0d4466993e23c230e7cfd2a4e",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/ethereum-1.0.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/ethereum/versions/1.0.0/README.md",
                          "values": "/v1/assets/stable/ethereum/versions/1.0.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/ethereum/versions/1.0.0"
                      }
                  }
              }
          },
          {
              "id": "stable/eventrouter",
              "type": "chart",
              "attributes": {
                  "name": "eventrouter",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "A Helm chart for eventruter (https://github.com/heptiolabs/eventrouter)",
                  "home": "https://github.com/heptiolabs/eventrouter",
                  "keywords": [
                      "eventrouter"
                  ],
                  "maintainers": [
                      {
                          "name": "gianrubio",
                          "email": "gianrubio@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/heptiolabs/eventrouter"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/eventrouter"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.2.2",
                          "app_version": "0.2",
                          "created": "2019-11-06T08:58:33.604Z",
                          "digest": "3b34c3447ea221eab1a96f8e379a9f30230e3098d89e1993f754ce767c7c82a0",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/eventrouter-0.2.2.tgz"
                          ],
                          "readme": "/v1/assets/stable/eventrouter/versions/0.2.2/README.md",
                          "values": "/v1/assets/stable/eventrouter/versions/0.2.2/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/eventrouter/versions/0.2.2"
                      }
                  }
              }
          },
          {
              "id": "stable/express-gateway",
              "type": "chart",
              "attributes": {
                  "name": "express-gateway",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Express Gateway is an API Gateway that sits at the heart of any microservices architecture",
                  "home": "https://express-gateway.io",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "XVincentX",
                          "email": "vincenz.chianese@icloud.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/expressgateway/express-gateway"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/express-gateway"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.6.3",
                          "app_version": "1.16.9",
                          "created": "2019-11-06T08:58:33.606Z",
                          "digest": "a11468dfd6c09b778c4a93bca85f3a01aadba5cb1aab536ad8d5352decb392d3",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/express-gateway-1.6.3.tgz"
                          ],
                          "readme": "/v1/assets/stable/express-gateway/versions/1.6.3/README.md",
                          "values": "/v1/assets/stable/express-gateway/versions/1.6.3/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/express-gateway/versions/1.6.3"
                      }
                  }
              }
          },
          {
              "id": "bitnami/external-dns",
              "type": "chart",
              "attributes": {
                  "name": "external-dns",
                  "repo": {
                      "name": "bitnami",
                      "url": "https://charts.bitnami.com/bitnami"
                  },
                  "description": "ExternalDNS is a Kubernetes addon that configures public DNS servers with information about exposed Kubernetes services to make them discoverable.",
                  "home": "https://github.com/kubernetes-incubator/external-dns",
                  "keywords": [
                      "external-dns",
                      "network",
                      "dns"
                  ],
                  "maintainers": [
                      {
                          "name": "Bitnami",
                          "email": "containers@bitnami.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/kubernetes-incubator/external-dns",
                      "https://github.com/bitnami/bitnami-docker-external-dns"
                  ],
                  "icon": "/v1/assets/bitnami/external-dns/logo"
              },
              "links": {
                  "self": "/v1/charts/bitnami/external-dns"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "2.10.2",
                          "app_version": "0.5.17",
                          "created": "2019-11-06T09:38:39.598Z",
                          "digest": "88de85f8366ca6ad934ccfb5085cd140e96c8e834a4ad93e45c7aa2f8b323374",
                          "urls": [
                              "https://charts.bitnami.com/bitnami/external-dns-2.10.2.tgz"
                          ],
                          "readme": "/v1/assets/bitnami/external-dns/versions/2.10.2/README.md",
                          "values": "/v1/assets/bitnami/external-dns/versions/2.10.2/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/bitnami/external-dns/versions/2.10.2"
                      }
                  }
              }
          },
          {
              "id": "stable/factorio",
              "type": "chart",
              "attributes": {
                  "name": "factorio",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Factorio dedicated server.",
                  "home": "https://www.factorio.com/",
                  "keywords": [
                      "game",
                      "server"
                  ],
                  "maintainers": [
                      {
                          "name": "gtaylor",
                          "email": "gtaylor@gc-taylor.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/games-on-k8s/docker-factorio"
                  ],
                  "icon": "/v1/assets/stable/factorio/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/factorio"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.0.0",
                          "app_version": "0.15.39",
                          "created": "2019-11-06T08:58:33.608Z",
                          "digest": "648d19a45ee5824936f42f780e4f7c6223b454afcb41b9bceb0b2f352d885b1c",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/factorio-1.0.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/factorio/versions/1.0.0/README.md",
                          "values": "/v1/assets/stable/factorio/versions/1.0.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/factorio/versions/1.0.0"
                      }
                  }
              }
          },
          {
              "id": "stable/falco",
              "type": "chart",
              "attributes": {
                  "name": "falco",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Falco",
                  "home": "https://falco.org",
                  "keywords": [
                      "monitoring",
                      "security",
                      "alerting",
                      "metric",
                      "troubleshooting",
                      "run-time"
                  ],
                  "maintainers": [
                      {
                          "name": "nestorsalceda",
                          "email": "nestor.salceda@sysdig.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/falcosecurity/falco"
                  ],
                  "icon": "/v1/assets/stable/falco/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/falco"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.0.9",
                          "app_version": "0.17.1",
                          "created": "2019-11-06T08:58:33.611Z",
                          "digest": "447a74345f58d42e4694730dba18944246f2a134926ae66419ac90adc29f304a",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/falco-1.0.9.tgz"
                          ],
                          "readme": "/v1/assets/stable/falco/versions/1.0.9/README.md",
                          "values": "/v1/assets/stable/falco/versions/1.0.9/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/falco/versions/1.0.9"
                      }
                  }
              }
          },
          {
              "id": "stable/filebeat",
              "type": "chart",
              "attributes": {
                  "name": "filebeat",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "A Helm chart to collect Kubernetes logs with filebeat",
                  "home": "https://www.elastic.co/products/beats/filebeat",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "rendhalver",
                          "email": "pete.brown@powerhrg.com"
                      },
                      {
                          "name": "sstarcher",
                          "email": "shane.starcher@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://www.elastic.co/guide/en/beats/filebeat/current/index.html"
                  ],
                  "icon": "/v1/assets/stable/filebeat/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/filebeat"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "3.1.0",
                          "app_version": "7.0.1",
                          "created": "2019-11-06T08:58:33.611Z",
                          "digest": "26d490646cbec553d90cf6d27e01c58c6275f1d1986deffe98ffe6a72fb13f6b",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/filebeat-3.1.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/filebeat/versions/3.1.0/README.md",
                          "values": "/v1/assets/stable/filebeat/versions/3.1.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/filebeat/versions/3.1.0"
                      }
                  }
              }
          },
          {
              "id": "stable/fluent-bit",
              "type": "chart",
              "attributes": {
                  "name": "fluent-bit",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Fast and Lightweight Log/Data Forwarder for Linux, BSD and OSX",
                  "home": "https://fluentbit.io",
                  "keywords": [
                      "logging",
                      "monitoring",
                      "fluent",
                      "fluentd"
                  ],
                  "maintainers": [
                      {
                          "name": "kfox1111",
                          "email": "Kevin.Fox@pnnl.gov"
                      },
                      {
                          "name": "edsiper",
                          "email": "eduardo@treasure-data.com"
                      },
                      {
                          "name": "hectorj2f",
                          "email": "hfernandez@mesosphere.com"
                      }
                  ],
                  "sources": [
                      "https://fluentbit.io"
                  ],
                  "icon": "/v1/assets/stable/fluent-bit/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/fluent-bit"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "2.8.0",
                          "app_version": "1.3.2",
                          "created": "2019-11-06T08:58:33.612Z",
                          "digest": "f39c7765a25ec0a38b3dff4252991016beacb9bd026498631ca8aa89b44837a5",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/fluent-bit-2.8.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/fluent-bit/versions/2.8.0/README.md",
                          "values": "/v1/assets/stable/fluent-bit/versions/2.8.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/fluent-bit/versions/2.8.0"
                      }
                  }
              }
          },
          {
              "id": "stable/fluentd",
              "type": "chart",
              "attributes": {
                  "name": "fluentd",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "A Fluentd Elasticsearch Helm chart for Kubernetes.",
                  "home": "https://www.fluentd.org/",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "rendhalver",
                          "email": "pete.brown@powerhrg.com"
                      },
                      {
                          "name": "miouge1",
                          "email": "maxime@root314.com"
                      },
                      {
                          "name": "hectorj2f",
                          "email": "hfernandez@mesosphere.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/kubernetes/kubernetes/tree/master/cluster/addons/fluentd-elasticsearch/fluentd-es-image",
                      "https://quay.io/repository/coreos/fluentd-kubernetes",
                      "https://github.com/coreos/fluentd-kubernetes-daemonset",
                      "https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/fluentd"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "2.2.0",
                          "app_version": "v2.4.0",
                          "created": "2019-11-06T08:58:33.612Z",
                          "digest": "1d0578ad338358b87760f4ee41cea6ab8151a48acffd5ef3b07b449d00489bad",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/fluentd-2.2.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/fluentd/versions/2.2.0/README.md",
                          "values": "/v1/assets/stable/fluentd/versions/2.2.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/fluentd/versions/2.2.0"
                      }
                  }
              }
          },
          {
              "id": "bitnami/fluentd",
              "type": "chart",
              "attributes": {
                  "name": "fluentd",
                  "repo": {
                      "name": "bitnami",
                      "url": "https://charts.bitnami.com/bitnami"
                  },
                  "description": "Fluentd is an open source data collector for unified logging layer",
                  "home": "https://www.fluentd.org/",
                  "keywords": [
                      "fluentd",
                      "logging",
                      "logs",
                      "data",
                      "collector"
                  ],
                  "maintainers": [
                      {
                          "name": "Bitnami",
                          "email": "containers@bitnami.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/bitnami/bitnami-docker-fluentd"
                  ],
                  "icon": "/v1/assets/bitnami/fluentd/logo"
              },
              "links": {
                  "self": "/v1/charts/bitnami/fluentd"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.2.0",
                          "app_version": "1.7.4",
                          "created": "2019-11-06T09:38:39.599Z",
                          "digest": "1e9bcd0612b7663894b22eaa686b61173254d5a33021726bc4a3ff3f2e31efcb",
                          "urls": [
                              "https://charts.bitnami.com/bitnami/fluentd-0.2.0.tgz"
                          ],
                          "readme": "/v1/assets/bitnami/fluentd/versions/0.2.0/README.md",
                          "values": "/v1/assets/bitnami/fluentd/versions/0.2.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/bitnami/fluentd/versions/0.2.0"
                      }
                  }
              }
          },
          {
              "id": "incubator/fluentd-cloudwatch",
              "type": "chart",
              "attributes": {
                  "name": "fluentd-cloudwatch",
                  "repo": {
                      "name": "incubator",
                      "url": "https://kubernetes-charts-incubator.storage.googleapis.com"
                  },
                  "description": "A Fluentd CloudWatch Helm chart for Kubernetes.",
                  "home": "https://www.fluentd.org/",
                  "keywords": [
                      "fluentd",
                      "cloudwatch",
                      "logging"
                  ],
                  "maintainers": [
                      {
                          "name": "jmcarp",
                          "email": "jm.carp@gmail.com"
                      },
                      {
                          "name": "icereval",
                          "email": "michael.haselton@gmail.com"
                      },
                      {
                          "name": "kenden",
                          "email": "quentin.nerden@stylight.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/kubernetes/charts",
                      "https://github.com/fluent/fluentd-kubernetes-daemonset"
                  ],
                  "icon": "/v1/assets/incubator/fluentd-cloudwatch/logo"
              },
              "links": {
                  "self": "/v1/charts/incubator/fluentd-cloudwatch"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.11.1",
                          "app_version": "v1.7.3-debian-cloudwatch-1.0",
                          "created": "2019-11-06T09:29:02.001Z",
                          "digest": "66a1e3e0aa78368df71d687205205afae1cd5963b349e94d36d14988cc162338",
                          "urls": [
                              "https://kubernetes-charts-incubator.storage.googleapis.com/fluentd-cloudwatch-0.11.1.tgz"
                          ],
                          "readme": "/v1/assets/incubator/fluentd-cloudwatch/versions/0.11.1/README.md",
                          "values": "/v1/assets/incubator/fluentd-cloudwatch/versions/0.11.1/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/incubator/fluentd-cloudwatch/versions/0.11.1"
                      }
                  }
              }
          },
          {
              "id": "stable/gangway",
              "type": "chart",
              "attributes": {
                  "name": "gangway",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "An application that can be used to easily enable authentication flows via OIDC for a kubernetes cluster.",
                  "home": "https://github.com/heptiolabs/gangway",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "rk295",
                          "email": "robin@kearney.co.uk"
                      }
                  ],
                  "sources": [
                      "https://github.com/heptiolabs/gangway"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/gangway"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.3.2",
                          "app_version": "3.0.0",
                          "created": "2019-11-06T08:58:33.614Z",
                          "digest": "4165048d20c32e250732e19489331d3289426d051576ba8e88f4759433154b62",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/gangway-0.3.2.tgz"
                          ],
                          "readme": "/v1/assets/stable/gangway/versions/0.3.2/README.md",
                          "values": "/v1/assets/stable/gangway/versions/0.3.2/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/gangway/versions/0.3.2"
                      }
                  }
              }
          },
          {
              "id": "stable/gce-ingress",
              "type": "chart",
              "attributes": {
                  "name": "gce-ingress",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "A GCE Ingress Controller",
                  "home": "https://github.com/kubernetes/ingress-gce",
                  "keywords": [
                      "ingress",
                      "gce"
                  ],
                  "maintainers": [
                      {
                          "name": "paulczar",
                          "email": "username.taken@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/kubernetes/ingress-gce"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/gce-ingress"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.2.0",
                          "app_version": "1.4.0",
                          "created": "2019-11-06T08:58:33.614Z",
                          "digest": "b915208c89363eced6aec4a0b561477f2a45fb3659e28752debdb6e94b09135f",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/gce-ingress-1.2.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/gce-ingress/versions/1.2.0/README.md",
                          "values": "/v1/assets/stable/gce-ingress/versions/1.2.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/gce-ingress/versions/1.2.0"
                      }
                  }
              }
          },
          {
              "id": "stable/gcp-night-king",
              "type": "chart",
              "attributes": {
                  "name": "gcp-night-king",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "A Helm chart for GCP Night King",
                  "home": "https://hub.docker.com/r/itamarost/gcp-night-king/",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "itamaro",
                          "email": "itamarost@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/itamaro/gcp-go-night-king",
                      "https://github.com/itamaro/gcp-night-king"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/gcp-night-king"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.0.2",
                          "app_version": "1",
                          "created": "2019-11-06T08:58:33.616Z",
                          "digest": "0ffbe26c1c11e8d3416940de126a7467e7166fabe4e7e9e7feb1f2813f18b00a",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/gcp-night-king-1.0.2.tgz"
                          ],
                          "readme": "/v1/assets/stable/gcp-night-king/versions/1.0.2/README.md",
                          "values": "/v1/assets/stable/gcp-night-king/versions/1.0.2/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/gcp-night-king/versions/1.0.2"
                      }
                  }
              }
          },
          {
              "id": "bitnami/ghost",
              "type": "chart",
              "attributes": {
                  "name": "ghost",
                  "repo": {
                      "name": "bitnami",
                      "url": "https://charts.bitnami.com/bitnami"
                  },
                  "description": "A simple, powerful publishing platform that allows you to share your stories with the world",
                  "home": "http://www.ghost.org/",
                  "keywords": [
                      "ghost",
                      "blog",
                      "http",
                      "web",
                      "application",
                      "nodejs",
                      "javascript"
                  ],
                  "maintainers": [
                      {
                          "name": "Bitnami",
                          "email": "containers@bitnami.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/bitnami/bitnami-docker-ghost"
                  ],
                  "icon": "/v1/assets/bitnami/ghost/logo"
              },
              "links": {
                  "self": "/v1/charts/bitnami/ghost"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "8.0.4",
                          "app_version": "3.0.2",
                          "created": "2019-11-06T09:38:39.601Z",
                          "digest": "2f217a9f7f21ab90271f3c69fffd23ae3306665dedbea37c9f40fa050399c870",
                          "urls": [
                              "https://charts.bitnami.com/bitnami/ghost-8.0.4.tgz"
                          ],
                          "readme": "/v1/assets/bitnami/ghost/versions/8.0.4/README.md",
                          "values": "/v1/assets/bitnami/ghost/versions/8.0.4/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/bitnami/ghost/versions/8.0.4"
                      }
                  }
              }
          },
          {
              "id": "stable/gocd",
              "type": "chart",
              "attributes": {
                  "name": "gocd",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "GoCD is an open-source continuous delivery server to model and visualize complex workflows with ease.",
                  "home": "https://www.gocd.org/",
                  "keywords": [
                      "gocd",
                      "ci",
                      "cd",
                      "ci/cd",
                      "continuous-integration",
                      "continuous-delivery",
                      "continuous-deployment",
                      "continuous-testing"
                  ],
                  "maintainers": [
                      {
                          "name": "arvindsv",
                          "email": "arvind@thoughtworks.com"
                      },
                      {
                          "name": "ganeshspatil",
                          "email": "ganeshpl@thoughtworks.com"
                      },
                      {
                          "name": "varshavaradarajan",
                          "email": "varshasvaradarajan@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/gocd/gocd"
                  ],
                  "icon": "/v1/assets/stable/gocd/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/gocd"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.19.0",
                          "app_version": "19.10.0",
                          "created": "2019-11-06T08:58:33.623Z",
                          "digest": "47108a1b2eb3481555ad23fd8e77f557d9cc9b55737c7fec3cf3f7e55ee9a9bc",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/gocd-1.19.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/gocd/versions/1.19.0/README.md",
                          "values": "/v1/assets/stable/gocd/versions/1.19.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/gocd/versions/1.19.0"
                      }
                  }
              }
          },
          {
              "id": "incubator/gogs",
              "type": "chart",
              "attributes": {
                  "name": "gogs",
                  "repo": {
                      "name": "incubator",
                      "url": "https://kubernetes-charts-incubator.storage.googleapis.com"
                  },
                  "description": "Gogs: Go Git Service",
                  "home": "https://gogs.io/",
                  "keywords": [
                      "git"
                  ],
                  "maintainers": [
                      {
                          "name": "obeyler"
                      },
                      {
                          "name": "poblin-orange"
                      }
                  ],
                  "sources": [],
                  "icon": "/v1/assets/incubator/gogs/logo"
              },
              "links": {
                  "self": "/v1/charts/incubator/gogs"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.7.10",
                          "app_version": "0.11.86",
                          "created": "2019-11-06T09:29:02.003Z",
                          "digest": "f1cf97cc089313198603aa9a552808a76113261814f7defc034b0182b9983709",
                          "urls": [
                              "https://kubernetes-charts-incubator.storage.googleapis.com/gogs-0.7.10.tgz"
                          ],
                          "readme": "/v1/assets/incubator/gogs/versions/0.7.10/README.md",
                          "values": "/v1/assets/incubator/gogs/versions/0.7.10/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/incubator/gogs/versions/0.7.10"
                      }
                  }
              }
          },
          {
              "id": "incubator/goldfish",
              "type": "chart",
              "attributes": {
                  "name": "goldfish",
                  "repo": {
                      "name": "incubator",
                      "url": "https://kubernetes-charts-incubator.storage.googleapis.com"
                  },
                  "description": "A Helm chart for Goldfish - Vault UI",
                  "home": "https://vault-ui.io",
                  "keywords": [
                      "goldfish",
                      "vault-ui"
                  ],
                  "maintainers": [
                      {
                          "name": "tuannvm",
                          "email": "me@tuannvm.com"
                      },
                      {
                          "name": "mlaccetti",
                          "email": "michael@laccetti.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/Caiyeon/goldfish"
                  ],
                  "icon": "/v1/assets/incubator/goldfish/logo"
              },
              "links": {
                  "self": "/v1/charts/incubator/goldfish"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.2.7",
                          "app_version": "0.9.0",
                          "created": "2019-11-06T09:29:02.003Z",
                          "digest": "4cb08834971b7188ba5233af08bb73152a7b53045892b9d07d6c0f158fd6748f",
                          "urls": [
                              "https://kubernetes-charts-incubator.storage.googleapis.com/goldfish-0.2.7.tgz"
                          ],
                          "readme": "/v1/assets/incubator/goldfish/versions/0.2.7/README.md",
                          "values": "/v1/assets/incubator/goldfish/versions/0.2.7/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/incubator/goldfish/versions/0.2.7"
                      }
                  }
              }
          },
          {
              "id": "stable/goldpinger",
              "type": "chart",
              "attributes": {
                  "name": "goldpinger",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Goldpinger makes calls between its instances for visibility and alerting.",
                  "home": "https://github.com/bloomberg/goldpinger",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "okgolove",
                          "email": "okgolove@markeloff.net"
                      },
                      {
                          "name": "s-vkropotko",
                          "email": "vjkropotko@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/bloomberg/goldpinger"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/goldpinger"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "2.0.0",
                          "app_version": "2.0.0",
                          "created": "2019-11-06T08:58:33.624Z",
                          "digest": "0098cbc7f1d4537060e7549d5d21cd898fa7d70361123b07ec07f4f02d0c74f4",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/goldpinger-2.0.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/goldpinger/versions/2.0.0/README.md",
                          "values": "/v1/assets/stable/goldpinger/versions/2.0.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/goldpinger/versions/2.0.0"
                      }
                  }
              }
          },
          {
              "id": "stable/grafana",
              "type": "chart",
              "attributes": {
                  "name": "grafana",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "The leading tool for querying and visualizing time series and metrics.",
                  "home": "https://grafana.net",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "zanhsieh",
                          "email": "zanhsieh@gmail.com"
                      },
                      {
                          "name": "rtluckie",
                          "email": "rluckie@cisco.com"
                      },
                      {
                          "name": "maorfr",
                          "email": "maor.friedman@redhat.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/grafana/grafana"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/grafana"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "4.0.1",
                          "app_version": "6.4.2",
                          "created": "2019-11-06T08:58:33.626Z",
                          "digest": "a860a4f64c7096760fa1aed141bfd630f5f1d539c4b1c84d95008fa0ed00fd2a",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/grafana-4.0.1.tgz"
                          ],
                          "readme": "/v1/assets/stable/grafana/versions/4.0.1/README.md",
                          "values": "/v1/assets/stable/grafana/versions/4.0.1/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/grafana/versions/4.0.1"
                      }
                  }
              }
          },
          {
              "id": "bitnami/grafana",
              "type": "chart",
              "attributes": {
                  "name": "grafana",
                  "repo": {
                      "name": "bitnami",
                      "url": "https://charts.bitnami.com/bitnami"
                  },
                  "description": "Grafana is an open source, feature rich metrics dashboard and graph editor for Graphite, Elasticsearch, OpenTSDB, Prometheus and InfluxDB.",
                  "home": "https://grafana.com/",
                  "keywords": [
                      "analitics",
                      "monitoring",
                      "metrics",
                      "logs"
                  ],
                  "maintainers": [
                      {
                          "name": "Bitnami",
                          "email": "containers@bitnami.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/bitnami/bitnami-docker-grafana"
                  ],
                  "icon": "/v1/assets/bitnami/grafana/logo"
              },
              "links": {
                  "self": "/v1/charts/bitnami/grafana"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.1.0",
                          "app_version": "6.4.3",
                          "created": "2019-11-06T09:38:39.602Z",
                          "digest": "aa71509239f99c82bd7f0b6bf51ca55f49d220a483b17d0f8e484e160e25e3a9",
                          "urls": [
                              "https://charts.bitnami.com/bitnami/grafana-1.1.0.tgz"
                          ],
                          "readme": "/v1/assets/bitnami/grafana/versions/1.1.0/README.md",
                          "values": "/v1/assets/bitnami/grafana/versions/1.1.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/bitnami/grafana/versions/1.1.0"
                      }
                  }
              }
          },
          {
              "id": "incubator/grafana",
              "type": "chart",
              "attributes": {
                  "name": "grafana",
                  "repo": {
                      "name": "incubator",
                      "url": "https://kubernetes-charts-incubator.storage.googleapis.com"
                  },
                  "description": "A Helm chart for Kubernetes",
                  "home": "",
                  "keywords": [],
                  "maintainers": [],
                  "sources": [],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/incubator/grafana"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.1.3",
                          "app_version": "",
                          "created": "2016-12-15T21:18:28.698Z",
                          "digest": "07ff81d371496f046a04d197d9b0da4a15ad35f153e112590e4070a56721abfd",
                          "urls": [
                              "https://kubernetes-charts-incubator.storage.googleapis.com/grafana-0.1.3.tgz"
                          ],
                          "readme": "/v1/assets/incubator/grafana/versions/0.1.3/README.md",
                          "values": "/v1/assets/incubator/grafana/versions/0.1.3/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/incubator/grafana/versions/0.1.3"
                      }
                  }
              }
          },
          {
              "id": "stable/graylog",
              "type": "chart",
              "attributes": {
                  "name": "graylog",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Graylog is the centralized log management solution built to open standards for capturing, storing, and enabling real-time analysis of terabytes of machine data.",
                  "home": "https://www.graylog.org",
                  "keywords": [
                      "graylog",
                      "logs",
                      "syslog",
                      "gelf"
                  ],
                  "maintainers": [
                      {
                          "name": "KongZ",
                          "email": "goonohc@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://www.graylog.org"
                  ],
                  "icon": "/v1/assets/stable/graylog/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/graylog"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.3.9",
                          "app_version": "3.1.2-1",
                          "created": "2019-11-06T08:58:33.63Z",
                          "digest": "f38c841e41f7bb7917c9b4c040f5d67ea752a3d3aac13a69ba91b9c0ef4001a7",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/graylog-1.3.9.tgz"
                          ],
                          "readme": "/v1/assets/stable/graylog/versions/1.3.9/README.md",
                          "values": "/v1/assets/stable/graylog/versions/1.3.9/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/graylog/versions/1.3.9"
                      }
                  }
              }
          },
          {
              "id": "stable/hackmd",
              "type": "chart",
              "attributes": {
                  "name": "hackmd",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Realtime collaborative markdown notes on all platforms.",
                  "home": "https://hackmd.io",
                  "keywords": [
                      "hackmd",
                      "cms",
                      "markdown",
                      "http",
                      "web",
                      "application"
                  ],
                  "maintainers": [
                      {
                          "name": "yuanying",
                          "email": "yuanying@fraction.jp"
                      }
                  ],
                  "sources": [
                      "https://github.com/hackmdio/hackmd",
                      "https://github.com/hackmdio/docker-hackmd"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/hackmd"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.2.1",
                          "app_version": "1.3.0-alpine",
                          "created": "2019-11-06T08:58:33.632Z",
                          "digest": "fe204e05b0aa6bfd53e7d39d8eb7b61520d1bc8c871b001cb674721873064400",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/hackmd-1.2.1.tgz"
                          ],
                          "readme": "/v1/assets/stable/hackmd/versions/1.2.1/README.md",
                          "values": "/v1/assets/stable/hackmd/versions/1.2.1/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/hackmd/versions/1.2.1"
                      }
                  }
              }
          },
          {
              "id": "stable/hadoop",
              "type": "chart",
              "attributes": {
                  "name": "hadoop",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "The Apache Hadoop software library is a framework that allows for the distributed processing of large data sets across clusters of computers using simple programming models.",
                  "home": "https://hadoop.apache.org/",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "danisla",
                          "email": "disla@google.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/apache/hadoop"
                  ],
                  "icon": "/v1/assets/stable/hadoop/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/hadoop"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.1.1",
                          "app_version": "2.9.0",
                          "created": "2019-11-06T08:58:33.633Z",
                          "digest": "e690a9f98941800f8252471ef9ac472000b81236983110c056d013eb1f96ed77",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/hadoop-1.1.1.tgz"
                          ],
                          "readme": "/v1/assets/stable/hadoop/versions/1.1.1/README.md",
                          "values": "/v1/assets/stable/hadoop/versions/1.1.1/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/hadoop/versions/1.1.1"
                      }
                  }
              }
          },
          {
              "id": "incubator/haproxy-ingress",
              "type": "chart",
              "attributes": {
                  "name": "haproxy-ingress",
                  "repo": {
                      "name": "incubator",
                      "url": "https://kubernetes-charts-incubator.storage.googleapis.com"
                  },
                  "description": "Ingress controller implementation for haproxy loadbalancer.",
                  "home": "https://github.com/jcmoraisjr/haproxy-ingress",
                  "keywords": [
                      "ingress",
                      "haproxy"
                  ],
                  "maintainers": [
                      {
                          "name": "xianlubird",
                          "email": "xianlubird@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/jcmoraisjr/haproxy-ingress"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/incubator/haproxy-ingress"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.0.20",
                          "app_version": "0.7.2",
                          "created": "2019-11-06T09:29:02.004Z",
                          "digest": "04ab01b0a07832b4aa961ee6027157dddaa9a51cec3a452577abff680c80b3cc",
                          "urls": [
                              "https://kubernetes-charts-incubator.storage.googleapis.com/haproxy-ingress-0.0.20.tgz"
                          ],
                          "readme": "/v1/assets/incubator/haproxy-ingress/versions/0.0.20/README.md",
                          "values": "/v1/assets/incubator/haproxy-ingress/versions/0.0.20/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/incubator/haproxy-ingress/versions/0.0.20"
                      }
                  }
              }
          },
          {
              "id": "bitnami/harbor",
              "type": "chart",
              "attributes": {
                  "name": "harbor",
                  "repo": {
                      "name": "bitnami",
                      "url": "https://charts.bitnami.com/bitnami"
                  },
                  "description": "Harbor is an an open source trusted cloud native registry project that stores, signs, and scans content",
                  "home": "https://goharbor.io/",
                  "keywords": [
                      "docker",
                      "registry",
                      "vulnerability",
                      "scan"
                  ],
                  "maintainers": [
                      {
                          "name": "Bitnami",
                          "email": "containers@bitnami.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/bitnami/bitnami-docker-harbor-core",
                      "https://github.com/bitnami/bitnami-docker-harbor-portal",
                      "https://github.com/bitnami/bitnami-docker-harbor-jobservice",
                      "https://github.com/bitnami/bitnami-docker-harbor-registry",
                      "https://github.com/bitnami/bitnami-docker-harbor-registryctl"
                  ],
                  "icon": "/v1/assets/bitnami/harbor/logo"
              },
              "links": {
                  "self": "/v1/charts/bitnami/harbor"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "2.6.14",
                          "app_version": "1.9.1",
                          "created": "2019-11-06T09:38:39.61Z",
                          "digest": "822eebcea6799112303d7d14d067d8d5156108acc8b41f4c882cda01c1e3c4ae",
                          "urls": [
                              "https://charts.bitnami.com/bitnami/harbor-2.6.14.tgz"
                          ],
                          "readme": "/v1/assets/bitnami/harbor/versions/2.6.14/README.md",
                          "values": "/v1/assets/bitnami/harbor/versions/2.6.14/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/bitnami/harbor/versions/2.6.14"
                      }
                  }
              }
          },
          {
              "id": "stable/hazelcast",
              "type": "chart",
              "attributes": {
                  "name": "hazelcast",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Hazelcast IMDG is the most widely used in-memory data grid with hundreds of thousands of installed clusters around the world. It offers caching solutions ensuring that data is in the right place when it’s needed for optimal performance.",
                  "home": "http://hazelcast.org/",
                  "keywords": [
                      "hazelcast",
                      "keyvalue",
                      "in-memory",
                      "database",
                      "caching"
                  ],
                  "maintainers": [
                      {
                          "name": "leszko",
                          "email": "rafal@hazelcast.com"
                      },
                      {
                          "name": "googlielmo",
                          "email": "guglielmo@hazelcast.com"
                      },
                      {
                          "name": "mesutcelik",
                          "email": "mesut@hazelcast.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/hazelcast/hazelcast"
                  ],
                  "icon": "/v1/assets/stable/hazelcast/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/hazelcast"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "2.8.0",
                          "app_version": "3.12.4",
                          "created": "2019-11-06T08:58:33.634Z",
                          "digest": "fa07a8ac3abce1b42b3f78e8df0a88f567c88edc9a7d1443d81cc54af6abbaee",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/hazelcast-2.8.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/hazelcast/versions/2.8.0/README.md",
                          "values": "/v1/assets/stable/hazelcast/versions/2.8.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/hazelcast/versions/2.8.0"
                      }
                  }
              }
          },
          {
              "id": "stable/hazelcast-jet",
              "type": "chart",
              "attributes": {
                  "name": "hazelcast-jet",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Hazelcast Jet is an application embeddable, distributed computing engine built on top of Hazelcast In-Memory Data Grid (IMDG). With Hazelcast IMDG providing storage functionality, Hazelcast Jet performs parallel execution to enable data-intensive applications to operate in near real-time.",
                  "home": "http://jet.hazelcast.org/",
                  "keywords": [
                      "hazelcast",
                      "jet",
                      "streaming"
                  ],
                  "maintainers": [
                      {
                          "name": "emin",
                          "email": "emin@hazelcast.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/hazelcast/hazelcast-jet"
                  ],
                  "icon": "/v1/assets/stable/hazelcast-jet/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/hazelcast-jet"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.3.0",
                          "app_version": "3.2",
                          "created": "2019-11-06T08:58:33.635Z",
                          "digest": "df793f22f169495221261570a12df097187c7b96f96652431189dd809a0d3352",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/hazelcast-jet-1.3.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/hazelcast-jet/versions/1.3.0/README.md",
                          "values": "/v1/assets/stable/hazelcast-jet/versions/1.3.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/hazelcast-jet/versions/1.3.0"
                      }
                  }
              }
          },
          {
              "id": "svc-cat/healthcheck",
              "type": "chart",
              "attributes": {
                  "name": "healthcheck",
                  "repo": {
                      "name": "svc-cat",
                      "url": "https://svc-catalog-charts.storage.googleapis.com"
                  },
                  "description": "HealthCheck monitors the health of Service Catalog",
                  "home": "",
                  "keywords": [],
                  "maintainers": [],
                  "sources": [],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/svc-cat/healthcheck"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.3.0-beta.2",
                          "app_version": "",
                          "created": "2019-11-05T19:13:49.283Z",
                          "digest": "3d0fd2a0c09d8731b3d5c8e3d481a5c14f1daec8a2ff8300abbdc6ebacac34d0",
                          "urls": [
                              "https://svc-catalog-charts.storage.googleapis.com/healthcheck-0.3.0-beta.2.tgz"
                          ],
                          "readme": "/v1/assets/svc-cat/healthcheck/versions/0.3.0-beta.2/README.md",
                          "values": "/v1/assets/svc-cat/healthcheck/versions/0.3.0-beta.2/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/svc-cat/healthcheck/versions/0.3.0-beta.2"
                      }
                  }
              }
          },
          {
              "id": "stable/heapster",
              "type": "chart",
              "attributes": {
                  "name": "heapster",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Heapster enables Container Cluster Monitoring and Performance Analysis.",
                  "home": "https://github.com/kubernetes/heapster",
                  "keywords": [
                      "metrics",
                      "cadvisor",
                      "monitoring"
                  ],
                  "maintainers": [
                      {
                          "name": "jose5918",
                          "email": "jose.g.aguirre@intel.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/kubernetes/heapster",
                      "https://github.com/kubernetes/contrib/tree/master/addon-resizer"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/heapster"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.0.2",
                          "app_version": "1.5.4",
                          "created": "2019-11-06T08:58:33.636Z",
                          "digest": "45e860450ce0e0ab6186f02b9cba723df3dc230f3aab7cfa8809283cd7ca3100",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/heapster-1.0.2.tgz"
                          ],
                          "readme": "/v1/assets/stable/heapster/versions/1.0.2/README.md",
                          "values": "/v1/assets/stable/heapster/versions/1.0.2/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/heapster/versions/1.0.2"
                      }
                  }
              }
          },
          {
              "id": "stable/heartbeat",
              "type": "chart",
              "attributes": {
                  "name": "heartbeat",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "A Helm chart to periodically check the status of your services with heartbeat",
                  "home": "https://www.elastic.co/products/beats/heartbeat",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "mumoshu",
                          "email": "ykuoka@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://www.elastic.co/guide/en/beats/heartbeat/current/index.html"
                  ],
                  "icon": "/v1/assets/stable/heartbeat/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/heartbeat"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.2.0",
                          "app_version": "6.7.0",
                          "created": "2019-11-06T08:58:33.636Z",
                          "digest": "5b2ebf32632a0b33993040aafa56d752223de3f6453a867a9d1009a4db4de334",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/heartbeat-1.2.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/heartbeat/versions/1.2.0/README.md",
                          "values": "/v1/assets/stable/heartbeat/versions/1.2.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/heartbeat/versions/1.2.0"
                      }
                  }
              }
          },
          {
              "id": "stable/helm-exporter",
              "type": "chart",
              "attributes": {
                  "name": "helm-exporter",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Exports helm release stats to prometheus",
                  "home": "https://github.com/sstarcher/helm-exporter",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "sstarcher",
                          "email": "shane.starcher@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/sstarcher/helm-exporter"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/helm-exporter"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.3.1",
                          "app_version": "0.4.0",
                          "created": "2019-11-06T08:58:33.637Z",
                          "digest": "cf7f74afcd376c63a3aede5d9c283bcd45c2e8535c1b2fde615a10f1a873407b",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/helm-exporter-0.3.1.tgz"
                          ],
                          "readme": "/v1/assets/stable/helm-exporter/versions/0.3.1/README.md",
                          "values": "/v1/assets/stable/helm-exporter/versions/0.3.1/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/helm-exporter/versions/0.3.1"
                      }
                  }
              }
          },
          {
              "id": "stable/hl-composer",
              "type": "chart",
              "attributes": {
                  "name": "hl-composer",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Hyperledger Composer REST Server chart",
                  "home": "https://hyperledger.github.io/composer",
                  "keywords": [
                      "blockchain",
                      "hyperledger",
                      "fabric",
                      "composer"
                  ],
                  "maintainers": [
                      {
                          "name": "alexvicegrab",
                          "email": "sasha@aid.technology"
                      },
                      {
                          "name": "inzamam-iqbal",
                          "email": "inzamam@aid.technology"
                      },
                      {
                          "name": "dbandin",
                          "email": "diego@aid.technology"
                      }
                  ],
                  "sources": [
                      "https://github.com/hyperledger/composer"
                  ],
                  "icon": "/v1/assets/stable/hl-composer/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/hl-composer"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.0.12",
                          "app_version": "0.20.0",
                          "created": "2019-11-06T08:58:33.637Z",
                          "digest": "900132d88d331731d0a7c9ba8fe4d8647e1aa6081bbc06da9dd155bc170d0d84",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/hl-composer-1.0.12.tgz"
                          ],
                          "readme": "/v1/assets/stable/hl-composer/versions/1.0.12/README.md",
                          "values": "/v1/assets/stable/hl-composer/versions/1.0.12/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/hl-composer/versions/1.0.12"
                      }
                  }
              }
          },
          {
              "id": "stable/hlf-ca",
              "type": "chart",
              "attributes": {
                  "name": "hlf-ca",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Hyperledger Fabric Certificate Authority chart (these charts are created by AID:Tech and are currently not directly associated with the Hyperledger project)",
                  "home": "http://hyperledger-fabric-ca.readthedocs.io",
                  "keywords": [
                      "blockchain",
                      "hyperledger",
                      "fabric"
                  ],
                  "maintainers": [
                      {
                          "name": "alexvicegrab",
                          "email": "sasha@aid.technology"
                      },
                      {
                          "name": "inzamam-iqbal",
                          "email": "inzamam@aid.technology"
                      },
                      {
                          "name": "dbandin",
                          "email": "diego@aid.technology"
                      }
                  ],
                  "sources": [
                      "https://github.com/hyperledger/fabric-ca"
                  ],
                  "icon": "/v1/assets/stable/hlf-ca/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/hlf-ca"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.2.0",
                          "app_version": "1.4.3",
                          "created": "2019-11-06T08:58:33.639Z",
                          "digest": "1d24fd345d654e826c06bfc48ac28bfa2a26692b6ac14c2ebde52f4a01906399",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/hlf-ca-1.2.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/hlf-ca/versions/1.2.0/README.md",
                          "values": "/v1/assets/stable/hlf-ca/versions/1.2.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/hlf-ca/versions/1.2.0"
                      }
                  }
              }
          },
          {
              "id": "stable/hlf-couchdb",
              "type": "chart",
              "attributes": {
                  "name": "hlf-couchdb",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "CouchDB instance for Hyperledger Fabric (these charts are created by AID:Tech and are currently not directly associated with the Hyperledger project)",
                  "home": "http://hyperledger-fabric.readthedocs.io",
                  "keywords": [
                      "blockchain",
                      "hyperledger",
                      "fabric",
                      "couchdb"
                  ],
                  "maintainers": [
                      {
                          "name": "alexvicegrab",
                          "email": "sasha@aid.technology"
                      },
                      {
                          "name": "inzamam-iqbal",
                          "email": "inzamam@aid.technology"
                      },
                      {
                          "name": "dbandin",
                          "email": "diego@aid.technology"
                      }
                  ],
                  "sources": [
                      "https://github.com/hyperledger/fabric"
                  ],
                  "icon": "/v1/assets/stable/hlf-couchdb/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/hlf-couchdb"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.0.7",
                          "app_version": "0.4.10",
                          "created": "2019-11-06T08:58:33.639Z",
                          "digest": "8989fae7ad0297dc64379fd95472671adc7ed64981fcdfc1da5108ec66f1ffda",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/hlf-couchdb-1.0.7.tgz"
                          ],
                          "readme": "/v1/assets/stable/hlf-couchdb/versions/1.0.7/README.md",
                          "values": "/v1/assets/stable/hlf-couchdb/versions/1.0.7/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/hlf-couchdb/versions/1.0.7"
                      }
                  }
              }
          },
          {
              "id": "stable/hlf-ord",
              "type": "chart",
              "attributes": {
                  "name": "hlf-ord",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Hyperledger Fabric Orderer chart (these charts are created by AID:Tech and are currently not directly associated with the Hyperledger project)",
                  "home": "http://hyperledger-fabric.readthedocs.io",
                  "keywords": [
                      "blockchain",
                      "hyperledger",
                      "fabric"
                  ],
                  "maintainers": [
                      {
                          "name": "alexvicegrab",
                          "email": "sasha@aid.technology"
                      },
                      {
                          "name": "inzamam-iqbal",
                          "email": "inzamam@aid.technology"
                      },
                      {
                          "name": "dbandin",
                          "email": "diego@aid.technology"
                      }
                  ],
                  "sources": [
                      "https://github.com/hyperledger/fabric"
                  ],
                  "icon": "/v1/assets/stable/hlf-ord/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/hlf-ord"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.3.0",
                          "app_version": "1.4.3",
                          "created": "2019-11-06T08:58:33.64Z",
                          "digest": "d4aa7b9528376ce6c335a5ac8bb2f31fdedf8ef3c6f15a4b0cc8f80ae0b0b39b",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/hlf-ord-1.3.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/hlf-ord/versions/1.3.0/README.md",
                          "values": "/v1/assets/stable/hlf-ord/versions/1.3.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/hlf-ord/versions/1.3.0"
                      }
                  }
              }
          },
          {
              "id": "stable/hlf-peer",
              "type": "chart",
              "attributes": {
                  "name": "hlf-peer",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Hyperledger Fabric Peer chart (these charts are created by AID:Tech and are currently not directly associated with the Hyperledger project)",
                  "home": "http://hyperledger-fabric.readthedocs.io",
                  "keywords": [
                      "blockchain",
                      "hyperledger",
                      "fabric"
                  ],
                  "maintainers": [
                      {
                          "name": "alexvicegrab",
                          "email": "sasha@aid.technology"
                      },
                      {
                          "name": "inzamam-iqbal",
                          "email": "inzamam@aid.technology"
                      },
                      {
                          "name": "dbandin",
                          "email": "diego@aid.technology"
                      }
                  ],
                  "sources": [
                      "https://github.com/hyperledger/fabric"
                  ],
                  "icon": "/v1/assets/stable/hlf-peer/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/hlf-peer"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.3.0",
                          "app_version": "1.4.3",
                          "created": "2019-11-06T08:58:33.641Z",
                          "digest": "4c4529f1e491b60e561879d65b47245a9c8ebca457cee2e9113b6c0ac8dfbc8f",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/hlf-peer-1.3.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/hlf-peer/versions/1.3.0/README.md",
                          "values": "/v1/assets/stable/hlf-peer/versions/1.3.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/hlf-peer/versions/1.3.0"
                      }
                  }
              }
          },
          {
              "id": "stable/hoard",
              "type": "chart",
              "attributes": {
                  "name": "hoard",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Hoard is a stateless, deterministically encrypted, content-addressed object store",
                  "home": "https://github.com/monax/hoard",
                  "keywords": [
                      "s3",
                      "aws",
                      "gcp",
                      "azure",
                      "ipfs",
                      "envelope encryption",
                      "content addressable",
                      "distributed file storage"
                  ],
                  "maintainers": [
                      {
                          "name": "compleatang",
                          "email": "casey@monax.io"
                      },
                      {
                          "name": "gregdhill",
                          "email": "greg.hill@monax.io"
                      }
                  ],
                  "sources": [
                      "https://github.com/monax/hoard"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/hoard"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.0.0",
                          "app_version": "6.0.0",
                          "created": "2019-11-06T08:58:33.641Z",
                          "digest": "d2bca0a3e0905e1505000583c5a7871efb421ba873ee8089bd8fc544bfc85717",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/hoard-1.0.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/hoard/versions/1.0.0/README.md",
                          "values": "/v1/assets/stable/hoard/versions/1.0.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/hoard/versions/1.0.0"
                      }
                  }
              }
          },
          {
              "id": "stable/home-assistant",
              "type": "chart",
              "attributes": {
                  "name": "home-assistant",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Home Assistant",
                  "home": "https://github.com/home-assistant/home-assistant",
                  "keywords": [
                      "home-assistant",
                      "hass",
                      "homeassistant"
                  ],
                  "maintainers": [
                      {
                          "name": "billimek",
                          "email": "jeff@billimek.com"
                      },
                      {
                          "name": "runningman84",
                          "email": "philipp.hellmich@bertelsmann.de"
                      }
                  ],
                  "sources": [
                      "https://github.com/home-assistant/home-assistant",
                      "https://github.com/danielperna84/hass-configurator",
                      "https://github.com/cdr/code-server"
                  ],
                  "icon": "/v1/assets/stable/home-assistant/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/home-assistant"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.9.9",
                          "app_version": "0.99.3",
                          "created": "2019-11-06T08:58:33.642Z",
                          "digest": "a9521edc97272b91ccf7e9d371c7a1c1b531e30e0e0db98244d4d229fb0c49b8",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/home-assistant-0.9.9.tgz"
                          ],
                          "readme": "/v1/assets/stable/home-assistant/versions/0.9.9/README.md",
                          "values": "/v1/assets/stable/home-assistant/versions/0.9.9/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/home-assistant/versions/0.9.9"
                      }
                  }
              }
          },
          {
              "id": "incubator/honeydipper",
              "type": "chart",
              "attributes": {
                  "name": "honeydipper",
                  "repo": {
                      "name": "incubator",
                      "url": "https://kubernetes-charts-incubator.storage.googleapis.com"
                  },
                  "description": "An event driven orchestration system",
                  "home": "https://honeydipper.io",
                  "keywords": [
                      "event-driven",
                      "orchestration",
                      "integration",
                      "workflows",
                      "templating"
                  ],
                  "maintainers": [
                      {
                          "name": "Charles546",
                          "email": "charles.huang@joinhoney.com"
                      }
                  ],
                  "sources": [],
                  "icon": "/v1/assets/incubator/honeydipper/logo"
              },
              "links": {
                  "self": "/v1/charts/incubator/honeydipper"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.1.3",
                          "app_version": "0.2.0",
                          "created": "2019-11-06T09:29:02.005Z",
                          "digest": "74fab61b4982254381239a1fd13d4af588f7dcf27e8d9f63546eeece7facfafb",
                          "urls": [
                              "https://kubernetes-charts-incubator.storage.googleapis.com/honeydipper-0.1.3.tgz"
                          ],
                          "readme": "/v1/assets/incubator/honeydipper/versions/0.1.3/README.md",
                          "values": "/v1/assets/incubator/honeydipper/versions/0.1.3/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/incubator/honeydipper/versions/0.1.3"
                      }
                  }
              }
          },
          {
              "id": "stable/horovod",
              "type": "chart",
              "attributes": {
                  "name": "horovod",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "A Helm chart for deploying Horovod",
                  "home": "https://eng.uber.com/horovod/",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "cheyang",
                          "email": "cheyang@163.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/uber/horovod",
                      "https://github.com/uber/horovod/blob/master/docs/docker.md"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/horovod"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.0.0",
                          "app_version": "0.12.1",
                          "created": "2019-11-06T08:58:33.642Z",
                          "digest": "89c50fba3b804dd0216db469de81215fad82e1d96e4c8988ddb9d2d19ea4f32a",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/horovod-1.0.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/horovod/versions/1.0.0/README.md",
                          "values": "/v1/assets/stable/horovod/versions/1.0.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/horovod/versions/1.0.0"
                      }
                  }
              }
          },
          {
              "id": "incubator/hoverfly",
              "type": "chart",
              "attributes": {
                  "name": "hoverfly",
                  "repo": {
                      "name": "incubator",
                      "url": "https://kubernetes-charts-incubator.storage.googleapis.com"
                  },
                  "description": "Hoverfly is a lightweight, open source API simulation tool. Using Hoverfly, you can create realistic simulations of the APIs your application depends on.",
                  "home": "https://hoverfly.io",
                  "keywords": [
                      "hoverfly",
                      "api-simulation",
                      "mocking",
                      "stubbing",
                      "service-virtualization"
                  ],
                  "maintainers": [
                      {
                          "name": "tommysitu",
                          "email": "tommy.situ@specto.io"
                      }
                  ],
                  "sources": [
                      "https://github.com/SpectoLabs/hoverfly"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/incubator/hoverfly"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.1.1",
                          "app_version": "1.1.1",
                          "created": "2019-11-06T09:29:02.005Z",
                          "digest": "fcd233523217ddc969b0626c7694d545d9b91a920f9b663f63cc4350435eb902",
                          "urls": [
                              "https://kubernetes-charts-incubator.storage.googleapis.com/hoverfly-0.1.1.tgz"
                          ],
                          "readme": "/v1/assets/incubator/hoverfly/versions/0.1.1/README.md",
                          "values": "/v1/assets/incubator/hoverfly/versions/0.1.1/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/incubator/hoverfly/versions/0.1.1"
                      }
                  }
              }
          },
          {
              "id": "stable/hubot",
              "type": "chart",
              "attributes": {
                  "name": "hubot",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Hubot chatbot for Slack",
                  "home": "https://hubot.github.com",
                  "keywords": [
                      "slack",
                      "hubot",
                      "chatbot"
                  ],
                  "maintainers": [
                      {
                          "name": "darioblanco",
                          "email": "dblanco@minddoc.com"
                      },
                      {
                          "name": "decayofmind",
                          "email": "r.komkov@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/hubotio/hubot",
                      "https://github.com/minddocdev/hubot"
                  ],
                  "icon": "/v1/assets/stable/hubot/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/hubot"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.0.1",
                          "app_version": "3.3.2",
                          "created": "2019-11-06T08:58:33.644Z",
                          "digest": "ad729a89e92fde035c9624c55d426caaba204f869c26e64673cd6309aad219e1",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/hubot-1.0.1.tgz"
                          ],
                          "readme": "/v1/assets/stable/hubot/versions/1.0.1/README.md",
                          "values": "/v1/assets/stable/hubot/versions/1.0.1/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/hubot/versions/1.0.1"
                      }
                  }
              }
          },
          {
              "id": "stable/ignite",
              "type": "chart",
              "attributes": {
                  "name": "ignite",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Apache Ignite is an open-source distributed database, caching and processing platform designed to store and compute on large volumes of data across a cluster of nodes.",
                  "home": "https://ignite.apache.org/",
                  "keywords": [
                      "java",
                      "datagrid",
                      "caching",
                      "jvm",
                      "sql",
                      "key-value",
                      "nosql",
                      "distributed"
                  ],
                  "maintainers": [
                      {
                          "name": "aasiutin"
                      },
                      {
                          "name": "greyteardrop"
                      }
                  ],
                  "sources": [
                      "https://github.com/apache/ignite"
                  ],
                  "icon": "/v1/assets/stable/ignite/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/ignite"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.0.1",
                          "app_version": "2.7.6",
                          "created": "2019-11-06T08:58:33.645Z",
                          "digest": "aac45705260d3ffca8f6a507e94d0792d5a765edd2b7045af85317c6344e768a",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/ignite-1.0.1.tgz"
                          ],
                          "readme": "/v1/assets/stable/ignite/versions/1.0.1/README.md",
                          "values": "/v1/assets/stable/ignite/versions/1.0.1/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/ignite/versions/1.0.1"
                      }
                  }
              }
          },
          {
              "id": "stable/inbucket",
              "type": "chart",
              "attributes": {
                  "name": "inbucket",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Inbucket is an email testing application",
                  "home": "https://www.inbucket.org/",
                  "keywords": [
                      "inbucket",
                      "mail",
                      "smtp",
                      "pop3",
                      "email",
                      "testing",
                      "disposable webmail"
                  ],
                  "maintainers": [
                      {
                          "name": "cpanato",
                          "email": "ctadeu@gmail.com"
                      },
                      {
                          "name": "jhillyerd",
                          "email": "github@hillyerd.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/jhillyerd/inbucket"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/inbucket"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "3.1.0",
                          "app_version": "2.0.0",
                          "created": "2019-11-06T08:58:33.645Z",
                          "digest": "a200f57e935d74ea77c35c9854975614ec2e9e8cbdd18c65d1ed4ccdcd9ddea5",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/inbucket-3.1.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/inbucket/versions/3.1.0/README.md",
                          "values": "/v1/assets/stable/inbucket/versions/3.1.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/inbucket/versions/3.1.0"
                      }
                  }
              }
          },
          {
              "id": "stable/influxdb",
              "type": "chart",
              "attributes": {
                  "name": "influxdb",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Scalable datastore for metrics, events, and real-time analytics.",
                  "home": "https://www.influxdata.com/time-series-platform/influxdb/",
                  "keywords": [
                      "influxdb",
                      "database",
                      "timeseries"
                  ],
                  "maintainers": [
                      {
                          "name": "jackzampolin",
                          "email": "jack@influxdb.com"
                      },
                      {
                          "name": "aisuko",
                          "email": "urakiny@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/influxdata/influxdb"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/influxdb"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "2.0.1",
                          "app_version": "1.7.6",
                          "created": "2019-11-06T08:58:33.645Z",
                          "digest": "4d8b7e79c583d01a9e7bac078db4aefd8b1eac9f53f945a0a410ada0c75d572f",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/influxdb-2.0.1.tgz"
                          ],
                          "readme": "/v1/assets/stable/influxdb/versions/2.0.1/README.md",
                          "values": "/v1/assets/stable/influxdb/versions/2.0.1/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/influxdb/versions/2.0.1"
                      }
                  }
              }
          },
          {
              "id": "bitnami/influxdb",
              "type": "chart",
              "attributes": {
                  "name": "influxdb",
                  "repo": {
                      "name": "bitnami",
                      "url": "https://charts.bitnami.com/bitnami"
                  },
                  "description": "InfluxDB is an open source time-series database designed to handle large write and read loads in real-time.",
                  "home": "https://www.influxdata.com/products/influxdb-overview/",
                  "keywords": [
                      "influxdb",
                      "tick",
                      "database",
                      "timeseries"
                  ],
                  "maintainers": [
                      {
                          "name": "Bitnami",
                          "email": "containers@bitnami.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/bitnami/bitnami-docker-influxdb"
                  ],
                  "icon": "/v1/assets/bitnami/influxdb/logo"
              },
              "links": {
                  "self": "/v1/charts/bitnami/influxdb"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.2.0",
                          "app_version": "1.7.8",
                          "created": "2019-11-06T09:38:39.613Z",
                          "digest": "17b537bb91a0cfaef7650fa765aee7b2eef8c0c91c315c588d76e86bf259c81e",
                          "urls": [
                              "https://charts.bitnami.com/bitnami/influxdb-0.2.0.tgz"
                          ],
                          "readme": "/v1/assets/bitnami/influxdb/versions/0.2.0/README.md",
                          "values": "/v1/assets/bitnami/influxdb/versions/0.2.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/bitnami/influxdb/versions/0.2.0"
                      }
                  }
              }
          },
          {
              "id": "stable/ingressmonitorcontroller",
              "type": "chart",
              "attributes": {
                  "name": "ingressmonitorcontroller",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "IngressMonitorController chart that runs on kubernetes",
                  "home": "https://github.com/stakater/IngressMonitorController",
                  "keywords": [
                      "IngressMonitorController",
                      "kubernetes"
                  ],
                  "maintainers": [
                      {
                          "name": "rasheedamir",
                          "email": "rasheed@aurorasolutions.io"
                      },
                      {
                          "name": "waseem-h",
                          "email": "waseemhassan@stakater.com"
                      },
                      {
                          "name": "faizanahmad055",
                          "email": "faizan.ahmad55@outlook.com"
                      },
                      {
                          "name": "kahootali",
                          "email": "ali.kahoot@aurorasolutions.io"
                      },
                      {
                          "name": "ahmadiq",
                          "email": "ahmad@aurorasolutions.io"
                      },
                      {
                          "name": "ahsan-storm",
                          "email": "ahsanmuhammad1@outlook.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/stakater/IngressMonitorController"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/ingressmonitorcontroller"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.0.48",
                          "app_version": "1.0.47",
                          "created": "2019-11-06T08:58:33.646Z",
                          "digest": "d4e6dcd01047484e38e658bd8b8507b367564f47441ebaf634a7c8f96f764054",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/ingressmonitorcontroller-1.0.48.tgz"
                          ],
                          "readme": "/v1/assets/stable/ingressmonitorcontroller/versions/1.0.48/README.md",
                          "values": "/v1/assets/stable/ingressmonitorcontroller/versions/1.0.48/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/ingressmonitorcontroller/versions/1.0.48"
                      }
                  }
              }
          },
          {
              "id": "stable/instana-agent",
              "type": "chart",
              "attributes": {
                  "name": "instana-agent",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Instana Agent for Kubernetes",
                  "home": "https://www.instana.com/",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "jbrisbin",
                          "email": "jon.brisbin@instana.com"
                      },
                      {
                          "name": "wiggzz",
                          "email": "william.james@instana.com"
                      },
                      {
                          "name": "JeroenSoeters",
                          "email": "jeroen.soeters@instana.com"
                      },
                      {
                          "name": "fstab",
                          "email": "fabian.staeber@instana.com"
                      },
                      {
                          "name": "mdonkers",
                          "email": "miel.donkers@instana.com"
                      },
                      {
                          "name": "dlbock",
                          "email": "dahlia.bock@instana.com"
                      },
                      {
                          "name": "nfisher",
                          "email": "nathan.fisher@instana.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/instana/instana-agent-docker"
                  ],
                  "icon": "/v1/assets/stable/instana-agent/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/instana-agent"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.0.18",
                          "app_version": "1",
                          "created": "2019-11-06T08:58:33.647Z",
                          "digest": "ba50861197bb6fb100b4072e5744f649a3a5577454cf8abca79ac6619c9318f9",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/instana-agent-1.0.18.tgz"
                          ],
                          "readme": "/v1/assets/stable/instana-agent/versions/1.0.18/README.md",
                          "values": "/v1/assets/stable/instana-agent/versions/1.0.18/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/instana-agent/versions/1.0.18"
                      }
                  }
              }
          },
          {
              "id": "stable/ipfs",
              "type": "chart",
              "attributes": {
                  "name": "ipfs",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "A Helm chart for the Interplanetary File System",
                  "home": "https://ipfs.io/",
                  "keywords": [
                      "ipfs",
                      "distributed-web"
                  ],
                  "maintainers": [
                      {
                          "name": "bclermont",
                          "email": "bruno@robotinfra.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/ipfs/go-ipfs"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/ipfs"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.3.4",
                          "app_version": "v0.4.22",
                          "created": "2019-11-06T08:58:33.647Z",
                          "digest": "464d1ebf160d56e4d4202288ce0882092bfbe438901b9eeabd0f557d8e0354fd",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/ipfs-0.3.4.tgz"
                          ],
                          "readme": "/v1/assets/stable/ipfs/versions/0.3.4/README.md",
                          "values": "/v1/assets/stable/ipfs/versions/0.3.4/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/ipfs/versions/0.3.4"
                      }
                  }
              }
          },
          {
              "id": "incubator/jaeger",
              "type": "chart",
              "attributes": {
                  "name": "jaeger",
                  "repo": {
                      "name": "incubator",
                      "url": "https://kubernetes-charts-incubator.storage.googleapis.com"
                  },
                  "description": "A Jaeger Helm chart for Kubernetes",
                  "home": "https://jaegertracing.io",
                  "keywords": [
                      "jaeger",
                      "opentracing",
                      "tracing",
                      "instrumentation"
                  ],
                  "maintainers": [
                      {
                          "name": "dvonthenen",
                          "email": "david.vonthenen@dell.com"
                      },
                      {
                          "name": "mikelorant",
                          "email": "michael.lorant@fairfaxmedia.com.au"
                      },
                      {
                          "name": "naseemkullah",
                          "email": "naseem@transit.app"
                      },
                      {
                          "name": "pavelnikolov",
                          "email": "pavel.nikolov@fairfaxmedia.com.au"
                      }
                  ],
                  "sources": [
                      "https://hub.docker.com/u/jaegertracing/"
                  ],
                  "icon": "/v1/assets/incubator/jaeger/logo"
              },
              "links": {
                  "self": "/v1/charts/incubator/jaeger"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.13.3",
                          "app_version": "1.14.0",
                          "created": "2019-11-06T09:29:02.008Z",
                          "digest": "df1cf4a6f1902f20001178deae32c458d5eed458974be49224ec5763f11bfb9d",
                          "urls": [
                              "https://kubernetes-charts-incubator.storage.googleapis.com/jaeger-0.13.3.tgz"
                          ],
                          "readme": "/v1/assets/incubator/jaeger/versions/0.13.3/README.md",
                          "values": "/v1/assets/incubator/jaeger/versions/0.13.3/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/incubator/jaeger/versions/0.13.3"
                      }
                  }
              }
          },
          {
              "id": "stable/jaeger-operator",
              "type": "chart",
              "attributes": {
                  "name": "jaeger-operator",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "jaeger-operator Helm chart for Kubernetes",
                  "home": "https://www.jaegertracing.io/",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "cpanato",
                          "email": "ctadeu@gmail.com"
                      },
                      {
                          "name": "batazor",
                          "email": "batazor111@gmail.com"
                      }
                  ],
                  "sources": [],
                  "icon": "/v1/assets/stable/jaeger-operator/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/jaeger-operator"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "2.10.2",
                          "app_version": "1.14.0",
                          "created": "2019-11-06T08:58:33.647Z",
                          "digest": "1d7b52049c1d24942a3e411ef7ce96b0224e0f539f5cfb84172dd5114da8cb10",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/jaeger-operator-2.10.2.tgz"
                          ],
                          "readme": "/v1/assets/stable/jaeger-operator/versions/2.10.2/README.md",
                          "values": "/v1/assets/stable/jaeger-operator/versions/2.10.2/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/jaeger-operator/versions/2.10.2"
                      }
                  }
              }
          },
          {
              "id": "stable/janusgraph",
              "type": "chart",
              "attributes": {
                  "name": "janusgraph",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Open source, scalable graph database.",
                  "home": "http://janusgraph.org",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "samizuh",
                          "email": "samiz@google.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/JanusGraph/janusgraph"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/janusgraph"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.2.1",
                          "app_version": "1.0",
                          "created": "2019-11-06T08:58:33.649Z",
                          "digest": "6cb607435d8409cd2763459f5769761698f8f68a46d055761bab10a433f37174",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/janusgraph-0.2.1.tgz"
                          ],
                          "readme": "/v1/assets/stable/janusgraph/versions/0.2.1/README.md",
                          "values": "/v1/assets/stable/janusgraph/versions/0.2.1/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/janusgraph/versions/0.2.1"
                      }
                  }
              }
          },
          {
              "id": "bitnami/jasperreports",
              "type": "chart",
              "attributes": {
                  "name": "jasperreports",
                  "repo": {
                      "name": "bitnami",
                      "url": "https://charts.bitnami.com/bitnami"
                  },
                  "description": "The JasperReports server can be used as a stand-alone or embedded reporting and BI server that offers web-based reporting, analytic tools and visualization, and a dashboard feature for compiling multiple custom views",
                  "home": "http://community.jaspersoft.com/project/jasperreports-server",
                  "keywords": [
                      "business intelligence",
                      "java",
                      "jasper",
                      "reporting",
                      "analytic",
                      "visualization"
                  ],
                  "maintainers": [
                      {
                          "name": "Bitnami",
                          "email": "containers@bitnami.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/bitnami/bitnami-docker-jasperreports"
                  ],
                  "icon": "/v1/assets/bitnami/jasperreports/logo"
              },
              "links": {
                  "self": "/v1/charts/bitnami/jasperreports"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "6.2.7",
                          "app_version": "7.2.0",
                          "created": "2019-11-06T09:38:39.616Z",
                          "digest": "3c029ff6f67a2282e47daf3b0bd9491662e18fea3033d4ccbd4eeebc187e4e39",
                          "urls": [
                              "https://charts.bitnami.com/bitnami/jasperreports-6.2.7.tgz"
                          ],
                          "readme": "/v1/assets/bitnami/jasperreports/versions/6.2.7/README.md",
                          "values": "/v1/assets/bitnami/jasperreports/versions/6.2.7/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/bitnami/jasperreports/versions/6.2.7"
                      }
                  }
              }
          },
          {
              "id": "bitnami/jenkins",
              "type": "chart",
              "attributes": {
                  "name": "jenkins",
                  "repo": {
                      "name": "bitnami",
                      "url": "https://charts.bitnami.com/bitnami"
                  },
                  "description": "The leading open source automation server",
                  "home": "https://jenkins.io/",
                  "keywords": [
                      "jenkins",
                      "ci",
                      "cd",
                      "http",
                      "web",
                      "application"
                  ],
                  "maintainers": [
                      {
                          "name": "Bitnami",
                          "email": "containers@bitnami.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/bitnami/bitnami-docker-jenkins"
                  ],
                  "icon": "/v1/assets/bitnami/jenkins/logo"
              },
              "links": {
                  "self": "/v1/charts/bitnami/jenkins"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "3.4.9",
                          "app_version": "2.190.2",
                          "created": "2019-11-06T09:38:39.617Z",
                          "digest": "f1eb3be417a4bf590e6304117e804f93ffb7e6007cd5754e55cf0998dc5105b9",
                          "urls": [
                              "https://charts.bitnami.com/bitnami/jenkins-3.4.9.tgz"
                          ],
                          "readme": "/v1/assets/bitnami/jenkins/versions/3.4.9/README.md",
                          "values": "/v1/assets/bitnami/jenkins/versions/3.4.9/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/bitnami/jenkins/versions/3.4.9"
                      }
                  }
              }
          },
          {
              "id": "stable/jenkins",
              "type": "chart",
              "attributes": {
                  "name": "jenkins",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Open source continuous integration server. It supports multiple SCM tools including CVS, Subversion and Git. It can execute Apache Ant and Apache Maven-based projects as well as arbitrary scripts.",
                  "home": "https://jenkins.io/",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "lachie83",
                          "email": "lachlan.evenson@microsoft.com"
                      },
                      {
                          "name": "viglesiasce",
                          "email": "viglesias@google.com"
                      },
                      {
                          "name": "maorfr",
                          "email": "maor.friedman@redhat.com"
                      },
                      {
                          "name": "torstenwalter",
                          "email": "mail@torstenwalter.de"
                      },
                      {
                          "name": "mogaal",
                          "email": "garridomota@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/jenkinsci/jenkins",
                      "https://github.com/jenkinsci/docker-jnlp-slave",
                      "https://github.com/maorfr/kube-tasks",
                      "https://github.com/jenkinsci/configuration-as-code-plugin"
                  ],
                  "icon": "/v1/assets/stable/jenkins/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/jenkins"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.8.2",
                          "app_version": "lts",
                          "created": "2019-11-06T08:58:33.652Z",
                          "digest": "51624e778ea2e84344e76c8b3dfae2ee4fdf56240f807b659111d788b371144b",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/jenkins-1.8.2.tgz"
                          ],
                          "readme": "/v1/assets/stable/jenkins/versions/1.8.2/README.md",
                          "values": "/v1/assets/stable/jenkins/versions/1.8.2/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/jenkins/versions/1.8.2"
                      }
                  }
              }
          },
          {
              "id": "incubator/jenkins-operator",
              "type": "chart",
              "attributes": {
                  "name": "jenkins-operator",
                  "repo": {
                      "name": "incubator",
                      "url": "https://kubernetes-charts-incubator.storage.googleapis.com"
                  },
                  "description": "A Helm chart for Kubernetes Jenkins Operator",
                  "home": "https://github.com/samsung-cnct/jenkins-operator",
                  "keywords": [
                      "jenkins",
                      "testing"
                  ],
                  "maintainers": [
                      {
                          "name": "maratoid",
                          "email": "maratoid@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/samsung-cnct/jenkins-operator",
                      "https://github.com/jenkinsci/jenkins"
                  ],
                  "icon": "/v1/assets/incubator/jenkins-operator/logo"
              },
              "links": {
                  "self": "/v1/charts/incubator/jenkins-operator"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.3.0",
                          "app_version": "0.3.0",
                          "created": "2019-11-06T09:29:02.009Z",
                          "digest": "e91f151b72530152cc1312c0280e74c34698078de83e3ec5cce188c0e8e2cb9a",
                          "urls": [
                              "https://kubernetes-charts-incubator.storage.googleapis.com/jenkins-operator-0.3.0.tgz"
                          ],
                          "readme": "/v1/assets/incubator/jenkins-operator/versions/0.3.0/README.md",
                          "values": "/v1/assets/incubator/jenkins-operator/versions/0.3.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/incubator/jenkins-operator/versions/0.3.0"
                      }
                  }
              }
          },
          {
              "id": "bitnami/joomla",
              "type": "chart",
              "attributes": {
                  "name": "joomla",
                  "repo": {
                      "name": "bitnami",
                      "url": "https://charts.bitnami.com/bitnami"
                  },
                  "description": "PHP content management system (CMS) for publishing web content",
                  "home": "http://www.joomla.org/",
                  "keywords": [
                      "joomla",
                      "cms",
                      "blog",
                      "http",
                      "php"
                  ],
                  "maintainers": [
                      {
                          "name": "Bitnami",
                          "email": "containers@bitnami.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/bitnami/bitnami-docker-joomla"
                  ],
                  "icon": "/v1/assets/bitnami/joomla/logo"
              },
              "links": {
                  "self": "/v1/charts/bitnami/joomla"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "6.1.11",
                          "app_version": "3.9.12",
                          "created": "2019-11-06T09:38:39.62Z",
                          "digest": "bba2cdc7b34a985a1d58e4544b3efe4cbd17fbd730ff0f0955f155bdc9703ef7",
                          "urls": [
                              "https://charts.bitnami.com/bitnami/joomla-6.1.11.tgz"
                          ],
                          "readme": "/v1/assets/bitnami/joomla/versions/6.1.11/README.md",
                          "values": "/v1/assets/bitnami/joomla/versions/6.1.11/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/bitnami/joomla/versions/6.1.11"
                      }
                  }
              }
          },
          {
              "id": "stable/k8s-spot-rescheduler",
              "type": "chart",
              "attributes": {
                  "name": "k8s-spot-rescheduler",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "A k8s-spot-rescheduler Helm chart for Kubernetes",
                  "home": "https://github.com/pusher/k8s-spot-rescheduler",
                  "keywords": [
                      "spot",
                      "rescheduler"
                  ],
                  "maintainers": [
                      {
                          "name": "komljen",
                          "email": "alen.komljen@live.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/pusher/k8s-spot-rescheduler"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/k8s-spot-rescheduler"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.4.2",
                          "app_version": "v0.2.0",
                          "created": "2019-11-06T08:58:33.654Z",
                          "digest": "f3c3d560e2120e28530946b574eb7e9e1d453b1e67c672dc98e811b49ec6e4b9",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/k8s-spot-rescheduler-0.4.2.tgz"
                          ],
                          "readme": "/v1/assets/stable/k8s-spot-rescheduler/versions/0.4.2/README.md",
                          "values": "/v1/assets/stable/k8s-spot-rescheduler/versions/0.4.2/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/k8s-spot-rescheduler/versions/0.4.2"
                      }
                  }
              }
          },
          {
              "id": "stable/k8s-spot-termination-handler",
              "type": "chart",
              "attributes": {
                  "name": "k8s-spot-termination-handler",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "The K8s Spot Termination handler handles draining AWS Spot Instances in response to termination requests.",
                  "home": "https://github.com/kube-aws/kube-spot-termination-notice-handler",
                  "keywords": [
                      "spot",
                      "termination"
                  ],
                  "maintainers": [
                      {
                          "name": "kierranm",
                          "email": "kierranm@gmail.com"
                      },
                      {
                          "name": "egeland",
                          "email": "egeland@gmail.com"
                      },
                      {
                          "name": "mariusv",
                          "email": "myself@mariusv.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/kube-aws/kube-spot-termination-notice-handler"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/k8s-spot-termination-handler"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.4.7",
                          "app_version": "1.13.7-1",
                          "created": "2019-11-06T08:58:33.655Z",
                          "digest": "eacc21b6076489ee23d8ffdb465b909325bb8f8c41519263e536bbca0361265d",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/k8s-spot-termination-handler-1.4.7.tgz"
                          ],
                          "readme": "/v1/assets/stable/k8s-spot-termination-handler/versions/1.4.7/README.md",
                          "values": "/v1/assets/stable/k8s-spot-termination-handler/versions/1.4.7/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/k8s-spot-termination-handler/versions/1.4.7"
                      }
                  }
              }
          },
          {
              "id": "bitnami/kafka",
              "type": "chart",
              "attributes": {
                  "name": "kafka",
                  "repo": {
                      "name": "bitnami",
                      "url": "https://charts.bitnami.com/bitnami"
                  },
                  "description": "Apache Kafka is a distributed streaming platform.",
                  "home": "https://kafka.apache.org/",
                  "keywords": [
                      "kafka",
                      "zookeeper",
                      "streaming",
                      "producer",
                      "consumer"
                  ],
                  "maintainers": [
                      {
                          "name": "Bitnami",
                          "email": "containers@bitnami.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/bitnami/bitnami-docker-kafka"
                  ],
                  "icon": "/v1/assets/bitnami/kafka/logo"
              },
              "links": {
                  "self": "/v1/charts/bitnami/kafka"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "6.1.6",
                          "app_version": "2.3.1",
                          "created": "2019-11-06T09:38:39.623Z",
                          "digest": "986ecef4943b75ec08fec904de87a4b771abb9075e8c8d1ea02493d8f09acc60",
                          "urls": [
                              "https://charts.bitnami.com/bitnami/kafka-6.1.6.tgz"
                          ],
                          "readme": "/v1/assets/bitnami/kafka/versions/6.1.6/README.md",
                          "values": "/v1/assets/bitnami/kafka/versions/6.1.6/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/bitnami/kafka/versions/6.1.6"
                      }
                  }
              }
          },
          {
              "id": "incubator/kafka",
              "type": "chart",
              "attributes": {
                  "name": "kafka",
                  "repo": {
                      "name": "incubator",
                      "url": "https://kubernetes-charts-incubator.storage.googleapis.com"
                  },
                  "description": "Apache Kafka is publish-subscribe messaging rethought as a distributed commit log.",
                  "home": "https://kafka.apache.org/",
                  "keywords": [
                      "kafka",
                      "zookeeper",
                      "kafka statefulset"
                  ],
                  "maintainers": [
                      {
                          "name": "faraazkhan",
                          "email": "faraaz@rationalizeit.us"
                      },
                      {
                          "name": "h0tbird",
                          "email": "marc.villacorta@gmail.com"
                      },
                      {
                          "name": "benjigoldberg",
                          "email": "ben@spothero.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/kubernetes/charts/tree/master/incubator/zookeeper",
                      "https://github.com/Yolean/kubernetes-kafka",
                      "https://github.com/confluentinc/cp-docker-images",
                      "https://github.com/apache/kafka"
                  ],
                  "icon": "/v1/assets/incubator/kafka/logo"
              },
              "links": {
                  "self": "/v1/charts/incubator/kafka"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.20.3",
                          "app_version": "5.0.1",
                          "created": "2019-11-06T09:29:02.01Z",
                          "digest": "e28c5bda7c948bf28f5870b7bd00aa830b344b0181fa0233428421ec367cb365",
                          "urls": [
                              "https://kubernetes-charts-incubator.storage.googleapis.com/kafka-0.20.3.tgz"
                          ],
                          "readme": "/v1/assets/incubator/kafka/versions/0.20.3/README.md",
                          "values": "/v1/assets/incubator/kafka/versions/0.20.3/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/incubator/kafka/versions/0.20.3"
                      }
                  }
              }
          },
          {
              "id": "stable/kafka-manager",
              "type": "chart",
              "attributes": {
                  "name": "kafka-manager",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "A tool for managing Apache Kafka.",
                  "home": "https://github.com/yahoo/kafka-manager",
                  "keywords": [
                      "kafka",
                      "zookeeper",
                      "kafka-manager"
                  ],
                  "maintainers": [
                      {
                          "name": "giacomoguiulfo",
                          "email": "giacomoguiulfo@gmail.com"
                      },
                      {
                          "name": "ssalaues",
                          "email": "salim.salaues@scality.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/yahoo/kafka-manager"
                  ],
                  "icon": "/v1/assets/stable/kafka-manager/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/kafka-manager"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "2.2.0",
                          "app_version": "1.3.3.22",
                          "created": "2019-11-06T08:58:33.656Z",
                          "digest": "06b45bea0a5d256dab936360d8f22f3637e5827a542b6b0c1ac0af445cf479cb",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/kafka-manager-2.2.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/kafka-manager/versions/2.2.0/README.md",
                          "values": "/v1/assets/stable/kafka-manager/versions/2.2.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/kafka-manager/versions/2.2.0"
                      }
                  }
              }
          },
          {
              "id": "stable/kanister-operator",
              "type": "chart",
              "attributes": {
                  "name": "kanister-operator",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Kanister-operator Helm chart for Kubernetes",
                  "home": "https://kanister.io/",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "depohmel",
                          "email": "ilya@kasten.io"
                      },
                      {
                          "name": "tdmanv",
                          "email": "tom@kasten.io"
                      }
                  ],
                  "sources": [],
                  "icon": "/v1/assets/stable/kanister-operator/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/kanister-operator"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.3.0",
                          "app_version": "0.10.0",
                          "created": "2019-11-06T08:58:33.656Z",
                          "digest": "a5cb29ce3b8cdeab37910ac32f9125057f87906928d5e6a3e4141234f446b9b9",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/kanister-operator-0.3.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/kanister-operator/versions/0.3.0/README.md",
                          "values": "/v1/assets/stable/kanister-operator/versions/0.3.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/kanister-operator/versions/0.3.0"
                      }
                  }
              }
          },
          {
              "id": "stable/kapacitor",
              "type": "chart",
              "attributes": {
                  "name": "kapacitor",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "InfluxDB's native data processing engine. It can process both stream and batch data from InfluxDB.",
                  "home": "https://www.influxdata.com/time-series-platform/kapacitor/",
                  "keywords": [
                      "kapacitor",
                      "stream",
                      "etl",
                      "timeseries"
                  ],
                  "maintainers": [
                      {
                          "name": "jackzampolin",
                          "email": "jack@influxdb.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/influxdata/kapacitor"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/kapacitor"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.1.3",
                          "app_version": "1.5.2",
                          "created": "2019-11-06T08:58:33.657Z",
                          "digest": "8afb47fda4e67dd80bbccb9335dd3b3170a91b3ff378baeb6ed21ce1f0689204",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/kapacitor-1.1.3.tgz"
                          ],
                          "readme": "/v1/assets/stable/kapacitor/versions/1.1.3/README.md",
                          "values": "/v1/assets/stable/kapacitor/versions/1.1.3/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/kapacitor/versions/1.1.3"
                      }
                  }
              }
          },
          {
              "id": "stable/karma",
              "type": "chart",
              "attributes": {
                  "name": "karma",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "A Helm chart for Karma - an UI for Prometheus Alertmanager",
                  "home": "https://github.com/prymitive/karma",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "davidkarlsen",
                          "email": "david@davidkarlsen.com"
                      },
                      {
                          "name": "prymitive",
                          "email": "l.mierzwa@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://hub.docker.com/r/lmierzwa/karma/",
                      "https://github.com/prymitive/karma"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/karma"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.1.20",
                          "app_version": "v0.48",
                          "created": "2019-11-06T08:58:33.657Z",
                          "digest": "d0db2a74acc1fd5253657b1d70fd947ef53ed68d3a88e2396cc29b1a88d0e600",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/karma-1.1.20.tgz"
                          ],
                          "readme": "/v1/assets/stable/karma/versions/1.1.20/README.md",
                          "values": "/v1/assets/stable/karma/versions/1.1.20/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/karma/versions/1.1.20"
                      }
                  }
              }
          },
          {
              "id": "stable/katafygio",
              "type": "chart",
              "attributes": {
                  "name": "katafygio",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Continuously backup Kubernetes objets as YAML files in git",
                  "home": "https://github.com/bpineau/katafygio",
                  "keywords": [
                      "backup",
                      "dump",
                      "katafygio",
                      "git"
                  ],
                  "maintainers": [
                      {
                          "name": "bpineau",
                          "email": "ben.pineau@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/bpineau/katafygio"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/katafygio"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.0.0",
                          "app_version": "0.8.1",
                          "created": "2019-11-06T08:58:33.657Z",
                          "digest": "2181a74a6d3faca4279dc6e862675a773a9da886a882cec591b72cf4970eb3b0",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/katafygio-1.0.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/katafygio/versions/1.0.0/README.md",
                          "values": "/v1/assets/stable/katafygio/versions/1.0.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/katafygio/versions/1.0.0"
                      }
                  }
              }
          },
          {
              "id": "incubator/keycloak-proxy",
              "type": "chart",
              "attributes": {
                  "name": "keycloak-proxy",
                  "repo": {
                      "name": "incubator",
                      "url": "https://kubernetes-charts-incubator.storage.googleapis.com"
                  },
                  "description": "Keycloak Proxy supports Single Sign-On with Keycloak",
                  "home": "https://www.keycloak.org/docs/3.3/server_installation/topics/proxy.html",
                  "keywords": [
                      "authentication",
                      "sso",
                      "reverseproxy"
                  ],
                  "maintainers": [
                      {
                          "name": "yunsangjun",
                          "email": "ysj188cm@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/jboss-dockerfiles/keycloak/tree/master/proxy"
                  ],
                  "icon": "/v1/assets/incubator/keycloak-proxy/logo"
              },
              "links": {
                  "self": "/v1/charts/incubator/keycloak-proxy"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.0.1",
                          "app_version": "3.4.2.Final",
                          "created": "2019-11-06T09:29:02.012Z",
                          "digest": "bef39f588a3e1c6ec1baee4f6645d71f4339a61d7a16d758a0079f00c1f18930",
                          "urls": [
                              "https://kubernetes-charts-incubator.storage.googleapis.com/keycloak-proxy-0.0.1.tgz"
                          ],
                          "readme": "/v1/assets/incubator/keycloak-proxy/versions/0.0.1/README.md",
                          "values": "/v1/assets/incubator/keycloak-proxy/versions/0.0.1/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/incubator/keycloak-proxy/versions/0.0.1"
                      }
                  }
              }
          },
          {
              "id": "stable/kiam",
              "type": "chart",
              "attributes": {
                  "name": "kiam",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Integrate AWS IAM with Kubernetes",
                  "home": "https://github.com/uswitch/kiam",
                  "keywords": [
                      "kiam",
                      "aws",
                      "iam",
                      "security"
                  ],
                  "maintainers": [
                      {
                          "name": "ewbankkit",
                          "email": "Kit_Ewbank@hotmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/uswitch/kiam"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/kiam"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "2.5.2",
                          "app_version": "3.3",
                          "created": "2019-11-06T08:58:33.66Z",
                          "digest": "533a660e247aa49106b4bc5087da1a9a6b786bc996cd6b235b9f4ba86f372641",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/kiam-2.5.2.tgz"
                          ],
                          "readme": "/v1/assets/stable/kiam/versions/2.5.2/README.md",
                          "values": "/v1/assets/stable/kiam/versions/2.5.2/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/kiam/versions/2.5.2"
                      }
                  }
              }
          },
          {
              "id": "bitnami/kibana",
              "type": "chart",
              "attributes": {
                  "name": "kibana",
                  "repo": {
                      "name": "bitnami",
                      "url": "https://charts.bitnami.com/bitnami"
                  },
                  "description": "Kibana is an open source, browser based analytics and search dashboard for Elasticsearch.",
                  "home": "https://www.elastic.co/products/kibana",
                  "keywords": [
                      "kibana",
                      "analitics",
                      "monitoring",
                      "metrics",
                      "logs"
                  ],
                  "maintainers": [
                      {
                          "name": "Bitnami",
                          "email": "containers@bitnami.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/bitnami/bitnami-docker-kibana"
                  ],
                  "icon": "/v1/assets/bitnami/kibana/logo"
              },
              "links": {
                  "self": "/v1/charts/bitnami/kibana"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "2.0.2",
                          "app_version": "7.4.1",
                          "created": "2019-11-06T09:38:39.627Z",
                          "digest": "fdfe8ea7ddb7003f1246a29b2d1c99e645826990fd427789d4ce77fe0966328a",
                          "urls": [
                              "https://charts.bitnami.com/bitnami/kibana-2.0.2.tgz"
                          ],
                          "readme": "/v1/assets/bitnami/kibana/versions/2.0.2/README.md",
                          "values": "/v1/assets/bitnami/kibana/versions/2.0.2/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/bitnami/kibana/versions/2.0.2"
                      }
                  }
              }
          },
          {
              "id": "stable/kibana",
              "type": "chart",
              "attributes": {
                  "name": "kibana",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Kibana is an open source data visualization plugin for Elasticsearch",
                  "home": "https://www.elastic.co/products/kibana",
                  "keywords": [
                      "elasticsearch",
                      "kibana"
                  ],
                  "maintainers": [
                      {
                          "name": "compleatang",
                          "email": "casey@monax.io"
                      },
                      {
                          "name": "monotek",
                          "email": "monotek23@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/elastic/kibana"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/kibana"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "3.2.4",
                          "app_version": "6.7.0",
                          "created": "2019-11-06T08:58:33.66Z",
                          "digest": "a1fc2a938a02a012249132ead8965a8c75cc03facb75f2bb21018ad0cb4783f8",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/kibana-3.2.4.tgz"
                          ],
                          "readme": "/v1/assets/stable/kibana/versions/3.2.4/README.md",
                          "values": "/v1/assets/stable/kibana/versions/3.2.4/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/kibana/versions/3.2.4"
                      }
                  }
              }
          },
          {
              "id": "stable/kong",
              "type": "chart",
              "attributes": {
                  "name": "kong",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "The Cloud-Native Ingress and Service Mesh for APIs and Microservices",
                  "home": "https://KongHQ.com/",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "shashiranjan84",
                          "email": "shashi@konghq.com"
                      },
                      {
                          "name": "hbagdi",
                          "email": "harry@konghq.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/Kong/kong"
                  ],
                  "icon": "/v1/assets/stable/kong/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/kong"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.26.0",
                          "app_version": "1.3",
                          "created": "2019-11-06T08:58:33.664Z",
                          "digest": "b272e752ca9dadc018cd5733722c7d99ae16e7015d45d6ee401288039171e6c7",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/kong-0.26.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/kong/versions/0.26.0/README.md",
                          "values": "/v1/assets/stable/kong/versions/0.26.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/kong/versions/0.26.0"
                      }
                  }
              }
          },
          {
              "id": "incubator/kube-downscaler",
              "type": "chart",
              "attributes": {
                  "name": "kube-downscaler",
                  "repo": {
                      "name": "incubator",
                      "url": "https://kubernetes-charts-incubator.storage.googleapis.com"
                  },
                  "description": "A Helm chart for kube-downscaler",
                  "home": "https://github.com/hjacobs/kube-downscaler",
                  "keywords": [
                      "k8s pods scheduler",
                      "scheduled lifecycle"
                  ],
                  "maintainers": [
                      {
                          "name": "Rowern",
                          "email": "c.tresarrieu@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/hjacobs/kube-downscaler"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/incubator/kube-downscaler"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.3.0",
                          "app_version": "19.10.1",
                          "created": "2019-11-06T09:29:02.012Z",
                          "digest": "09b8cd689ecbd92ce8ed1e71c54d733904c7859e9979062541c57e30e7604043",
                          "urls": [
                              "https://kubernetes-charts-incubator.storage.googleapis.com/kube-downscaler-0.3.0.tgz"
                          ],
                          "readme": "/v1/assets/incubator/kube-downscaler/versions/0.3.0/README.md",
                          "values": "/v1/assets/incubator/kube-downscaler/versions/0.3.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/incubator/kube-downscaler/versions/0.3.0"
                      }
                  }
              }
          },
          {
              "id": "stable/kube-hunter",
              "type": "chart",
              "attributes": {
                  "name": "kube-hunter",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "A Helm chart for Kube-hunter",
                  "home": "https://github.com/aquasecurity/kube-hunter",
                  "keywords": [
                      "kubernetes",
                      "kube-hunter",
                      "security"
                  ],
                  "maintainers": [
                      {
                          "name": "desaintmartin",
                          "email": "cedric@desaintmartin.fr"
                      },
                      {
                          "name": "lizrice",
                          "email": "liz@lizrice.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/aquasecurity/kube-hunter/blob/master/job.yaml"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/kube-hunter"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.0.3",
                          "app_version": "312",
                          "created": "2019-11-06T08:58:33.665Z",
                          "digest": "10a4fe85787420872214c04aa3682b757cefa3948c62968313edeb96cce6cd57",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/kube-hunter-1.0.3.tgz"
                          ],
                          "readme": "/v1/assets/stable/kube-hunter/versions/1.0.3/README.md",
                          "values": "/v1/assets/stable/kube-hunter/versions/1.0.3/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/kube-hunter/versions/1.0.3"
                      }
                  }
              }
          },
          {
              "id": "incubator/kube-janitor",
              "type": "chart",
              "attributes": {
                  "name": "kube-janitor",
                  "repo": {
                      "name": "incubator",
                      "url": "https://kubernetes-charts-incubator.storage.googleapis.com"
                  },
                  "description": "A Helm chart for running kube-janitor",
                  "home": "https://github.com/themagicalkarp/kube-janitor",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "theMagicalKarp",
                          "email": "gameboy1092@gmail.com"
                      },
                      {
                          "name": "SimKev2",
                          "email": "simkev2@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/themagicalkarp/kube-janitor"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/incubator/kube-janitor"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.1.0",
                          "app_version": "v0.1.0",
                          "created": "2019-11-06T09:29:02.012Z",
                          "digest": "5baa22973ee9ab6d0bce555c6600bc0dc14c07170d6aab1e0d07f80dbacdb8d3",
                          "urls": [
                              "https://kubernetes-charts-incubator.storage.googleapis.com/kube-janitor-0.1.0.tgz"
                          ],
                          "readme": "/v1/assets/incubator/kube-janitor/versions/0.1.0/README.md",
                          "values": "/v1/assets/incubator/kube-janitor/versions/0.1.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/incubator/kube-janitor/versions/0.1.0"
                      }
                  }
              }
          },
          {
              "id": "stable/kube-ops-view",
              "type": "chart",
              "attributes": {
                  "name": "kube-ops-view",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Kubernetes Operational View - read-only system dashboard for multiple K8s clusters",
                  "home": "https://github.com/hjacobs/kube-ops-view",
                  "keywords": [
                      "kubernetes",
                      "dashboard",
                      "operations"
                  ],
                  "maintainers": [
                      {
                          "name": "hjacobs",
                          "email": "henning@jacobs1.de"
                      }
                  ],
                  "sources": [
                      "https://github.com/hjacobs/kube-ops-view"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/kube-ops-view"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.1.0",
                          "app_version": "0.11",
                          "created": "2019-11-06T08:58:33.667Z",
                          "digest": "eb726e099cfc6c17d4720f7e5de2e610fb805e5d99719305f869faefc2d59da3",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/kube-ops-view-1.1.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/kube-ops-view/versions/1.1.0/README.md",
                          "values": "/v1/assets/stable/kube-ops-view/versions/1.1.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/kube-ops-view/versions/1.1.0"
                      }
                  }
              }
          },
          {
              "id": "incubator/kube-ops-view",
              "type": "chart",
              "attributes": {
                  "name": "kube-ops-view",
                  "repo": {
                      "name": "incubator",
                      "url": "https://kubernetes-charts-incubator.storage.googleapis.com"
                  },
                  "description": "Kubernetes Operational View - read-only system dashboard for multiple K8s clusters",
                  "home": "https://github.com/hjacobs/kube-ops-view",
                  "keywords": [
                      "kubernetes",
                      "dashboard",
                      "operations"
                  ],
                  "maintainers": [
                      {
                          "name": "Henning Jacobs",
                          "email": "henning@jacobs1.de"
                      }
                  ],
                  "sources": [
                      "https://github.com/hjacobs/kube-ops-view"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/incubator/kube-ops-view"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.1.0",
                          "app_version": "",
                          "created": "2017-03-14T23:48:38.628Z",
                          "digest": "58eb51365b2ffe56e674ecc6d6130b8c016621d9599ff89682aa649735d39474",
                          "urls": [
                              "https://kubernetes-charts-incubator.storage.googleapis.com/kube-ops-view-0.1.0.tgz"
                          ],
                          "readme": "/v1/assets/incubator/kube-ops-view/versions/0.1.0/README.md",
                          "values": "/v1/assets/incubator/kube-ops-view/versions/0.1.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/incubator/kube-ops-view/versions/0.1.0"
                      }
                  }
              }
          },
          {
              "id": "incubator/kube-registry-proxy",
              "type": "chart",
              "attributes": {
                  "name": "kube-registry-proxy",
                  "repo": {
                      "name": "incubator",
                      "url": "https://kubernetes-charts-incubator.storage.googleapis.com"
                  },
                  "description": "Installs the kubernetes-registry-proxy cluster addon.",
                  "home": "https://github.com/kubernetes/kubernetes/tree/master/cluster/addons/registry",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "maorfr",
                          "email": "maor.friedman@redhat.com"
                      }
                  ],
                  "sources": [],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/incubator/kube-registry-proxy"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.3.1",
                          "app_version": "0.4",
                          "created": "2019-11-06T09:29:02.012Z",
                          "digest": "a27887be8958f66bdc31d50ace8a3ef6dab831aa3e97d06435467c0e9e5fbece",
                          "urls": [
                              "https://kubernetes-charts-incubator.storage.googleapis.com/kube-registry-proxy-0.3.1.tgz"
                          ],
                          "readme": "/v1/assets/incubator/kube-registry-proxy/versions/0.3.1/README.md",
                          "values": "/v1/assets/incubator/kube-registry-proxy/versions/0.3.1/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/incubator/kube-registry-proxy/versions/0.3.1"
                      }
                  }
              }
          },
          {
              "id": "stable/kube-slack",
              "type": "chart",
              "attributes": {
                  "name": "kube-slack",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Chart for kube-slack, a monitoring service for Kubernetes",
                  "home": "https://github.com/wongnai/kube-slack",
                  "keywords": [
                      "kubernetes",
                      "monitoring",
                      "slack"
                  ],
                  "maintainers": [
                      {
                          "name": "jstriebel",
                          "email": "jonathan@scalableminds.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/wongnai/kube-slack"
                  ],
                  "icon": "/v1/assets/stable/kube-slack/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/kube-slack"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.2.0",
                          "app_version": "v4.2.0",
                          "created": "2019-11-06T08:58:33.668Z",
                          "digest": "76875721a85075168d5bfc0fedd6b86abcda96370850779212b246e623a64c58",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/kube-slack-1.2.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/kube-slack/versions/1.2.0/README.md",
                          "values": "/v1/assets/stable/kube-slack/versions/1.2.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/kube-slack/versions/1.2.0"
                      }
                  }
              }
          },
          {
              "id": "incubator/kube-spot-termination-notice-handler",
              "type": "chart",
              "attributes": {
                  "name": "kube-spot-termination-notice-handler",
                  "repo": {
                      "name": "incubator",
                      "url": "https://kubernetes-charts-incubator.storage.googleapis.com"
                  },
                  "description": "Watch and action AWS spot termination events",
                  "home": "https://github.com/kube-aws/kube-spot-termination-notice-handler",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "egeland",
                          "email": "egeland@gmail.com"
                      }
                  ],
                  "sources": [],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/incubator/kube-spot-termination-notice-handler"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.4.0",
                          "app_version": "1.10.8-1",
                          "created": "2019-02-01T18:56:42.297Z",
                          "digest": "8d59caeb4875217291cb3601571a6e78c9fd81841ff42575f8fff0bc857f916b",
                          "urls": [
                              "https://kubernetes-charts-incubator.storage.googleapis.com/kube-spot-termination-notice-handler-0.4.0.tgz"
                          ],
                          "readme": "/v1/assets/incubator/kube-spot-termination-notice-handler/versions/0.4.0/README.md",
                          "values": "/v1/assets/incubator/kube-spot-termination-notice-handler/versions/0.4.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/incubator/kube-spot-termination-notice-handler/versions/0.4.0"
                      }
                  }
              }
          },
          {
              "id": "stable/kube-state-metrics",
              "type": "chart",
              "attributes": {
                  "name": "kube-state-metrics",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Install kube-state-metrics to generate and expose cluster-level metrics",
                  "home": "https://github.com/kubernetes/kube-state-metrics/",
                  "keywords": [
                      "metric",
                      "monitoring",
                      "prometheus",
                      "kubernetes"
                  ],
                  "maintainers": [
                      {
                          "name": "fiunchinho",
                          "email": "jose@armesto.net"
                      },
                      {
                          "name": "tariq1890",
                          "email": "tariq.ibrahim@mulesoft.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/kubernetes/kube-state-metrics/"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/kube-state-metrics"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "2.4.1",
                          "app_version": "1.8.0",
                          "created": "2019-11-06T08:58:33.669Z",
                          "digest": "39a00b267f595505a33cb7137f41ea4cd9b541894853c74dd91c378aa9676b89",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/kube-state-metrics-2.4.1.tgz"
                          ],
                          "readme": "/v1/assets/stable/kube-state-metrics/versions/2.4.1/README.md",
                          "values": "/v1/assets/stable/kube-state-metrics/versions/2.4.1/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/kube-state-metrics/versions/2.4.1"
                      }
                  }
              }
          },
          {
              "id": "stable/kube2iam",
              "type": "chart",
              "attributes": {
                  "name": "kube2iam",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Provide IAM credentials to pods based on annotations.",
                  "home": "https://github.com/jtblin/kube2iam",
                  "keywords": [
                      "kube2iam",
                      "aws",
                      "iam",
                      "security"
                  ],
                  "maintainers": [
                      {
                          "name": "jmcarp",
                          "email": "jm.carp@gmail.com"
                      },
                      {
                          "name": "icereval",
                          "email": "michael.haselton@gmail.com"
                      },
                      {
                          "name": "mgoodness",
                          "email": "mgoodness@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/jtblin/kube2iam"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/kube2iam"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "2.0.2",
                          "app_version": "0.10.7",
                          "created": "2019-11-06T08:58:33.669Z",
                          "digest": "9d56960dd3096be55a6f44d67809a2f40325e92ca67a7e32e78fc412f7ccf465",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/kube2iam-2.0.2.tgz"
                          ],
                          "readme": "/v1/assets/stable/kube2iam/versions/2.0.2/README.md",
                          "values": "/v1/assets/stable/kube2iam/versions/2.0.2/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/kube2iam/versions/2.0.2"
                      }
                  }
              }
          },
          {
              "id": "bitnami/kubeapps",
              "type": "chart",
              "attributes": {
                  "name": "kubeapps",
                  "repo": {
                      "name": "bitnami",
                      "url": "https://charts.bitnami.com/bitnami"
                  },
                  "description": "Kubeapps is a dashboard for your Kubernetes cluster that makes it easy to deploy and manage applications in your cluster using Helm",
                  "home": "https://kubeapps.com",
                  "keywords": [
                      "helm",
                      "dashboard",
                      "service catalog",
                      "deployment"
                  ],
                  "maintainers": [
                      {
                          "name": "Bitnami",
                          "email": "containers@bitnami.com"
                      },
                      {
                          "name": "prydonius",
                          "email": "adnan@bitnami.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/kubeapps/kubeapps"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/bitnami/kubeapps"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "3.0.3",
                          "app_version": "v1.6.1",
                          "created": "2019-11-06T09:38:39.631Z",
                          "digest": "27e656eb3162ec566c9a8b33eab4c7e509e0f0e685e058e7dcf53a2ab25327f6",
                          "urls": [
                              "https://charts.bitnami.com/bitnami/kubeapps-3.0.3.tgz"
                          ],
                          "readme": "/v1/assets/bitnami/kubeapps/versions/3.0.3/README.md",
                          "values": "/v1/assets/bitnami/kubeapps/versions/3.0.3/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/bitnami/kubeapps/versions/3.0.3"
                      }
                  }
              }
          },
          {
              "id": "incubator/kubeless",
              "type": "chart",
              "attributes": {
                  "name": "kubeless",
                  "repo": {
                      "name": "incubator",
                      "url": "https://kubernetes-charts-incubator.storage.googleapis.com"
                  },
                  "description": "Kubeless is a Kubernetes-native serverless framework. It runs on top of your Kubernetes cluster and allows you to deploy small unit of code without having to build container images.",
                  "home": "http://kubeless.io/",
                  "keywords": [
                      "kubeless",
                      "serverless",
                      "function-as-a-service",
                      "faas"
                  ],
                  "maintainers": [
                      {
                          "name": "Bitnami",
                          "email": "containers@bitnami.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/kubeless/kubeless"
                  ],
                  "icon": "/v1/assets/incubator/kubeless/logo"
              },
              "links": {
                  "self": "/v1/charts/incubator/kubeless"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "2.1.0",
                          "app_version": "v1.0.4",
                          "created": "2019-11-06T09:29:02.013Z",
                          "digest": "21a3d69e1789475867b5bd9bdfbcdbab04caf732bbe92c46c922f7608eaa868f",
                          "urls": [
                              "https://kubernetes-charts-incubator.storage.googleapis.com/kubeless-2.1.0.tgz"
                          ],
                          "readme": "/v1/assets/incubator/kubeless/versions/2.1.0/README.md",
                          "values": "/v1/assets/incubator/kubeless/versions/2.1.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/incubator/kubeless/versions/2.1.0"
                      }
                  }
              }
          },
          {
              "id": "stable/kuberhealthy",
              "type": "chart",
              "attributes": {
                  "name": "kuberhealthy",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "The official Helm chart for Kuberhealthy.",
                  "home": "https://comcast.github.io/kuberhealthy/",
                  "keywords": [
                      "kuberhealthy",
                      "kubernetes",
                      "monitoring",
                      "synthetic",
                      "comcast",
                      "health",
                      "cluster",
                      "prometheus"
                  ],
                  "maintainers": [
                      {
                          "name": "integrii",
                          "email": "eric.greer@comcast.com"
                      },
                      {
                          "name": "lolimjake",
                          "email": "jacob.martin@comcast.com"
                      },
                      {
                          "name": "ihoegen",
                          "email": "ianhoegen@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/Comcast/kuberhealthy",
                      "https://github.com/helm/charts/tree/master/stable/kuberhealthy"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/kuberhealthy"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.2.6",
                          "app_version": "v1.0.2",
                          "created": "2019-11-06T08:58:33.671Z",
                          "digest": "0cf6c771efc1204620a91bcfe589d8ae5dc099eafc6e42de4104e8f4a426779e",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/kuberhealthy-1.2.6.tgz"
                          ],
                          "readme": "/v1/assets/stable/kuberhealthy/versions/1.2.6/README.md",
                          "values": "/v1/assets/stable/kuberhealthy/versions/1.2.6/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/kuberhealthy/versions/1.2.6"
                      }
                  }
              }
          },
          {
              "id": "stable/kubernetes-dashboard",
              "type": "chart",
              "attributes": {
                  "name": "kubernetes-dashboard",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "General-purpose web UI for Kubernetes clusters",
                  "home": "https://github.com/kubernetes/dashboard",
                  "keywords": [
                      "kubernetes",
                      "dashboard"
                  ],
                  "maintainers": [
                      {
                          "name": "kfox1111",
                          "email": "Kevin.Fox@pnnl.gov"
                      },
                      {
                          "name": "desaintmartin",
                          "email": "cdesaintmartin@wiremind.fr"
                      }
                  ],
                  "sources": [
                      "https://github.com/kubernetes/dashboard"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/kubernetes-dashboard"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.10.1",
                          "app_version": "1.10.1",
                          "created": "2019-11-06T08:58:33.672Z",
                          "digest": "6598a8712099b751af3713a69ecb57cd4e4c99b0692cef4907e214eeb4f314b7",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/kubernetes-dashboard-1.10.1.tgz"
                          ],
                          "readme": "/v1/assets/stable/kubernetes-dashboard/versions/1.10.1/README.md",
                          "values": "/v1/assets/stable/kubernetes-dashboard/versions/1.10.1/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/kubernetes-dashboard/versions/1.10.1"
                      }
                  }
              }
          },
          {
              "id": "incubator/kubernetes-vault",
              "type": "chart",
              "attributes": {
                  "name": "kubernetes-vault",
                  "repo": {
                      "name": "incubator",
                      "url": "https://kubernetes-charts-incubator.storage.googleapis.com"
                  },
                  "description": "The Kubernetes-Vault project allows pods to automatically receive a Vault token using Vaults AppRole auth backend.",
                  "home": "https://github.com/Boostport/kubernetes-vault",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "bbriggs",
                          "email": "briggs.brenton@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/Boostport/kubernetes-vault"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/incubator/kubernetes-vault"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.2.1",
                          "app_version": "0.5.2",
                          "created": "2019-11-06T09:29:02.013Z",
                          "digest": "70aee2f56db13b612cda7f41c0c9f94ec8d148106e418c71fecc0d8252fe8f5c",
                          "urls": [
                              "https://kubernetes-charts-incubator.storage.googleapis.com/kubernetes-vault-0.2.1.tgz"
                          ],
                          "readme": "/v1/assets/incubator/kubernetes-vault/versions/0.2.1/README.md",
                          "values": "/v1/assets/incubator/kubernetes-vault/versions/0.2.1/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/incubator/kubernetes-vault/versions/0.2.1"
                      }
                  }
              }
          },
          {
              "id": "stable/kuberos",
              "type": "chart",
              "attributes": {
                  "name": "kuberos",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "An OIDC authentication helper for Kubernetes",
                  "home": "https://github.com/negz/kuberos",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "timothyclarke",
                          "email": "ghtimothy@timothy.fromnz.net"
                      }
                  ],
                  "sources": [
                      "https://github.com/negz/kuberos"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/kuberos"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.2.1",
                          "app_version": "2018-07-03",
                          "created": "2019-11-06T08:58:33.673Z",
                          "digest": "8bb4306cb6ff7bc68e4f735fbe0cc352012027d8e82ba981c5f6fd4a52f49347",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/kuberos-0.2.1.tgz"
                          ],
                          "readme": "/v1/assets/stable/kuberos/versions/0.2.1/README.md",
                          "values": "/v1/assets/stable/kuberos/versions/0.2.1/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/kuberos/versions/0.2.1"
                      }
                  }
              }
          },
          {
              "id": "bitnami/kubewatch",
              "type": "chart",
              "attributes": {
                  "name": "kubewatch",
                  "repo": {
                      "name": "bitnami",
                      "url": "https://charts.bitnami.com/bitnami"
                  },
                  "description": "Kubewatch notifies your slack rooms when changes to your cluster occur",
                  "home": "https://github.com/bitnami-labs/kubewatch",
                  "keywords": [
                      "kubernetes",
                      "slack",
                      "hipchat",
                      "mattermost",
                      "flock"
                  ],
                  "maintainers": [
                      {
                          "name": "compleatang",
                          "email": "casey@monax.io"
                      },
                      {
                          "name": "Bitnami",
                          "email": "containers@bitnami.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/bitnami/bitnami-docker-kubewatch"
                  ],
                  "icon": "/v1/assets/bitnami/kubewatch/logo"
              },
              "links": {
                  "self": "/v1/charts/bitnami/kubewatch"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.8.13",
                          "app_version": "0.0.4",
                          "created": "2019-11-06T09:38:39.632Z",
                          "digest": "05765ee27735e012c47ce393f0a8c457e2bc71320a2e2caee2367538dc92895f",
                          "urls": [
                              "https://charts.bitnami.com/bitnami/kubewatch-0.8.13.tgz"
                          ],
                          "readme": "/v1/assets/bitnami/kubewatch/versions/0.8.13/README.md",
                          "values": "/v1/assets/bitnami/kubewatch/versions/0.8.13/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/bitnami/kubewatch/versions/0.8.13"
                      }
                  }
              }
          },
          {
              "id": "stable/kured",
              "type": "chart",
              "attributes": {
                  "name": "kured",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "A Helm chart for kured",
                  "home": "https://github.com/weaveworks/kured",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "plumdog",
                          "email": "plummer574@gmail.com"
                      },
                      {
                          "name": "patrickmslatteryvt",
                          "email": "pslattery@mi9retail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/weaveworks/kured"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/kured"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.4.1",
                          "app_version": "1.2.0",
                          "created": "2019-11-06T08:58:33.674Z",
                          "digest": "4515e9fd172f7b4728e8ce564fdef54899e3bda430ebe27e7a6b9b9ea6e39b16",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/kured-1.4.1.tgz"
                          ],
                          "readme": "/v1/assets/stable/kured/versions/1.4.1/README.md",
                          "values": "/v1/assets/stable/kured/versions/1.4.1/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/kured/versions/1.4.1"
                      }
                  }
              }
          },
          {
              "id": "stable/lamp",
              "type": "chart",
              "attributes": {
                  "name": "lamp",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Modular and transparent LAMP stack chart supporting PHP-FPM, Release Cloning, LoadBalancer, Ingress, SSL and lots more!",
                  "home": "https://github.com/lead4good/helm-lamp-stack",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "lead4good"
                      }
                  ],
                  "sources": [],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/lamp"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.1.1",
                          "app_version": "7",
                          "created": "2019-11-06T08:58:33.676Z",
                          "digest": "f8f72b9d370ceb12b9e4faa7d7f377daf99abd107d12453d5f28f12b2969aa83",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/lamp-1.1.1.tgz"
                          ],
                          "readme": "/v1/assets/stable/lamp/versions/1.1.1/README.md",
                          "values": "/v1/assets/stable/lamp/versions/1.1.1/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/lamp/versions/1.1.1"
                      }
                  }
              }
          },
          {
              "id": "stable/linkerd",
              "type": "chart",
              "attributes": {
                  "name": "linkerd",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Service mesh for cloud native apps",
                  "home": "https://linkerd.io/",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "Vic Iglesias",
                          "email": "viglesias@google.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/BuoyantIO/linkerd"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/linkerd"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.4.1",
                          "app_version": "1.1.2",
                          "created": "2019-11-06T08:58:33.676Z",
                          "digest": "fe6a39f9aad1c36ff6faccb1acc927c04983a316853827c2e3a3a57d0383f104",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/linkerd-0.4.1.tgz"
                          ],
                          "readme": "/v1/assets/stable/linkerd/versions/0.4.1/README.md",
                          "values": "/v1/assets/stable/linkerd/versions/0.4.1/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/linkerd/versions/0.4.1"
                      }
                  }
              }
          },
          {
              "id": "stable/locust",
              "type": "chart",
              "attributes": {
                  "name": "locust",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "A modern load testing framework",
                  "home": "http://locust.io",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "haugene",
                          "email": "kristian.haugene@greenbird.com"
                      },
                      {
                          "name": "sekka1",
                          "email": "sekka1@managedkube.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/greenbird/locust"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/locust"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.1.2",
                          "app_version": "0.9.0",
                          "created": "2019-11-06T08:58:33.677Z",
                          "digest": "fa97b0a5fae2ec423d84a9ca74b55b13978db52af6841f80453841ba16fe2c5d",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/locust-1.1.2.tgz"
                          ],
                          "readme": "/v1/assets/stable/locust/versions/1.1.2/README.md",
                          "values": "/v1/assets/stable/locust/versions/1.1.2/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/locust/versions/1.1.2"
                      }
                  }
              }
          },
          {
              "id": "stable/logdna-agent",
              "type": "chart",
              "attributes": {
                  "name": "logdna-agent",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Run this, get logs. All cluster containers. LogDNA collector agent daemonset for Kubernetes.",
                  "home": "https://logdna.com",
                  "keywords": [
                      "logs",
                      "logging",
                      "log-management",
                      "agent",
                      "alerts",
                      "metrics",
                      "events",
                      "daemonset",
                      "logger"
                  ],
                  "maintainers": [
                      {
                          "name": "leeliu",
                          "email": "lee@logdna.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/logdna/logdna-agent"
                  ],
                  "icon": "/v1/assets/stable/logdna-agent/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/logdna-agent"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.3.0",
                          "app_version": "1.5.6",
                          "created": "2019-11-06T08:58:33.677Z",
                          "digest": "32473b5b42aa4214c5838f2938b4fb8b972829527542a688cb63599b58504f16",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/logdna-agent-1.3.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/logdna-agent/versions/1.3.0/README.md",
                          "values": "/v1/assets/stable/logdna-agent/versions/1.3.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/logdna-agent/versions/1.3.0"
                      }
                  }
              }
          },
          {
              "id": "stable/logstash",
              "type": "chart",
              "attributes": {
                  "name": "logstash",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Logstash is an open source, server-side data processing pipeline",
                  "home": "https://www.elastic.co/products/logstash",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "rendhalver",
                          "email": "pete.brown@powerhrg.com"
                      },
                      {
                          "name": "jar361",
                          "email": "jrodgers@powerhrg.com"
                      },
                      {
                          "name": "christian-roggia",
                          "email": "christian.roggia@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://www.docker.elastic.co",
                      "https://www.elastic.co/guide/en/logstash/current/index.html"
                  ],
                  "icon": "/v1/assets/stable/logstash/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/logstash"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "2.3.0",
                          "app_version": "7.1.1",
                          "created": "2019-11-06T08:58:33.678Z",
                          "digest": "1e09cdf6eb64b70fbc0780bcfa1892cdb9351c1f29f4a11fe4850b4136ae46e9",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/logstash-2.3.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/logstash/versions/2.3.0/README.md",
                          "values": "/v1/assets/stable/logstash/versions/2.3.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/logstash/versions/2.3.0"
                      }
                  }
              }
          },
          {
              "id": "bitnami/logstash",
              "type": "chart",
              "attributes": {
                  "name": "logstash",
                  "repo": {
                      "name": "bitnami",
                      "url": "https://charts.bitnami.com/bitnami"
                  },
                  "description": "Logstash is an open source, server-side data processing pipeline that ingests data from a multitude of sources simultaneously, transforms it, and then sends it to your favorite \"stash\".",
                  "home": "https://www.elastic.co/products/logstash",
                  "keywords": [
                      "logstash",
                      "logging",
                      "elk"
                  ],
                  "maintainers": [
                      {
                          "name": "Bitnami",
                          "email": "containers@bitnami.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/bitnami/bitnami-docker-logstash"
                  ],
                  "icon": "/v1/assets/bitnami/logstash/logo"
              },
              "links": {
                  "self": "/v1/charts/bitnami/logstash"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.2.0",
                          "app_version": "7.4.0",
                          "created": "2019-11-06T09:38:39.634Z",
                          "digest": "1cfba50162a0d848ed91a7e4dc7763352485bbb3ef387ca3e7f732b73ef82a33",
                          "urls": [
                              "https://charts.bitnami.com/bitnami/logstash-0.2.0.tgz"
                          ],
                          "readme": "/v1/assets/bitnami/logstash/versions/0.2.0/README.md",
                          "values": "/v1/assets/bitnami/logstash/versions/0.2.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/bitnami/logstash/versions/0.2.0"
                      }
                  }
              }
          },
          {
              "id": "stable/luigi",
              "type": "chart",
              "attributes": {
                  "name": "luigi",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Luigi is a Python module that helps you build complex pipelines of batch jobs. It handles dependency resolution, workflow management, visualization etc. It also comes with Hadoop support built in.",
                  "home": "https://luigi.readthedocs.io/en/stable/",
                  "keywords": [
                      "luigi",
                      "scheduler",
                      "dependency graph",
                      "web",
                      "task management",
                      "hadoop",
                      "spark",
                      "kubernetes job manager"
                  ],
                  "maintainers": [
                      {
                          "name": "sammerry",
                          "email": "sam.merry@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/spotify/luigi/",
                      "https://github.com/sammerry/luigi-docker-image/"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/luigi"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "2.7.5",
                          "app_version": "2.7.2",
                          "created": "2019-11-06T08:58:33.68Z",
                          "digest": "fc6704db3c7271b5201d3a1af637f9689a0497aea9ff9df7f8931087df9f7eb3",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/luigi-2.7.5.tgz"
                          ],
                          "readme": "/v1/assets/stable/luigi/versions/2.7.5/README.md",
                          "values": "/v1/assets/stable/luigi/versions/2.7.5/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/luigi/versions/2.7.5"
                      }
                  }
              }
          },
          {
              "id": "bitnami/magento",
              "type": "chart",
              "attributes": {
                  "name": "magento",
                  "repo": {
                      "name": "bitnami",
                      "url": "https://charts.bitnami.com/bitnami"
                  },
                  "description": "A feature-rich flexible e-commerce solution. It includes transaction options, multi-store functionality, loyalty programs, product categorization and shopper filtering, promotion rules, and more.",
                  "home": "https://magento.com/",
                  "keywords": [
                      "magento",
                      "e-commerce",
                      "http",
                      "web",
                      "php"
                  ],
                  "maintainers": [
                      {
                          "name": "Bitnami",
                          "email": "containers@bitnami.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/bitnami/bitnami-docker-magento"
                  ],
                  "icon": "/v1/assets/bitnami/magento/logo"
              },
              "links": {
                  "self": "/v1/charts/bitnami/magento"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "9.0.0",
                          "app_version": "2.3.3",
                          "created": "2019-11-06T09:38:39.639Z",
                          "digest": "aa47f46174467c1e0418d839e52c6768263da93c5c9c51933a9d4accd38a0aaa",
                          "urls": [
                              "https://charts.bitnami.com/bitnami/magento-9.0.0.tgz"
                          ],
                          "readme": "/v1/assets/bitnami/magento/versions/9.0.0/README.md",
                          "values": "/v1/assets/bitnami/magento/versions/9.0.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/bitnami/magento/versions/9.0.0"
                      }
                  }
              }
          },
          {
              "id": "stable/magic-ip-address",
              "type": "chart",
              "attributes": {
                  "name": "magic-ip-address",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "A Helm chart to assign static IP addresses for node-local services",
                  "home": "https://github.com/mumoshu/kube-magic-ip-address",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "mumoshu",
                          "email": "ykuoka@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/mumoshu/kube-magic-ip-address"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/magic-ip-address"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.1.0",
                          "app_version": "0.9.0",
                          "created": "2019-11-06T08:58:33.685Z",
                          "digest": "b95897e8e331ca0a2d07bf3b8316d2d89c3b8cd1045197f9c9bdae74f4024c6d",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/magic-ip-address-0.1.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/magic-ip-address/versions/0.1.0/README.md",
                          "values": "/v1/assets/stable/magic-ip-address/versions/0.1.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/magic-ip-address/versions/0.1.0"
                      }
                  }
              }
          },
          {
              "id": "stable/magic-namespace",
              "type": "chart",
              "attributes": {
                  "name": "magic-namespace",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Elegantly enables a Tiller per namespace in RBAC-enabled clusters",
                  "home": "https://github.com/kubernetes/charts/tree/master/stable/magic-namespace",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "krancour",
                          "email": "kent.rancourt@microsoft.com"
                      }
                  ],
                  "sources": [],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/magic-namespace"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.5.2",
                          "app_version": "2.8.1",
                          "created": "2019-11-06T08:58:33.685Z",
                          "digest": "38173e05ccdc49a5ab5f6aa51f85f18c5b8b40c54a0d0af0480c16f8507549da",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/magic-namespace-0.5.2.tgz"
                          ],
                          "readme": "/v1/assets/stable/magic-namespace/versions/0.5.2/README.md",
                          "values": "/v1/assets/stable/magic-namespace/versions/0.5.2/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/magic-namespace/versions/0.5.2"
                      }
                  }
              }
          },
          {
              "id": "bitnami/mariadb",
              "type": "chart",
              "attributes": {
                  "name": "mariadb",
                  "repo": {
                      "name": "bitnami",
                      "url": "https://charts.bitnami.com/bitnami"
                  },
                  "description": "Fast, reliable, scalable, and easy to use open-source relational database system. MariaDB Server is intended for mission-critical, heavy-load production systems as well as for embedding into mass-deployed software. Highly available MariaDB cluster.",
                  "home": "https://mariadb.org",
                  "keywords": [
                      "mariadb",
                      "mysql",
                      "database",
                      "sql",
                      "prometheus"
                  ],
                  "maintainers": [
                      {
                          "name": "Bitnami",
                          "email": "containers@bitnami.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/bitnami/bitnami-docker-mariadb",
                      "https://github.com/prometheus/mysqld_exporter"
                  ],
                  "icon": "/v1/assets/bitnami/mariadb/logo"
              },
              "links": {
                  "self": "/v1/charts/bitnami/mariadb"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "6.13.0",
                          "app_version": "10.3.18",
                          "created": "2019-11-06T09:38:39.641Z",
                          "digest": "0e6b81f96ecdb3d5976a561bcb9e7ebc6307ebf593ff1ffb828c6f50e7c14cf7",
                          "urls": [
                              "https://charts.bitnami.com/bitnami/mariadb-6.13.0.tgz"
                          ],
                          "readme": "/v1/assets/bitnami/mariadb/versions/6.13.0/README.md",
                          "values": "/v1/assets/bitnami/mariadb/versions/6.13.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/bitnami/mariadb/versions/6.13.0"
                      }
                  }
              }
          },
          {
              "id": "bitnami/mariadb-cluster",
              "type": "chart",
              "attributes": {
                  "name": "mariadb-cluster",
                  "repo": {
                      "name": "bitnami",
                      "url": "https://charts.bitnami.com/bitnami"
                  },
                  "description": "Chart to create a Highly available MariaDB cluster",
                  "home": "https://mariadb.org",
                  "keywords": [
                      "mariadb",
                      "mysql",
                      "database",
                      "sql",
                      "cluster",
                      "high availablity"
                  ],
                  "maintainers": [
                      {
                          "name": "Bitnami",
                          "email": "containers@bitnami.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/bitnami/bitnami-docker-mariadb"
                  ],
                  "icon": "/v1/assets/bitnami/mariadb-cluster/logo"
              },
              "links": {
                  "self": "/v1/charts/bitnami/mariadb-cluster"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.0.1",
                          "app_version": "10.2.14",
                          "created": "2018-05-12T10:44:44.134Z",
                          "digest": "ca001fdee79fbd4df7d3280ce93708340ffa652112a587c0ca987ae4c940116f",
                          "urls": [
                              "https://charts.bitnami.com/bitnami/mariadb-cluster-1.0.1.tgz"
                          ],
                          "readme": "/v1/assets/bitnami/mariadb-cluster/versions/1.0.1/README.md",
                          "values": "/v1/assets/bitnami/mariadb-cluster/versions/1.0.1/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/bitnami/mariadb-cluster/versions/1.0.1"
                      }
                  }
              }
          },
          {
              "id": "bitnami/mariadb-galera",
              "type": "chart",
              "attributes": {
                  "name": "mariadb-galera",
                  "repo": {
                      "name": "bitnami",
                      "url": "https://charts.bitnami.com/bitnami"
                  },
                  "description": "MariaDB Galera is a multi-master database cluster solution for synchronous replication and high availability.",
                  "home": "https://mariadb.org",
                  "keywords": [
                      "mariadb",
                      "mysql",
                      "database",
                      "sql",
                      "prometheus",
                      "galera",
                      "percona"
                  ],
                  "maintainers": [
                      {
                          "name": "Bitnami",
                          "email": "containers@bitnami.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/bitnami/bitnami-docker-mariadb-galera",
                      "https://github.com/prometheus/mysqld_exporter"
                  ],
                  "icon": "/v1/assets/bitnami/mariadb-galera/logo"
              },
              "links": {
                  "self": "/v1/charts/bitnami/mariadb-galera"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.5.0",
                          "app_version": "10.3.18",
                          "created": "2019-11-06T09:38:39.643Z",
                          "digest": "281414308c7c23b7457219a8f6ed3a68b79cfc76398ff24c8469ee25eb8cbbe7",
                          "urls": [
                              "https://charts.bitnami.com/bitnami/mariadb-galera-0.5.0.tgz"
                          ],
                          "readme": "/v1/assets/bitnami/mariadb-galera/versions/0.5.0/README.md",
                          "values": "/v1/assets/bitnami/mariadb-galera/versions/0.5.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/bitnami/mariadb-galera/versions/0.5.0"
                      }
                  }
              }
          },
          {
              "id": "stable/mcrouter",
              "type": "chart",
              "attributes": {
                  "name": "mcrouter",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Mcrouter is a memcached protocol router for scaling memcached deployments.",
                  "home": "https://github.com/facebook/mcrouter",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "jphalip",
                          "email": "jphalip@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/facebook/mcrouter",
                      "https://github.com/jphalip/mcrouter-docker"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/mcrouter"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.0.2",
                          "app_version": "0.36.0",
                          "created": "2019-11-06T08:58:33.689Z",
                          "digest": "8f0e8d4671fbedc4a195d7a43f3cb9372c59054623b326346a68698f977c499e",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/mcrouter-1.0.2.tgz"
                          ],
                          "readme": "/v1/assets/stable/mcrouter/versions/1.0.2/README.md",
                          "values": "/v1/assets/stable/mcrouter/versions/1.0.2/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/mcrouter/versions/1.0.2"
                      }
                  }
              }
          },
          {
              "id": "bitnami/mean",
              "type": "chart",
              "attributes": {
                  "name": "mean",
                  "repo": {
                      "name": "bitnami",
                      "url": "https://charts.bitnami.com/bitnami"
                  },
                  "description": "MEAN is a free and open-source JavaScript software stack for building dynamic web sites and web applications. The MEAN stack is MongoDB, Express.js, Angular, and Node.js. Because all components of the MEAN stack support programs written in JavaScript, MEAN applications can be written in one language for both server-side and client-side execution environments.",
                  "home": "http://nodejs.org/",
                  "keywords": [
                      "node",
                      "javascript",
                      "mongodb",
                      "express",
                      "angular",
                      "nodejs",
                      "git"
                  ],
                  "maintainers": [
                      {
                          "name": "Bitnami",
                          "email": "containers@bitnami.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/bitnami/bitnami-docker-node"
                  ],
                  "icon": "/v1/assets/bitnami/mean/logo"
              },
              "links": {
                  "self": "/v1/charts/bitnami/mean"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "6.1.1",
                          "app_version": "4.6.2",
                          "created": "2019-04-23T13:31:41.266Z",
                          "digest": "c2fd8dac2397e4cc26e22b67c13ea1c328bf04cf1b7349fbba80c8974640347c",
                          "urls": [
                              "https://charts.bitnami.com/bitnami/mean-6.1.1.tgz"
                          ],
                          "readme": "/v1/assets/bitnami/mean/versions/6.1.1/README.md",
                          "values": "/v1/assets/bitnami/mean/versions/6.1.1/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/bitnami/mean/versions/6.1.1"
                      }
                  }
              }
          },
          {
              "id": "bitnami/mediawiki",
              "type": "chart",
              "attributes": {
                  "name": "mediawiki",
                  "repo": {
                      "name": "bitnami",
                      "url": "https://charts.bitnami.com/bitnami"
                  },
                  "description": "Extremely powerful, scalable software and a feature-rich wiki implementation that uses PHP to process and display data stored in a database.",
                  "home": "http://www.mediawiki.org/",
                  "keywords": [
                      "mediawiki",
                      "wiki",
                      "http",
                      "web",
                      "application",
                      "php"
                  ],
                  "maintainers": [
                      {
                          "name": "Bitnami",
                          "email": "containers@bitnami.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/bitnami/bitnami-docker-mediawiki"
                  ],
                  "icon": "/v1/assets/bitnami/mediawiki/logo"
              },
              "links": {
                  "self": "/v1/charts/bitnami/mediawiki"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "8.2.9",
                          "app_version": "1.33.1",
                          "created": "2019-11-06T09:38:39.645Z",
                          "digest": "cae0efc45a2f15ef249a008d4b4394ff75f31c4f8ec3bfc4232e4133de66577a",
                          "urls": [
                              "https://charts.bitnami.com/bitnami/mediawiki-8.2.9.tgz"
                          ],
                          "readme": "/v1/assets/bitnami/mediawiki/versions/8.2.9/README.md",
                          "values": "/v1/assets/bitnami/mediawiki/versions/8.2.9/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/bitnami/mediawiki/versions/8.2.9"
                      }
                  }
              }
          },
          {
              "id": "bitnami/memcached",
              "type": "chart",
              "attributes": {
                  "name": "memcached",
                  "repo": {
                      "name": "bitnami",
                      "url": "https://charts.bitnami.com/bitnami"
                  },
                  "description": "Chart for Memcached",
                  "home": "http://memcached.org/",
                  "keywords": [
                      "memcached",
                      "cache"
                  ],
                  "maintainers": [
                      {
                          "name": "Bitnami",
                          "email": "containers@bitnami.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/bitnami/bitnami-docker-memcached"
                  ],
                  "icon": "/v1/assets/bitnami/memcached/logo"
              },
              "links": {
                  "self": "/v1/charts/bitnami/memcached"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "3.0.8",
                          "app_version": "1.5.19",
                          "created": "2019-11-06T09:38:39.645Z",
                          "digest": "408936385c1f126ef6b14243ac0b7ca63af0f2137279f0a6ea7b097c61ba25fe",
                          "urls": [
                              "https://charts.bitnami.com/bitnami/memcached-3.0.8.tgz"
                          ],
                          "readme": "/v1/assets/bitnami/memcached/versions/3.0.8/README.md",
                          "values": "/v1/assets/bitnami/memcached/versions/3.0.8/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/bitnami/memcached/versions/3.0.8"
                      }
                  }
              }
          },
          {
              "id": "stable/memcached",
              "type": "chart",
              "attributes": {
                  "name": "memcached",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Free & open source, high-performance, distributed memory object caching system.",
                  "home": "http://memcached.org/",
                  "keywords": [
                      "memcached",
                      "cache"
                  ],
                  "maintainers": [
                      {
                          "name": "gtaylor",
                          "email": "gtaylor@gc-taylor.com"
                      },
                      {
                          "name": "olemarkus",
                          "email": "o.with@sportradar.com"
                      },
                      {
                          "name": "kennethaasan",
                          "email": "k.aasan@sportradar.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/docker-library/memcached"
                  ],
                  "icon": "/v1/assets/stable/memcached/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/memcached"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "3.1.0",
                          "app_version": "1.5.19",
                          "created": "2019-11-06T08:58:33.691Z",
                          "digest": "2828492349c0e480d730581f3ee3135eeeb8f20c3efa158c6e71f42a6ec3525a",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/memcached-3.1.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/memcached/versions/3.1.0/README.md",
                          "values": "/v1/assets/stable/memcached/versions/3.1.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/memcached/versions/3.1.0"
                      }
                  }
              }
          },
          {
              "id": "stable/mercure",
              "type": "chart",
              "attributes": {
                  "name": "mercure",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "The Mercure hub allows to push data updates using the Mercure protocol to web browsers and other HTTP clients in a convenient, fast, reliable and battery-efficient way",
                  "home": "https://mercure.rocks",
                  "keywords": [
                      "mercure",
                      "hub",
                      "push"
                  ],
                  "maintainers": [
                      {
                          "name": "dunglas",
                          "email": "dunglas+mercure@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/dunglas/mercure"
                  ],
                  "icon": "/v1/assets/stable/mercure/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/mercure"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.0.10",
                          "app_version": "0.6.0",
                          "created": "2019-11-06T08:58:33.691Z",
                          "digest": "121d6f03c42844162bc6de682d71e19db5879612f42355cdebb793f3971c7f54",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/mercure-1.0.10.tgz"
                          ],
                          "readme": "/v1/assets/stable/mercure/versions/1.0.10/README.md",
                          "values": "/v1/assets/stable/mercure/versions/1.0.10/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/mercure/versions/1.0.10"
                      }
                  }
              }
          },
          {
              "id": "stable/metabase",
              "type": "chart",
              "attributes": {
                  "name": "metabase",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "The easy, open source way for everyone in your company to ask questions and learn from data.",
                  "home": "http://www.metabase.com/",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "pmint93",
                          "email": "phamminhthanh69@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/metabase/metabase"
                  ],
                  "icon": "/v1/assets/stable/metabase/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/metabase"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.8.1",
                          "app_version": "v0.32.9",
                          "created": "2019-11-06T08:58:33.692Z",
                          "digest": "7cf064e92f212aa9cc1cf90c61c62ab97842a041de10441d53369f84ae56520f",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/metabase-0.8.1.tgz"
                          ],
                          "readme": "/v1/assets/stable/metabase/versions/0.8.1/README.md",
                          "values": "/v1/assets/stable/metabase/versions/0.8.1/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/metabase/versions/0.8.1"
                      }
                  }
              }
          },
          {
              "id": "stable/metallb",
              "type": "chart",
              "attributes": {
                  "name": "metallb",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "MetalLB is a load-balancer implementation for bare metal Kubernetes clusters",
                  "home": "https://metallb.universe.tf",
                  "keywords": [
                      "load-balancer",
                      "balancer",
                      "lb",
                      "bgp",
                      "arp",
                      "vrrp",
                      "vip"
                  ],
                  "maintainers": [
                      {
                          "name": "danderson",
                          "email": "dave@natulte.net"
                      }
                  ],
                  "sources": [],
                  "icon": "/v1/assets/stable/metallb/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/metallb"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.12.0",
                          "app_version": "0.8.1",
                          "created": "2019-11-06T08:58:33.692Z",
                          "digest": "5a6331d2f7f7aa4e453321cfc3136b67335ebcda65319d662eda5e5ea5872b6d",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/metallb-0.12.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/metallb/versions/0.12.0/README.md",
                          "values": "/v1/assets/stable/metallb/versions/0.12.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/metallb/versions/0.12.0"
                      }
                  }
              }
          },
          {
              "id": "stable/metricbeat",
              "type": "chart",
              "attributes": {
                  "name": "metricbeat",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "A Helm chart to collect Kubernetes logs with metricbeat",
                  "home": "https://www.elastic.co/products/beats/metricbeat",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "at-k",
                          "email": "atushi.k@gmail.com"
                      },
                      {
                          "name": "mumoshu",
                          "email": "ykuoka@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://www.elastic.co/guide/en/beats/metricbeat/current/index.html"
                  ],
                  "icon": "/v1/assets/stable/metricbeat/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/metricbeat"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.7.0",
                          "app_version": "6.7.0",
                          "created": "2019-11-06T08:58:33.692Z",
                          "digest": "ede6fa84636b4947e31c1f70ddc91594ee51eace76c85c867d3abc4f9b0db7be",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/metricbeat-1.7.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/metricbeat/versions/1.7.0/README.md",
                          "values": "/v1/assets/stable/metricbeat/versions/1.7.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/metricbeat/versions/1.7.0"
                      }
                  }
              }
          },
          {
              "id": "bitnami/metrics-server",
              "type": "chart",
              "attributes": {
                  "name": "metrics-server",
                  "repo": {
                      "name": "bitnami",
                      "url": "https://charts.bitnami.com/bitnami"
                  },
                  "description": "Metrics Server is a cluster-wide aggregator of resource usage data. Metrics Server collects metrics from the Summary API, exposed by Kubelet on each node.",
                  "home": "https://github.com/kubernetes-incubator/metrics-server",
                  "keywords": [
                      "metrics-server",
                      "cluster",
                      "metrics"
                  ],
                  "maintainers": [
                      {
                          "name": "Bitnami",
                          "email": "containers@bitnami.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/bitnami/bitnami-docker-metrics-server"
                  ],
                  "icon": "/v1/assets/bitnami/metrics-server/logo"
              },
              "links": {
                  "self": "/v1/charts/bitnami/metrics-server"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "3.2.6",
                          "app_version": "0.3.6",
                          "created": "2019-11-06T09:38:39.646Z",
                          "digest": "db5d77e5169cd73f65baa6b1b066d303035e53ee5dc51744f2762f041644ecfa",
                          "urls": [
                              "https://charts.bitnami.com/bitnami/metrics-server-3.2.6.tgz"
                          ],
                          "readme": "/v1/assets/bitnami/metrics-server/versions/3.2.6/README.md",
                          "values": "/v1/assets/bitnami/metrics-server/versions/3.2.6/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/bitnami/metrics-server/versions/3.2.6"
                      }
                  }
              }
          },
          {
              "id": "stable/metrics-server",
              "type": "chart",
              "attributes": {
                  "name": "metrics-server",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Metrics Server is a cluster-wide aggregator of resource usage data.",
                  "home": "https://github.com/kubernetes-incubator/metrics-server",
                  "keywords": [
                      "metrics-server"
                  ],
                  "maintainers": [
                      {
                          "name": "olemarkus",
                          "email": "o.with@sportradar.com"
                      },
                      {
                          "name": "kennethaasan",
                          "email": "k.aasan@sportradar.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/kubernetes-incubator/metrics-server"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/metrics-server"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "2.8.8",
                          "app_version": "0.3.5",
                          "created": "2019-11-06T08:58:33.693Z",
                          "digest": "444dcd54387f819372fb3b226b6a02b6e98ec6563faf31fcae0633c1f6ea623e",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/metrics-server-2.8.8.tgz"
                          ],
                          "readme": "/v1/assets/stable/metrics-server/versions/2.8.8/README.md",
                          "values": "/v1/assets/stable/metrics-server/versions/2.8.8/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/metrics-server/versions/2.8.8"
                      }
                  }
              }
          },
          {
              "id": "stable/minecraft",
              "type": "chart",
              "attributes": {
                  "name": "minecraft",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Minecraft server",
                  "home": "https://minecraft.net/",
                  "keywords": [
                      "game",
                      "server"
                  ],
                  "maintainers": [
                      {
                          "name": "gtaylor",
                          "email": "gtaylor@gc-taylor.com"
                      },
                      {
                          "name": "billimek",
                          "email": "jeff@billimek.com"
                      },
                      {
                          "name": "itzg",
                          "email": "itzgeoff@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://hub.docker.com/r/itzg/minecraft-server/~/dockerfile/",
                      "https://github.com/itzg/dockerfiles"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/minecraft"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.1.6",
                          "app_version": "1.14.4",
                          "created": "2019-11-06T08:58:33.694Z",
                          "digest": "7845c1929bc0771ee2defcc64a30fb8e3a4370c933f39b591980a190a703f16b",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/minecraft-1.1.6.tgz"
                          ],
                          "readme": "/v1/assets/stable/minecraft/versions/1.1.6/README.md",
                          "values": "/v1/assets/stable/minecraft/versions/1.1.6/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/minecraft/versions/1.1.6"
                      }
                  }
              }
          },
          {
              "id": "bitnami/minio",
              "type": "chart",
              "attributes": {
                  "name": "minio",
                  "repo": {
                      "name": "bitnami",
                      "url": "https://charts.bitnami.com/bitnami"
                  },
                  "description": "MinIO is an object storage server, compatible with Amazon S3 cloud storage service, mainly used for storing unstructured data (such as photos, videos, log files, etc.)",
                  "home": "https://min.io",
                  "keywords": [
                      "minio",
                      "storage",
                      "object-storage",
                      "s3",
                      "cluster"
                  ],
                  "maintainers": [
                      {
                          "name": "Bitnami",
                          "email": "containers@bitnami.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/bitnami/bitnami-docker-minio"
                  ],
                  "icon": "/v1/assets/bitnami/minio/logo"
              },
              "links": {
                  "self": "/v1/charts/bitnami/minio"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "2.1.2",
                          "app_version": "2019.10.12",
                          "created": "2019-11-06T09:38:39.647Z",
                          "digest": "69853136e43c82d3fe35878825e8e8da7f6ae7802b3c864aa89e7e26d5733128",
                          "urls": [
                              "https://charts.bitnami.com/bitnami/minio-2.1.2.tgz"
                          ],
                          "readme": "/v1/assets/bitnami/minio/versions/2.1.2/README.md",
                          "values": "/v1/assets/bitnami/minio/versions/2.1.2/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/bitnami/minio/versions/2.1.2"
                      }
                  }
              }
          },
          {
              "id": "stable/minio",
              "type": "chart",
              "attributes": {
                  "name": "minio",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "MinIO is a high performance distributed object storage server, designed for large-scale private cloud infrastructure.",
                  "home": "https://min.io",
                  "keywords": [
                      "storage",
                      "object-storage",
                      "S3"
                  ],
                  "maintainers": [
                      {
                          "name": "Acaleph",
                          "email": "hello@acale.ph"
                      },
                      {
                          "name": "Minio",
                          "email": "dev@minio.io"
                      }
                  ],
                  "sources": [
                      "https://github.com/minio/minio"
                  ],
                  "icon": "/v1/assets/stable/minio/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/minio"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "2.5.18",
                          "app_version": "RELEASE.2019-08-07T01-59-21Z",
                          "created": "2019-11-06T08:58:33.695Z",
                          "digest": "24a0688f160585ad4de1d31de87042e913a573f0f33b27915b8fd540c858e042",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/minio-2.5.18.tgz"
                          ],
                          "readme": "/v1/assets/stable/minio/versions/2.5.18/README.md",
                          "values": "/v1/assets/stable/minio/versions/2.5.18/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/minio/versions/2.5.18"
                      }
                  }
              }
          },
          {
              "id": "bitnami/mongodb",
              "type": "chart",
              "attributes": {
                  "name": "mongodb",
                  "repo": {
                      "name": "bitnami",
                      "url": "https://charts.bitnami.com/bitnami"
                  },
                  "description": "NoSQL document-oriented database that stores JSON-like documents with dynamic schemas, simplifying the integration of data in content-driven applications.",
                  "home": "https://mongodb.org",
                  "keywords": [
                      "mongodb",
                      "database",
                      "nosql",
                      "cluster",
                      "replicaset",
                      "replication"
                  ],
                  "maintainers": [
                      {
                          "name": "Bitnami",
                          "email": "containers@bitnami.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/bitnami/bitnami-docker-mongodb"
                  ],
                  "icon": "/v1/assets/bitnami/mongodb/logo"
              },
              "links": {
                  "self": "/v1/charts/bitnami/mongodb"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "7.4.4",
                          "app_version": "4.0.13",
                          "created": "2019-11-06T09:38:39.648Z",
                          "digest": "5f16c6c20695cd24cfe548b1eda3aaad21a1cbeb354884f1e7f944228c1df503",
                          "urls": [
                              "https://charts.bitnami.com/bitnami/mongodb-7.4.4.tgz"
                          ],
                          "readme": "/v1/assets/bitnami/mongodb/versions/7.4.4/README.md",
                          "values": "/v1/assets/bitnami/mongodb/versions/7.4.4/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/bitnami/mongodb/versions/7.4.4"
                      }
                  }
              }
          },
          {
              "id": "incubator/mongodb",
              "type": "chart",
              "attributes": {
                  "name": "mongodb",
                  "repo": {
                      "name": "incubator",
                      "url": "https://kubernetes-charts-incubator.storage.googleapis.com"
                  },
                  "description": "MongoDB Helm chart for Kubernetes.",
                  "home": "https://github.com/mongodb/mongo",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "Anirudh Ramanathan",
                          "email": "ramanathana@google.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/mongodb/mongo"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/incubator/mongodb"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.1.1",
                          "app_version": "",
                          "created": "2016-11-21T23:48:26.699Z",
                          "digest": "84786f63f1bf590add776eac05afcba3dac9c79f78b7efb5676d20e13228602d",
                          "urls": [
                              "https://kubernetes-charts-incubator.storage.googleapis.com/mongodb-0.1.1.tgz"
                          ],
                          "readme": "/v1/assets/incubator/mongodb/versions/0.1.1/README.md",
                          "values": "/v1/assets/incubator/mongodb/versions/0.1.1/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/incubator/mongodb/versions/0.1.1"
                      }
                  }
              }
          },
          {
              "id": "stable/mongodb-replicaset",
              "type": "chart",
              "attributes": {
                  "name": "mongodb-replicaset",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "NoSQL document-oriented database that stores JSON-like documents with dynamic schemas, simplifying the integration of data in content-driven applications.",
                  "home": "https://github.com/mongodb/mongo",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "unguiculus",
                          "email": "unguiculus@gmail.com"
                      },
                      {
                          "name": "steven-sheehy",
                          "email": "ssheehy@firescope.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/mongodb/mongo",
                      "https://github.com/percona/mongodb_exporter"
                  ],
                  "icon": "/v1/assets/stable/mongodb-replicaset/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/mongodb-replicaset"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "3.10.1",
                          "app_version": "3.6",
                          "created": "2019-11-06T08:58:33.699Z",
                          "digest": "8e521d93e436d411a80243c51a01b0adcd46a240816afa93dee53b07c235200e",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/mongodb-replicaset-3.10.1.tgz"
                          ],
                          "readme": "/v1/assets/stable/mongodb-replicaset/versions/3.10.1/README.md",
                          "values": "/v1/assets/stable/mongodb-replicaset/versions/3.10.1/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/mongodb-replicaset/versions/3.10.1"
                      }
                  }
              }
          },
          {
              "id": "incubator/mongodb-replicaset",
              "type": "chart",
              "attributes": {
                  "name": "mongodb-replicaset",
                  "repo": {
                      "name": "incubator",
                      "url": "https://kubernetes-charts-incubator.storage.googleapis.com"
                  },
                  "description": "NoSQL document-oriented database that stores JSON-like documents with dynamic schemas, simplifying the integration of data in content-driven applications.",
                  "home": "https://github.com/mongodb/mongo",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "Anirudh Ramanathan",
                          "email": "ramanathana@google.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/mongodb/mongo"
                  ],
                  "icon": "/v1/assets/incubator/mongodb-replicaset/logo"
              },
              "links": {
                  "self": "/v1/charts/incubator/mongodb-replicaset"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.2.0",
                          "app_version": "",
                          "created": "2017-04-19T00:03:38.236Z",
                          "digest": "87c1e19c78361151ba697a90320b008f0378afa4993e521c4bc88f355ca25d2c",
                          "urls": [
                              "https://kubernetes-charts-incubator.storage.googleapis.com/mongodb-replicaset-0.2.0.tgz"
                          ],
                          "readme": "/v1/assets/incubator/mongodb-replicaset/versions/0.2.0/README.md",
                          "values": "/v1/assets/incubator/mongodb-replicaset/versions/0.2.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/incubator/mongodb-replicaset/versions/0.2.0"
                      }
                  }
              }
          },
          {
              "id": "bitnami/moodle",
              "type": "chart",
              "attributes": {
                  "name": "moodle",
                  "repo": {
                      "name": "bitnami",
                      "url": "https://charts.bitnami.com/bitnami"
                  },
                  "description": "Moodle is a learning platform designed to provide educators, administrators and learners with a single robust, secure and integrated system to create personalised learning environments",
                  "home": "http://www.moodle.org/",
                  "keywords": [
                      "moodle",
                      "learning",
                      "php"
                  ],
                  "maintainers": [
                      {
                          "name": "Bitnami",
                          "email": "containers@bitnami.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/bitnami/bitnami-docker-moodle"
                  ],
                  "icon": "/v1/assets/bitnami/moodle/logo"
              },
              "links": {
                  "self": "/v1/charts/bitnami/moodle"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "6.1.13",
                          "app_version": "3.7.2",
                          "created": "2019-11-06T09:38:39.651Z",
                          "digest": "4cd8b7e1f9a2c6b34de9a53033d103d5c69c7c88f37e9f408d27cd1d3533494d",
                          "urls": [
                              "https://charts.bitnami.com/bitnami/moodle-6.1.13.tgz"
                          ],
                          "readme": "/v1/assets/bitnami/moodle/versions/6.1.13/README.md",
                          "values": "/v1/assets/bitnami/moodle/versions/6.1.13/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/bitnami/moodle/versions/6.1.13"
                      }
                  }
              }
          },
          {
              "id": "stable/msoms",
              "type": "chart",
              "attributes": {
                  "name": "msoms",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "A chart for deploying omsagent as a daemonset Kubernetes",
                  "home": "https://azure.microsoft.com/en-us/services/log-analytics/",
                  "keywords": [
                      "monitoring",
                      "alerting",
                      "metric",
                      "event",
                      "logging"
                  ],
                  "maintainers": [
                      {
                          "name": "Sambit Mishra",
                          "email": "samis@microsoft.com"
                      },
                      {
                          "name": "Keiko Harada",
                          "email": "keikhara@microsoft.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/Microsoft/OMS-docker",
                      "https://github.com/Microsoft/OMS-Agent-for-Linux",
                      "https://github.com/Microsoft/Docker-Provider"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/msoms"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.2.0",
                          "app_version": "1.0.0-30",
                          "created": "2019-11-06T08:58:33.701Z",
                          "digest": "03b0e333b078b43c02bc07076e869335e448261b25baf278d03b3b432b3fb00b",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/msoms-0.2.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/msoms/versions/0.2.0/README.md",
                          "values": "/v1/assets/stable/msoms/versions/0.2.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/msoms/versions/0.2.0"
                      }
                  }
              }
          },
          {
              "id": "stable/mssql-linux",
              "type": "chart",
              "attributes": {
                  "name": "mssql-linux",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "SQL Server 2017 Linux Helm Chart",
                  "home": "https://hub.docker.com/r/microsoft/mssql-server-linux/",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "thomasliddledba",
                          "email": "tliddle30@gmail.com"
                      },
                      {
                          "name": "winromulus",
                          "email": "winromulus@winromulus.com"
                      }
                  ],
                  "sources": [
                      "https://hub.docker.com/r/microsoft/mssql-server-linux/"
                  ],
                  "icon": "/v1/assets/stable/mssql-linux/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/mssql-linux"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.10.1",
                          "app_version": "14.0.3023.8",
                          "created": "2019-11-06T08:58:33.702Z",
                          "digest": "f29bcd54a40cc25229b88e975a714daa57e5500cdc951467d66fbeedfd6b261f",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/mssql-linux-0.10.1.tgz"
                          ],
                          "readme": "/v1/assets/stable/mssql-linux/versions/0.10.1/README.md",
                          "values": "/v1/assets/stable/mssql-linux/versions/0.10.1/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/mssql-linux/versions/0.10.1"
                      }
                  }
              }
          },
          {
              "id": "bitnami/mxnet",
              "type": "chart",
              "attributes": {
                  "name": "mxnet",
                  "repo": {
                      "name": "bitnami",
                      "url": "https://charts.bitnami.com/bitnami"
                  },
                  "description": "A flexible and efficient library for deep learning",
                  "home": "https://mxnet.apache.org/",
                  "keywords": [
                      "mxnet",
                      "python",
                      "machine",
                      "learning"
                  ],
                  "maintainers": [
                      {
                          "name": "Bitnami",
                          "email": "containers@bitnami.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/bitnami/bitnami-docker-mxnet"
                  ],
                  "icon": "/v1/assets/bitnami/mxnet/logo"
              },
              "links": {
                  "self": "/v1/charts/bitnami/mxnet"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.3.11",
                          "app_version": "1.5.1",
                          "created": "2019-11-06T09:38:39.652Z",
                          "digest": "6f86b4097ced75307ff53a3201cbe17c796890a5fe8e8f3916e1b70aca069e2d",
                          "urls": [
                              "https://charts.bitnami.com/bitnami/mxnet-1.3.11.tgz"
                          ],
                          "readme": "/v1/assets/bitnami/mxnet/versions/1.3.11/README.md",
                          "values": "/v1/assets/bitnami/mxnet/versions/1.3.11/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/bitnami/mxnet/versions/1.3.11"
                      }
                  }
              }
          },
          {
              "id": "stable/mysql",
              "type": "chart",
              "attributes": {
                  "name": "mysql",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Fast, reliable, scalable, and easy to use open-source relational database system.",
                  "home": "https://www.mysql.com/",
                  "keywords": [
                      "mysql",
                      "database",
                      "sql"
                  ],
                  "maintainers": [
                      {
                          "name": "olemarkus",
                          "email": "o.with@sportradar.com"
                      },
                      {
                          "name": "viglesiasce",
                          "email": "viglesias@google.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/kubernetes/charts",
                      "https://github.com/docker-library/mysql"
                  ],
                  "icon": "/v1/assets/stable/mysql/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/mysql"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.4.0",
                          "app_version": "5.7.27",
                          "created": "2019-11-06T08:58:33.703Z",
                          "digest": "935e482f45a1f45d78ea8bfbe4883158b92ba84efba396789de493537503325a",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/mysql-1.4.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/mysql/versions/1.4.0/README.md",
                          "values": "/v1/assets/stable/mysql/versions/1.4.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/mysql/versions/1.4.0"
                      }
                  }
              }
          },
          {
              "id": "bitnami/mysql",
              "type": "chart",
              "attributes": {
                  "name": "mysql",
                  "repo": {
                      "name": "bitnami",
                      "url": "https://charts.bitnami.com/bitnami"
                  },
                  "description": "Chart to create a Highly available MySQL cluster",
                  "home": "https://mysql.com",
                  "keywords": [
                      "mysql",
                      "database",
                      "sql",
                      "cluster",
                      "high availablity"
                  ],
                  "maintainers": [
                      {
                          "name": "Bitnami",
                          "email": "containers@bitnami.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/bitnami/bitnami-docker-mysql"
                  ],
                  "icon": "/v1/assets/bitnami/mysql/logo"
              },
              "links": {
                  "self": "/v1/charts/bitnami/mysql"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "6.5.0",
                          "app_version": "8.0.18",
                          "created": "2019-11-06T09:38:39.654Z",
                          "digest": "b303ae02b668fcf8ded2baf9313e37bccd26e834bdb42cd022b58c48d16149b4",
                          "urls": [
                              "https://charts.bitnami.com/bitnami/mysql-6.5.0.tgz"
                          ],
                          "readme": "/v1/assets/bitnami/mysql/versions/6.5.0/README.md",
                          "values": "/v1/assets/bitnami/mysql/versions/6.5.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/bitnami/mysql/versions/6.5.0"
                      }
                  }
              }
          },
          {
              "id": "stable/mysqldump",
              "type": "chart",
              "attributes": {
                  "name": "mysqldump",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "A Helm chart to help backup MySQL databases using mysqldump",
                  "home": "https://www.mysql.com/",
                  "keywords": [
                      "mysql",
                      "mysqldump",
                      "backup"
                  ],
                  "maintainers": [
                      {
                          "name": "paulczar",
                          "email": "username.taken@gmail.com"
                      },
                      {
                          "name": "monotek",
                          "email": "monotek23@gmail.com"
                      },
                      {
                          "name": "axdotl",
                          "email": "axel.koehler@kiwigrid.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/kubernetes/charts",
                      "https://dev.mysql.com/doc/refman/5.7/en/mysqldump.html"
                  ],
                  "icon": "/v1/assets/stable/mysqldump/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/mysqldump"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "2.6.0",
                          "app_version": "2.4.1",
                          "created": "2019-11-06T08:58:33.704Z",
                          "digest": "a73e30e44290774dbbac080179ab6de4932ac46b2f227f1867b7134f01141f14",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/mysqldump-2.6.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/mysqldump/versions/2.6.0/README.md",
                          "values": "/v1/assets/stable/mysqldump/versions/2.6.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/mysqldump/versions/2.6.0"
                      }
                  }
              }
          },
          {
              "id": "incubator/mysqlha",
              "type": "chart",
              "attributes": {
                  "name": "mysqlha",
                  "repo": {
                      "name": "incubator",
                      "url": "https://kubernetes-charts-incubator.storage.googleapis.com"
                  },
                  "description": "MySQL cluster with a single master and zero or more slave replicas",
                  "home": "https://www.mysql.com/",
                  "keywords": [
                      "mysql",
                      "database",
                      "sql"
                  ],
                  "maintainers": [
                      {
                          "name": "jpoon",
                          "email": "helmchart-mysql@jasonpoon.ca"
                      },
                      {
                          "name": "aisuko",
                          "email": "urakiny@gmail.com"
                      }
                  ],
                  "sources": [],
                  "icon": "/v1/assets/incubator/mysqlha/logo"
              },
              "links": {
                  "self": "/v1/charts/incubator/mysqlha"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.0.0",
                          "app_version": "5.7.13",
                          "created": "2019-11-06T09:29:02.014Z",
                          "digest": "35821b09659ce7717df0c15615fed7d088d51890666fe775c49732ef45b80d0f",
                          "urls": [
                              "https://kubernetes-charts-incubator.storage.googleapis.com/mysqlha-1.0.0.tgz"
                          ],
                          "readme": "/v1/assets/incubator/mysqlha/versions/1.0.0/README.md",
                          "values": "/v1/assets/incubator/mysqlha/versions/1.0.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/incubator/mysqlha/versions/1.0.0"
                      }
                  }
              }
          },
          {
              "id": "stable/namerd",
              "type": "chart",
              "attributes": {
                  "name": "namerd",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Service that manages routing for multiple linkerd instances",
                  "home": "https://linkerd.io/in-depth/namerd/",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "Sean Knox",
                          "email": "knoxville@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/linkerd/linkerd"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/namerd"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.2.0",
                          "app_version": "",
                          "created": "2019-11-06T08:58:33.704Z",
                          "digest": "214695248888046a6ef074cc373b27b0fc828fdd9d984a69f6c5a676ed910745",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/namerd-0.2.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/namerd/versions/0.2.0/README.md",
                          "values": "/v1/assets/stable/namerd/versions/0.2.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/namerd/versions/0.2.0"
                      }
                  }
              }
          },
          {
              "id": "bitnami/nats",
              "type": "chart",
              "attributes": {
                  "name": "nats",
                  "repo": {
                      "name": "bitnami",
                      "url": "https://charts.bitnami.com/bitnami"
                  },
                  "description": "An open-source, cloud-native messaging system",
                  "home": "https://nats.io/",
                  "keywords": [
                      "nats",
                      "messaging",
                      "addressing",
                      "discovery"
                  ],
                  "maintainers": [
                      {
                          "name": "Bitnami",
                          "email": "containers@bitnami.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/bitnami/bitnami-docker-nats"
                  ],
                  "icon": "/v1/assets/bitnami/nats/logo"
              },
              "links": {
                  "self": "/v1/charts/bitnami/nats"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "4.2.6",
                          "app_version": "2.1.0",
                          "created": "2019-11-06T09:38:39.656Z",
                          "digest": "4c422f8987ed1447c7cdf867cdb4213b3b10c85c77c1c1e29136d88ed4ab8d8e",
                          "urls": [
                              "https://charts.bitnami.com/bitnami/nats-4.2.6.tgz"
                          ],
                          "readme": "/v1/assets/bitnami/nats/versions/4.2.6/README.md",
                          "values": "/v1/assets/bitnami/nats/versions/4.2.6/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/bitnami/nats/versions/4.2.6"
                      }
                  }
              }
          },
          {
              "id": "incubator/neo4j",
              "type": "chart",
              "attributes": {
                  "name": "neo4j",
                  "repo": {
                      "name": "incubator",
                      "url": "https://kubernetes-charts-incubator.storage.googleapis.com"
                  },
                  "description": "Neo4j is the world's leading graph database",
                  "home": "https://www.neo4j.com",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "mneedham",
                          "email": "mark.needham@neo4j.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/neo4j/neo4j",
                      "https://github.com/neo4j/docker-neo4j",
                      "https://github.com/mneedham/k8s-kubectl"
                  ],
                  "icon": "/v1/assets/incubator/neo4j/logo"
              },
              "links": {
                  "self": "/v1/charts/incubator/neo4j"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.3.0",
                          "app_version": "3.2.3",
                          "created": "2017-11-20T17:34:07.355Z",
                          "digest": "7a6c24720f4bb610dba41f31346aa6077cb46de6f859723a0699313a8880598b",
                          "urls": [
                              "https://kubernetes-charts-incubator.storage.googleapis.com/neo4j-0.3.0.tgz"
                          ],
                          "readme": "/v1/assets/incubator/neo4j/versions/0.3.0/README.md",
                          "values": "/v1/assets/incubator/neo4j/versions/0.3.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/incubator/neo4j/versions/0.3.0"
                      }
                  }
              }
          },
          {
              "id": "stable/neo4j",
              "type": "chart",
              "attributes": {
                  "name": "neo4j",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Neo4j is the world's leading graph database",
                  "home": "https://www.neo4j.com",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "mneedham",
                          "email": "mark.needham@neo4j.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/neo4j/neo4j",
                      "https://github.com/neo4j/docker-neo4j",
                      "https://github.com/mneedham/k8s-kubectl"
                  ],
                  "icon": "/v1/assets/stable/neo4j/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/neo4j"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.2.1",
                          "app_version": "3.4.5",
                          "created": "2019-11-06T08:58:33.706Z",
                          "digest": "7c6564ad928807222c6e6cd0666dd4308fc28c13d03b8f66cfde0222056ffbae",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/neo4j-1.2.1.tgz"
                          ],
                          "readme": "/v1/assets/stable/neo4j/versions/1.2.1/README.md",
                          "values": "/v1/assets/stable/neo4j/versions/1.2.1/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/neo4j/versions/1.2.1"
                      }
                  }
              }
          },
          {
              "id": "stable/newrelic-infrastructure",
              "type": "chart",
              "attributes": {
                  "name": "newrelic-infrastructure",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "A Helm chart to deploy the New Relic Infrastructure Agent as a DaemonSet",
                  "home": "https://hub.docker.com/r/newrelic/infrastructure-k8s/",
                  "keywords": [
                      "infrastructure",
                      "newrelic",
                      "monitoring"
                  ],
                  "maintainers": [
                      {
                          "name": "rk295",
                          "email": "robin@kearney.co.uk"
                      },
                      {
                          "name": "jfjoly",
                          "email": "jjoly@newrelic.com"
                      },
                      {
                          "name": "smoya"
                      },
                      {
                          "name": "areina"
                      },
                      {
                          "name": "douglascamata"
                      },
                      {
                          "name": "rk295"
                      }
                  ],
                  "sources": [],
                  "icon": "/v1/assets/stable/newrelic-infrastructure/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/newrelic-infrastructure"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.13.12",
                          "app_version": "1.10.2",
                          "created": "2019-11-06T08:58:33.707Z",
                          "digest": "135d38dd0d99d8ea40127d2be10a25b7e5e61f7fe288046cc1d4adfe1cd5d8c5",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/newrelic-infrastructure-0.13.12.tgz"
                          ],
                          "readme": "/v1/assets/stable/newrelic-infrastructure/versions/0.13.12/README.md",
                          "values": "/v1/assets/stable/newrelic-infrastructure/versions/0.13.12/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/newrelic-infrastructure/versions/0.13.12"
                      }
                  }
              }
          },
          {
              "id": "stable/nextcloud",
              "type": "chart",
              "attributes": {
                  "name": "nextcloud",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "A file sharing server that puts the control and security of your own data back into your hands.",
                  "home": "https://nextcloud.com/",
                  "keywords": [
                      "nextcloud",
                      "storage",
                      "http",
                      "web",
                      "php"
                  ],
                  "maintainers": [
                      {
                          "name": "chrisingenhaag",
                          "email": "christian.ingenhaag@googlemail.com"
                      },
                      {
                          "name": "billimek",
                          "email": "jeff@billimek.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/nextcloud/docker"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/nextcloud"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.8.0",
                          "app_version": "17.0.0",
                          "created": "2019-11-06T08:58:33.711Z",
                          "digest": "4063147ee1febe49d86163905c47c9d6b49a48b38cfffe9cbf94a1b8f974b7c3",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/nextcloud-1.8.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/nextcloud/versions/1.8.0/README.md",
                          "values": "/v1/assets/stable/nextcloud/versions/1.8.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/nextcloud/versions/1.8.0"
                      }
                  }
              }
          },
          {
              "id": "stable/nfs-client-provisioner",
              "type": "chart",
              "attributes": {
                  "name": "nfs-client-provisioner",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "nfs-client is an automatic provisioner that used your *already configured* NFS server, automatically creating Persistent Volumes.",
                  "home": "https://github.com/kubernetes-incubator/external-storage/tree/master/nfs-client",
                  "keywords": [
                      "nfs",
                      "storage"
                  ],
                  "maintainers": [
                      {
                          "name": "verwilst",
                          "email": "bart@verwilst.be"
                      }
                  ],
                  "sources": [
                      "https://github.com/kubernetes-incubator/external-storage/tree/master/nfs-client"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/nfs-client-provisioner"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.2.8",
                          "app_version": "3.1.0",
                          "created": "2019-11-06T08:58:33.711Z",
                          "digest": "20fd7e3ca893656cf1e36d0f76451984bf4e3f937384e7f3de5d6a8eaf0e5b7d",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/nfs-client-provisioner-1.2.8.tgz"
                          ],
                          "readme": "/v1/assets/stable/nfs-client-provisioner/versions/1.2.8/README.md",
                          "values": "/v1/assets/stable/nfs-client-provisioner/versions/1.2.8/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/nfs-client-provisioner/versions/1.2.8"
                      }
                  }
              }
          },
          {
              "id": "stable/nfs-server-provisioner",
              "type": "chart",
              "attributes": {
                  "name": "nfs-server-provisioner",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "nfs-server-provisioner is an out-of-tree dynamic provisioner for Kubernetes. You can use it to quickly & easily deploy shared storage that works almost anywhere.",
                  "home": "https://github.com/kubernetes/charts/tree/master/stable/nfs-server-provisioner",
                  "keywords": [
                      "nfs",
                      "storage"
                  ],
                  "maintainers": [
                      {
                          "name": "kiall",
                          "email": "kiall@macinnes.ie"
                      },
                      {
                          "name": "joaocc",
                          "email": "joaocc-dev@live.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/kubernetes-incubator/external-storage/tree/master/nfs"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/nfs-server-provisioner"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.3.1",
                          "app_version": "2.2.1-k8s1.12",
                          "created": "2019-11-06T08:58:33.712Z",
                          "digest": "1a4335f89863b4ff8bfcb099c1acffb87475b78259b5af211e06ea0654d71b18",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/nfs-server-provisioner-0.3.1.tgz"
                          ],
                          "readme": "/v1/assets/stable/nfs-server-provisioner/versions/0.3.1/README.md",
                          "values": "/v1/assets/stable/nfs-server-provisioner/versions/0.3.1/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/nfs-server-provisioner/versions/0.3.1"
                      }
                  }
              }
          },
          {
              "id": "bitnami/nginx",
              "type": "chart",
              "attributes": {
                  "name": "nginx",
                  "repo": {
                      "name": "bitnami",
                      "url": "https://charts.bitnami.com/bitnami"
                  },
                  "description": "Chart for the nginx server",
                  "home": "http://www.nginx.org",
                  "keywords": [
                      "nginx",
                      "http",
                      "web",
                      "www",
                      "reverse proxy"
                  ],
                  "maintainers": [
                      {
                          "name": "Bitnami",
                          "email": "containers@bitnami.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/bitnami/bitnami-docker-nginx"
                  ],
                  "icon": "/v1/assets/bitnami/nginx/logo"
              },
              "links": {
                  "self": "/v1/charts/bitnami/nginx"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "4.3.12",
                          "app_version": "1.16.1",
                          "created": "2019-11-06T09:38:39.657Z",
                          "digest": "ab6173ae47612a0e437565b3e8bb6cf0af1fe7156f4f7c930e1867f36f4dbf00",
                          "urls": [
                              "https://charts.bitnami.com/bitnami/nginx-4.3.12.tgz"
                          ],
                          "readme": "/v1/assets/bitnami/nginx/versions/4.3.12/README.md",
                          "values": "/v1/assets/bitnami/nginx/versions/4.3.12/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/bitnami/nginx/versions/4.3.12"
                      }
                  }
              }
          },
          {
              "id": "stable/nginx-ingress",
              "type": "chart",
              "attributes": {
                  "name": "nginx-ingress",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "An nginx Ingress controller that uses ConfigMap to store the nginx configuration.",
                  "home": "https://github.com/kubernetes/ingress-nginx",
                  "keywords": [
                      "ingress",
                      "nginx"
                  ],
                  "maintainers": [
                      {
                          "name": "ChiefAlexander"
                      },
                      {
                          "name": "taharah",
                          "email": "Trevor.G.Wood@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/kubernetes/ingress-nginx"
                  ],
                  "icon": "/v1/assets/stable/nginx-ingress/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/nginx-ingress"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.24.6",
                          "app_version": "0.26.1",
                          "created": "2019-11-06T08:58:33.714Z",
                          "digest": "15446e26c642976f56993b34959cb75988a4bd74b65e0565c9564e381c5c86ad",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/nginx-ingress-1.24.6.tgz"
                          ],
                          "readme": "/v1/assets/stable/nginx-ingress/versions/1.24.6/README.md",
                          "values": "/v1/assets/stable/nginx-ingress/versions/1.24.6/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/nginx-ingress/versions/1.24.6"
                      }
                  }
              }
          },
          {
              "id": "bitnami/nginx-ingress-controller",
              "type": "chart",
              "attributes": {
                  "name": "nginx-ingress-controller",
                  "repo": {
                      "name": "bitnami",
                      "url": "https://charts.bitnami.com/bitnami"
                  },
                  "description": "Chart for the nginx Ingress controller",
                  "home": "https://github.com/kubernetes/ingress-nginx",
                  "keywords": [
                      "ingress",
                      "nginx",
                      "http",
                      "web",
                      "www",
                      "reverse proxy"
                  ],
                  "maintainers": [
                      {
                          "name": "Bitnami",
                          "email": "containers@bitnami.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/bitnami/bitnami-docker-nginx-ingress-controller"
                  ],
                  "icon": "/v1/assets/bitnami/nginx-ingress-controller/logo"
              },
              "links": {
                  "self": "/v1/charts/bitnami/nginx-ingress-controller"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "5.0.10",
                          "app_version": "0.26.1",
                          "created": "2019-11-06T09:38:39.659Z",
                          "digest": "0e2bf5b9fdbcd446a8280e4711178972e1531fe9c311434679990635094214f7",
                          "urls": [
                              "https://charts.bitnami.com/bitnami/nginx-ingress-controller-5.0.10.tgz"
                          ],
                          "readme": "/v1/assets/bitnami/nginx-ingress-controller/versions/5.0.10/README.md",
                          "values": "/v1/assets/bitnami/nginx-ingress-controller/versions/5.0.10/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/bitnami/nginx-ingress-controller/versions/5.0.10"
                      }
                  }
              }
          },
          {
              "id": "stable/nginx-ldapauth-proxy",
              "type": "chart",
              "attributes": {
                  "name": "nginx-ldapauth-proxy",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "nginx proxy with ldapauth",
                  "home": "https://github.com/nginxinc/nginx-ldap-auth",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "rendhalver",
                          "email": "pete.brown@powerhrg.com"
                      },
                      {
                          "name": "jar361",
                          "email": "jrodgers@powerhrg.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/dweomer/dockerfiles-nginx-auth-ldap",
                      "https://github.com/kvspb/nginx-auth-ldap"
                  ],
                  "icon": "/v1/assets/stable/nginx-ldapauth-proxy/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/nginx-ldapauth-proxy"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.1.3",
                          "app_version": "1.13.5",
                          "created": "2019-11-06T08:58:33.714Z",
                          "digest": "9e5f587d9066ae43a469316aaa0d60d185bc230938040d126f1056a6c1167b1e",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/nginx-ldapauth-proxy-0.1.3.tgz"
                          ],
                          "readme": "/v1/assets/stable/nginx-ldapauth-proxy/versions/0.1.3/README.md",
                          "values": "/v1/assets/stable/nginx-ldapauth-proxy/versions/0.1.3/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/nginx-ldapauth-proxy/versions/0.1.3"
                      }
                  }
              }
          },
          {
              "id": "bitnami/node",
              "type": "chart",
              "attributes": {
                  "name": "node",
                  "repo": {
                      "name": "bitnami",
                      "url": "https://charts.bitnami.com/bitnami"
                  },
                  "description": "Event-driven I/O server-side JavaScript environment based on V8",
                  "home": "http://nodejs.org/",
                  "keywords": [
                      "node",
                      "javascript",
                      "nodejs",
                      "git"
                  ],
                  "maintainers": [
                      {
                          "name": "Bitnami",
                          "email": "containers@bitnami.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/bitnami/bitnami-docker-node"
                  ],
                  "icon": "/v1/assets/bitnami/node/logo"
              },
              "links": {
                  "self": "/v1/charts/bitnami/node"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "11.2.10",
                          "app_version": "10.17.0",
                          "created": "2019-11-06T09:38:39.662Z",
                          "digest": "9a71a7ada7a9f358455ac4b212528cff17e5ff1d35c02206f6ed9785d85c06a0",
                          "urls": [
                              "https://charts.bitnami.com/bitnami/node-11.2.10.tgz"
                          ],
                          "readme": "/v1/assets/bitnami/node/versions/11.2.10/README.md",
                          "values": "/v1/assets/bitnami/node/versions/11.2.10/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/bitnami/node/versions/11.2.10"
                      }
                  }
              }
          },
          {
              "id": "stable/node-problem-detector",
              "type": "chart",
              "attributes": {
                  "name": "node-problem-detector",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Installs the node-problem-detector daemonset for monitoring extra attributes on nodes",
                  "home": "https://github.com/kubernetes/node-problem-detector",
                  "keywords": [
                      "node",
                      "problem",
                      "detector",
                      "monitoring"
                  ],
                  "maintainers": [
                      {
                          "name": "max-rocket-internet",
                          "email": "max.williams@deliveryhero.com"
                      },
                      {
                          "name": "Random-Liu",
                          "email": "lantaol@google.com"
                      },
                      {
                          "name": "andyxning",
                          "email": "andy.xning@gmail.com"
                      },
                      {
                          "name": "wangzhen127",
                          "email": "zhenw@google.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/kubernetes/charts/stable/node-problem-detector",
                      "https://github.com/kubernetes/node-problem-detector",
                      "https://kubernetes.io/docs/concepts/architecture/nodes/#condition"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/node-problem-detector"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.6.1",
                          "app_version": "v0.7.0",
                          "created": "2019-11-06T08:58:33.716Z",
                          "digest": "0b5bf6faa24772305297cb7bf1e245694ad8de3d45835a93bf9d13a26de0226a",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/node-problem-detector-1.6.1.tgz"
                          ],
                          "readme": "/v1/assets/stable/node-problem-detector/versions/1.6.1/README.md",
                          "values": "/v1/assets/stable/node-problem-detector/versions/1.6.1/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/node-problem-detector/versions/1.6.1"
                      }
                  }
              }
          },
          {
              "id": "stable/node-red",
              "type": "chart",
              "attributes": {
                  "name": "node-red",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Node-RED is low-code programming for event-driven applications",
                  "home": "https://github.com/node-red/node-red-docker",
                  "keywords": [
                      "nodered",
                      "node-red"
                  ],
                  "maintainers": [
                      {
                          "name": "billimek",
                          "email": "jeff@billimek.com"
                      },
                      {
                          "name": "batazor",
                          "email": "batazor111@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/node-red/node-red-docker",
                      "https://github.com/kubernetes/charts/stable/node-red"
                  ],
                  "icon": "/v1/assets/stable/node-red/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/node-red"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.4.0",
                          "app_version": "1.0.2",
                          "created": "2019-11-06T08:58:33.717Z",
                          "digest": "f49178db7e10c54f41de8c3111ef94a7572d4c6f389ebec9b91e2f81201591bc",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/node-red-1.4.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/node-red/versions/1.4.0/README.md",
                          "values": "/v1/assets/stable/node-red/versions/1.4.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/node-red/versions/1.4.0"
                      }
                  }
              }
          },
          {
              "id": "stable/oauth2-proxy",
              "type": "chart",
              "attributes": {
                  "name": "oauth2-proxy",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "A reverse proxy that provides authentication with Google, Github or other providers",
                  "home": "http://www.videntity.com/",
                  "keywords": [
                      "kubernetes",
                      "oauth",
                      "oauth2",
                      "authentication",
                      "google",
                      "github"
                  ],
                  "maintainers": [
                      {
                          "name": "desaintmartin",
                          "email": "cedric.dsm@gmail.com"
                      },
                      {
                          "name": "miouge1",
                          "email": "maxime@root314.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/pusher/oauth2_proxy"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/oauth2-proxy"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.2.0",
                          "app_version": "4.0.0",
                          "created": "2019-11-06T08:58:33.718Z",
                          "digest": "2aca52baa61694bdb24e9d4950669411606930e4c1198b3d8c09a3d85f298eb1",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/oauth2-proxy-1.2.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/oauth2-proxy/versions/1.2.0/README.md",
                          "values": "/v1/assets/stable/oauth2-proxy/versions/1.2.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/oauth2-proxy/versions/1.2.0"
                      }
                  }
              }
          },
          {
              "id": "bitnami/odoo",
              "type": "chart",
              "attributes": {
                  "name": "odoo",
                  "repo": {
                      "name": "bitnami",
                      "url": "https://charts.bitnami.com/bitnami"
                  },
                  "description": "A suite of web based open source business apps.",
                  "home": "https://www.odoo.com/",
                  "keywords": [
                      "odoo",
                      "crm",
                      "www",
                      "http",
                      "web"
                  ],
                  "maintainers": [
                      {
                          "name": "Bitnami",
                          "email": "containers@bitnami.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/bitnami/bitnami-docker-odoo"
                  ],
                  "icon": "/v1/assets/bitnami/odoo/logo"
              },
              "links": {
                  "self": "/v1/charts/bitnami/odoo"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "11.1.10",
                          "app_version": "12.0.20191015",
                          "created": "2019-11-06T09:38:39.664Z",
                          "digest": "0f031c44269a5ed845ef6a789ad8348e7cff44f4d6a359f1c7ea823b6688f162",
                          "urls": [
                              "https://charts.bitnami.com/bitnami/odoo-11.1.10.tgz"
                          ],
                          "readme": "/v1/assets/bitnami/odoo/versions/11.1.10/README.md",
                          "values": "/v1/assets/bitnami/odoo/versions/11.1.10/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/bitnami/odoo/versions/11.1.10"
                      }
                  }
              }
          },
          {
              "id": "stable/opa",
              "type": "chart",
              "attributes": {
                  "name": "opa",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Open source, general-purpose policy engine. Enforce fine-grained invariants over arbitrary Kubernetes resources.",
                  "home": "https://www.openpolicyagent.org",
                  "keywords": [
                      "opa",
                      "admission control",
                      "policy"
                  ],
                  "maintainers": [
                      {
                          "name": "tsandall",
                          "email": "torinsandall@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/open-policy-agent/opa"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/opa"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.12.0",
                          "app_version": "0.14.1",
                          "created": "2019-11-06T08:58:33.721Z",
                          "digest": "dce7a8380ccd87ce98e4ba9560fc186af39ebf0512d2c755f50cb9d7a0b69ca8",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/opa-1.12.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/opa/versions/1.12.0/README.md",
                          "values": "/v1/assets/stable/opa/versions/1.12.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/opa/versions/1.12.0"
                      }
                  }
              }
          },
          {
              "id": "bitnami/opencart",
              "type": "chart",
              "attributes": {
                  "name": "opencart",
                  "repo": {
                      "name": "bitnami",
                      "url": "https://charts.bitnami.com/bitnami"
                  },
                  "description": "A free and open source e-commerce platform for online merchants. It provides a professional and reliable foundation for a successful online store.",
                  "home": "https://opencart.com/",
                  "keywords": [
                      "opencart",
                      "e-commerce",
                      "http",
                      "web",
                      "php"
                  ],
                  "maintainers": [
                      {
                          "name": "Bitnami",
                          "email": "containers@bitnami.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/bitnami/bitnami-docker-opencart"
                  ],
                  "icon": "/v1/assets/bitnami/opencart/logo"
              },
              "links": {
                  "self": "/v1/charts/bitnami/opencart"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "6.2.7",
                          "app_version": "3.0.3-2",
                          "created": "2019-11-06T09:38:39.666Z",
                          "digest": "92eefc2bd8b7f21d08acfaebbfd9cfe60fbf1198eafa13b0f322f0b896da7954",
                          "urls": [
                              "https://charts.bitnami.com/bitnami/opencart-6.2.7.tgz"
                          ],
                          "readme": "/v1/assets/bitnami/opencart/versions/6.2.7/README.md",
                          "values": "/v1/assets/bitnami/opencart/versions/6.2.7/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/bitnami/opencart/versions/6.2.7"
                      }
                  }
              }
          },
          {
              "id": "stable/openebs",
              "type": "chart",
              "attributes": {
                  "name": "openebs",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Containerized Storage for Containers",
                  "home": "http://www.openebs.io/",
                  "keywords": [
                      "cloud-native-storage",
                      "block-storage",
                      "iSCSI",
                      "storage"
                  ],
                  "maintainers": [
                      {
                          "name": "kmova",
                          "email": "kiran.mova@openebs.io"
                      },
                      {
                          "name": "prateekpandey14",
                          "email": "prateek.pandey@openebs.io"
                      }
                  ],
                  "sources": [
                      "https://github.com/openebs/openebs"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/openebs"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.3.1",
                          "app_version": "1.3.0",
                          "created": "2019-11-06T08:58:33.725Z",
                          "digest": "12b1e02b0be6aeb5050ef86ca0c4875d548b3cda7e2efb1a4ad992abb506c15c",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/openebs-1.3.1.tgz"
                          ],
                          "readme": "/v1/assets/stable/openebs/versions/1.3.1/README.md",
                          "values": "/v1/assets/stable/openebs/versions/1.3.1/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/openebs/versions/1.3.1"
                      }
                  }
              }
          },
          {
              "id": "stable/openiban",
              "type": "chart",
              "attributes": {
                  "name": "openiban",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "OpenIBAN is a self-hosted, free and open-source IBAN validation API.",
                  "home": "https://openiban.com",
                  "keywords": [
                      "iban",
                      "golang"
                  ],
                  "maintainers": [
                      {
                          "name": "verwilst",
                          "email": "bart@verwilst.be"
                      }
                  ],
                  "sources": [
                      "https://github.com/fourcube/goiban-service"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/openiban"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.0.0",
                          "app_version": "1.0.1",
                          "created": "2019-11-06T08:58:33.725Z",
                          "digest": "84fcb0ff6694df4ef0a24fbe60f52fa9c53ac113906ef0e297a9e39a39cb485f",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/openiban-1.0.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/openiban/versions/1.0.0/README.md",
                          "values": "/v1/assets/stable/openiban/versions/1.0.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/openiban/versions/1.0.0"
                      }
                  }
              }
          },
          {
              "id": "stable/openldap",
              "type": "chart",
              "attributes": {
                  "name": "openldap",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Community developed LDAP software",
                  "home": "https://www.openldap.org",
                  "keywords": [
                      "ldap",
                      "openldap"
                  ],
                  "maintainers": [
                      {
                          "name": "enis",
                          "email": "enis@apache.org"
                      }
                  ],
                  "sources": [
                      "https://github.com/kubernetes/charts"
                  ],
                  "icon": "/v1/assets/stable/openldap/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/openldap"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.2.2",
                          "app_version": "2.4.48",
                          "created": "2019-11-06T08:58:33.726Z",
                          "digest": "1d81584585d520af1e23f2bf75d720ddac3a135e6e2f2fe1d60e439a5d4ecc11",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/openldap-1.2.2.tgz"
                          ],
                          "readme": "/v1/assets/stable/openldap/versions/1.2.2/README.md",
                          "values": "/v1/assets/stable/openldap/versions/1.2.2/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/openldap/versions/1.2.2"
                      }
                  }
              }
          },
          {
              "id": "stable/openvpn",
              "type": "chart",
              "attributes": {
                  "name": "openvpn",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "A Helm chart to install an openvpn server inside a kubernetes cluster.  Certificate generation is also part of the deployment, and this chart will generate client keys as needed.",
                  "home": "https://openvpn.net/index.php/open-source.html",
                  "keywords": [
                      "openvpn",
                      "vpn",
                      "tunnel",
                      "network",
                      "service",
                      "connectivity",
                      "encryption"
                  ],
                  "maintainers": [
                      {
                          "name": "jasongwartz"
                      },
                      {
                          "name": "dippynark"
                      }
                  ],
                  "sources": [
                      "https://github.com/jfelten/openvpn-docker",
                      "https://github.com/kubernetes/charts/tree/master/stable/openvpn",
                      "https://github.com/jfelten/helm-charts"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/openvpn"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "3.14.1",
                          "app_version": "1.1.0",
                          "created": "2019-11-06T08:58:33.727Z",
                          "digest": "bba9c231b1c7c738411be6e3f8032b3b432a4c4850d80267ddc662a440d9821a",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/openvpn-3.14.1.tgz"
                          ],
                          "readme": "/v1/assets/stable/openvpn/versions/3.14.1/README.md",
                          "values": "/v1/assets/stable/openvpn/versions/3.14.1/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/openvpn/versions/3.14.1"
                      }
                  }
              }
          },
          {
              "id": "bitnami/orangehrm",
              "type": "chart",
              "attributes": {
                  "name": "orangehrm",
                  "repo": {
                      "name": "bitnami",
                      "url": "https://charts.bitnami.com/bitnami"
                  },
                  "description": "OrangeHRM is a free HR management system that offers a wealth of modules to suit the needs of your business.",
                  "home": "https://www.orangehrm.com",
                  "keywords": [
                      "orangehrm",
                      "http",
                      "https",
                      "web",
                      "application",
                      "php",
                      "human resources"
                  ],
                  "maintainers": [
                      {
                          "name": "Bitnami",
                          "email": "containers@bitnami.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/bitnami/bitnami-docker-orangehrm"
                  ],
                  "icon": "/v1/assets/bitnami/orangehrm/logo"
              },
              "links": {
                  "self": "/v1/charts/bitnami/orangehrm"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "6.2.7",
                          "app_version": "4.3.3-0",
                          "created": "2019-11-06T09:38:39.668Z",
                          "digest": "546ad122ac47f7bc7993dbf93ee32cb541eba3c1f60c4a3c623a139294c39f8b",
                          "urls": [
                              "https://charts.bitnami.com/bitnami/orangehrm-6.2.7.tgz"
                          ],
                          "readme": "/v1/assets/bitnami/orangehrm/versions/6.2.7/README.md",
                          "values": "/v1/assets/bitnami/orangehrm/versions/6.2.7/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/bitnami/orangehrm/versions/6.2.7"
                      }
                  }
              }
          },
          {
              "id": "incubator/orientdb",
              "type": "chart",
              "attributes": {
                  "name": "orientdb",
                  "repo": {
                      "name": "incubator",
                      "url": "https://kubernetes-charts-incubator.storage.googleapis.com"
                  },
                  "description": "A Helm chart for Distributed OrientDB",
                  "home": "https://orientdb.com",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "b-yond-infinite-network",
                          "email": "sommeliers@b-yond.com"
                      },
                      {
                          "name": "soujiro32167",
                          "email": "eli.kasik@b-yond.com"
                      }
                  ],
                  "sources": [],
                  "icon": "/v1/assets/incubator/orientdb/logo"
              },
              "links": {
                  "self": "/v1/charts/incubator/orientdb"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.1.2",
                          "app_version": "3.0.13",
                          "created": "2019-11-06T09:29:02.015Z",
                          "digest": "eb26ae8bc7e2dd8e8b1f9270531c11b9be1defcc1edccbb151fa380f80f1fe90",
                          "urls": [
                              "https://kubernetes-charts-incubator.storage.googleapis.com/orientdb-0.1.2.tgz"
                          ],
                          "readme": "/v1/assets/incubator/orientdb/versions/0.1.2/README.md",
                          "values": "/v1/assets/incubator/orientdb/versions/0.1.2/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/incubator/orientdb/versions/0.1.2"
                      }
                  }
              }
          },
          {
              "id": "bitnami/osclass",
              "type": "chart",
              "attributes": {
                  "name": "osclass",
                  "repo": {
                      "name": "bitnami",
                      "url": "https://charts.bitnami.com/bitnami"
                  },
                  "description": "Osclass is a php script that allows you to quickly create and manage your own free classifieds site.",
                  "home": "https://osclass.org/",
                  "keywords": [
                      "osclass",
                      "classifieds",
                      "http",
                      "web",
                      "php"
                  ],
                  "maintainers": [
                      {
                          "name": "Bitnami",
                          "email": "containers@bitnami.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/bitnami/bitnami-docker-osclass"
                  ],
                  "icon": "/v1/assets/bitnami/osclass/logo"
              },
              "links": {
                  "self": "/v1/charts/bitnami/osclass"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "6.2.7",
                          "app_version": "3.7.4",
                          "created": "2019-11-06T09:38:39.672Z",
                          "digest": "93fddc8449c996c0d24c5e574909d997c7e6295b15bc66bfc9354da421b5342b",
                          "urls": [
                              "https://charts.bitnami.com/bitnami/osclass-6.2.7.tgz"
                          ],
                          "readme": "/v1/assets/bitnami/osclass/versions/6.2.7/README.md",
                          "values": "/v1/assets/bitnami/osclass/versions/6.2.7/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/bitnami/osclass/versions/6.2.7"
                      }
                  }
              }
          },
          {
              "id": "bitnami/owncloud",
              "type": "chart",
              "attributes": {
                  "name": "owncloud",
                  "repo": {
                      "name": "bitnami",
                      "url": "https://charts.bitnami.com/bitnami"
                  },
                  "description": "A file sharing server that puts the control and security of your own data back into your hands.",
                  "home": "https://owncloud.org/",
                  "keywords": [
                      "owncloud",
                      "storage",
                      "http",
                      "web",
                      "php"
                  ],
                  "maintainers": [
                      {
                          "name": "Bitnami",
                          "email": "containers@bitnami.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/bitnami/bitnami-docker-owncloud"
                  ],
                  "icon": "/v1/assets/bitnami/owncloud/logo"
              },
              "links": {
                  "self": "/v1/charts/bitnami/owncloud"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "6.2.9",
                          "app_version": "10.3.0",
                          "created": "2019-11-06T09:38:39.674Z",
                          "digest": "429fe5bc9df371b6c10053e052bcd4fa25b5d3560560a419c9ec76da1f93b7e4",
                          "urls": [
                              "https://charts.bitnami.com/bitnami/owncloud-6.2.9.tgz"
                          ],
                          "readme": "/v1/assets/bitnami/owncloud/versions/6.2.9/README.md",
                          "values": "/v1/assets/bitnami/owncloud/versions/6.2.9/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/bitnami/owncloud/versions/6.2.9"
                      }
                  }
              }
          },
          {
              "id": "stable/pachyderm",
              "type": "chart",
              "attributes": {
                  "name": "pachyderm",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Pachyderm is a large-scale container-based workflow engine that offers complete version control for data and reproducible data processing\n",
                  "home": "https://pachyderm.io",
                  "keywords": [
                      "pachyderm",
                      "workflows",
                      "reproducibility",
                      "distributed",
                      "processing"
                  ],
                  "maintainers": [
                      {
                          "name": "jonandernovella",
                          "email": "novella.uu@gmail.com"
                      },
                      {
                          "name": "dwhitena",
                          "email": "whitenack.daniel@gmail.com"
                      },
                      {
                          "name": "jdoliner",
                          "email": "jdoliner@pachyderm.io"
                      }
                  ],
                  "sources": [
                      "https://github.com/pachyderm/pachyderm"
                  ],
                  "icon": "/v1/assets/stable/pachyderm/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/pachyderm"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.2.1",
                          "app_version": "1.8.6",
                          "created": "2019-11-06T08:58:33.737Z",
                          "digest": "285eaa6e3237a1deed880406ab39467358b249a25055ffb412f35339802dea11",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/pachyderm-0.2.1.tgz"
                          ],
                          "readme": "/v1/assets/stable/pachyderm/versions/0.2.1/README.md",
                          "values": "/v1/assets/stable/pachyderm/versions/0.2.1/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/pachyderm/versions/0.2.1"
                      }
                  }
              }
          },
          {
              "id": "bitnami/parse",
              "type": "chart",
              "attributes": {
                  "name": "parse",
                  "repo": {
                      "name": "bitnami",
                      "url": "https://charts.bitnami.com/bitnami"
                  },
                  "description": "Parse is a platform that enables users to add a scalable and powerful backend to launch a full-featured app for iOS, Android, JavaScript, Windows, Unity, and more.",
                  "home": "https://parse.com/",
                  "keywords": [
                      "parse",
                      "backend",
                      "serverless",
                      "platform",
                      "mbaas",
                      "mobile"
                  ],
                  "maintainers": [
                      {
                          "name": "Bitnami",
                          "email": "containers@bitnami.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/bitnami/bitnami-docker-parse",
                      "https://github.com/bitnami/bitnami-docker-parse-dashboard"
                  ],
                  "icon": "/v1/assets/bitnami/parse/logo"
              },
              "links": {
                  "self": "/v1/charts/bitnami/parse"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "10.2.0",
                          "app_version": "3.9.0",
                          "created": "2019-11-06T09:38:39.676Z",
                          "digest": "26c1ab72e33709326ac1a7a6b97b0e5298c260378d185ef60bdfa0873ccdccc4",
                          "urls": [
                              "https://charts.bitnami.com/bitnami/parse-10.2.0.tgz"
                          ],
                          "readme": "/v1/assets/bitnami/parse/versions/10.2.0/README.md",
                          "values": "/v1/assets/bitnami/parse/versions/10.2.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/bitnami/parse/versions/10.2.0"
                      }
                  }
              }
          },
          {
              "id": "incubator/patroni",
              "type": "chart",
              "attributes": {
                  "name": "patroni",
                  "repo": {
                      "name": "incubator",
                      "url": "https://kubernetes-charts-incubator.storage.googleapis.com"
                  },
                  "description": "Highly available elephant herd: HA PostgreSQL cluster.",
                  "home": "https://github.com/zalando/patroni",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "alexeyklyukin",
                          "email": "team-acid@zalando.de"
                      },
                      {
                          "name": "linki",
                          "email": "team-teapot@zalando.de"
                      }
                  ],
                  "sources": [
                      "https://github.com/zalando/patroni",
                      "https://github.com/zalando/spilo"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/incubator/patroni"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.15.0",
                          "app_version": "1.4-p16",
                          "created": "2019-11-06T09:29:02.017Z",
                          "digest": "200136fd7e44d0564e8bf3d92554c909ca7e3a5dc859ee8d4fe9e9d3c1461835",
                          "urls": [
                              "https://kubernetes-charts-incubator.storage.googleapis.com/patroni-0.15.0.tgz"
                          ],
                          "readme": "/v1/assets/incubator/patroni/versions/0.15.0/README.md",
                          "values": "/v1/assets/incubator/patroni/versions/0.15.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/incubator/patroni/versions/0.15.0"
                      }
                  }
              }
          },
          {
              "id": "stable/percona",
              "type": "chart",
              "attributes": {
                  "name": "percona",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "free, fully compatible, enhanced, open source drop-in replacement for MySQL",
                  "home": "https://www.percona.com/",
                  "keywords": [
                      "mysql",
                      "percona",
                      "database",
                      "sql"
                  ],
                  "maintainers": [
                      {
                          "name": "CaptTofu",
                          "email": "patg@patg.net"
                      }
                  ],
                  "sources": [
                      "https://github.com/kubernetes/charts",
                      "https://github.com/docker-library/percona"
                  ],
                  "icon": "/v1/assets/stable/percona/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/percona"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.2.0",
                          "app_version": "5.7.17",
                          "created": "2019-11-06T08:58:33.741Z",
                          "digest": "15dd98df256d1442b8376163525b5aa30295afa04bae30e32f8aff9b46d43770",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/percona-1.2.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/percona/versions/1.2.0/README.md",
                          "values": "/v1/assets/stable/percona/versions/1.2.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/percona/versions/1.2.0"
                      }
                  }
              }
          },
          {
              "id": "stable/percona-xtradb-cluster",
              "type": "chart",
              "attributes": {
                  "name": "percona-xtradb-cluster",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "free, fully compatible, enhanced, open source drop-in replacement for MySQL with Galera Replication (xtradb)",
                  "home": "https://www.percona.com/",
                  "keywords": [
                      "mysql",
                      "percona",
                      "database",
                      "sql",
                      "xtradb",
                      "galera",
                      "wsrep"
                  ],
                  "maintainers": [
                      {
                          "name": "paulczar",
                          "email": "username.taken@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/kubernetes/charts",
                      "https://github.com/percona-lab/percona-docker/"
                  ],
                  "icon": "/v1/assets/stable/percona-xtradb-cluster/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/percona-xtradb-cluster"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.0.3",
                          "app_version": "5.7.19",
                          "created": "2019-11-06T08:58:33.742Z",
                          "digest": "0949be47d556285d9c6e790e9840fd6c82f4247cbf92ff9442ec5f0e78e0fefc",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/percona-xtradb-cluster-1.0.3.tgz"
                          ],
                          "readme": "/v1/assets/stable/percona-xtradb-cluster/versions/1.0.3/README.md",
                          "values": "/v1/assets/stable/percona-xtradb-cluster/versions/1.0.3/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/percona-xtradb-cluster/versions/1.0.3"
                      }
                  }
              }
          },
          {
              "id": "stable/pgadmin",
              "type": "chart",
              "attributes": {
                  "name": "pgadmin",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "pgAdmin is a web based administration tool for PostgreSQL database",
                  "home": "https://www.pgadmin.org/",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "rowanruseler",
                          "email": "rowanruseler@gmail.com"
                      }
                  ],
                  "sources": [],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/pgadmin"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.0.1",
                          "app_version": "4.14.0",
                          "created": "2019-11-06T08:58:33.742Z",
                          "digest": "5a5890b70d25b39756d50fc2012307ce8374060020c95b8e72ce34813e92c925",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/pgadmin-1.0.1.tgz"
                          ],
                          "readme": "/v1/assets/stable/pgadmin/versions/1.0.1/README.md",
                          "values": "/v1/assets/stable/pgadmin/versions/1.0.1/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/pgadmin/versions/1.0.1"
                      }
                  }
              }
          },
          {
              "id": "bitnami/phabricator",
              "type": "chart",
              "attributes": {
                  "name": "phabricator",
                  "repo": {
                      "name": "bitnami",
                      "url": "https://charts.bitnami.com/bitnami"
                  },
                  "description": "Collection of open source web applications that help software companies build better software.",
                  "home": "https://www.phacility.com/phabricator/",
                  "keywords": [
                      "phabricator",
                      "http",
                      "https",
                      "web",
                      "application",
                      "collaboration",
                      "project management",
                      "bug tracking",
                      "code review",
                      "wiki",
                      "git",
                      "mercurial",
                      "subversion"
                  ],
                  "maintainers": [
                      {
                          "name": "Bitnami",
                          "email": "containers@bitnami.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/bitnami/bitnami-docker-phabricator"
                  ],
                  "icon": "/v1/assets/bitnami/phabricator/logo"
              },
              "links": {
                  "self": "/v1/charts/bitnami/phabricator"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "8.0.3",
                          "app_version": "2019.43.0",
                          "created": "2019-11-06T09:38:39.679Z",
                          "digest": "e5c656205656b005efe71a043277b65577702670fd6583d2e63d113c1aa8709c",
                          "urls": [
                              "https://charts.bitnami.com/bitnami/phabricator-8.0.3.tgz"
                          ],
                          "readme": "/v1/assets/bitnami/phabricator/versions/8.0.3/README.md",
                          "values": "/v1/assets/bitnami/phabricator/versions/8.0.3/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/bitnami/phabricator/versions/8.0.3"
                      }
                  }
              }
          },
          {
              "id": "bitnami/phpbb",
              "type": "chart",
              "attributes": {
                  "name": "phpbb",
                  "repo": {
                      "name": "bitnami",
                      "url": "https://charts.bitnami.com/bitnami"
                  },
                  "description": "Community forum that supports the notion of users and groups, file attachments, full-text search, notifications and more.",
                  "home": "https://www.phpbb.com/",
                  "keywords": [
                      "phpbb",
                      "forum",
                      "http",
                      "php"
                  ],
                  "maintainers": [
                      {
                          "name": "Bitnami",
                          "email": "containers@bitnami.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/bitnami/bitnami-docker-phpbb"
                  ],
                  "icon": "/v1/assets/bitnami/phpbb/logo"
              },
              "links": {
                  "self": "/v1/charts/bitnami/phpbb"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "6.2.6",
                          "app_version": "3.2.8",
                          "created": "2019-11-06T09:38:39.682Z",
                          "digest": "debd7422f89d87d5fc7554452067e056de01a4b7c2136f76a827a6c35f99c7ac",
                          "urls": [
                              "https://charts.bitnami.com/bitnami/phpbb-6.2.6.tgz"
                          ],
                          "readme": "/v1/assets/bitnami/phpbb/versions/6.2.6/README.md",
                          "values": "/v1/assets/bitnami/phpbb/versions/6.2.6/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/bitnami/phpbb/versions/6.2.6"
                      }
                  }
              }
          },
          {
              "id": "bitnami/phpmyadmin",
              "type": "chart",
              "attributes": {
                  "name": "phpmyadmin",
                  "repo": {
                      "name": "bitnami",
                      "url": "https://charts.bitnami.com/bitnami"
                  },
                  "description": "phpMyAdmin is an mysql administration frontend",
                  "home": "https://www.phpmyadmin.net/",
                  "keywords": [
                      "mariadb",
                      "mysql",
                      "phpmyadmin"
                  ],
                  "maintainers": [
                      {
                          "name": "Bitnami",
                          "email": "containers@bitnami.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/bitnami/bitnami-docker-phpmyadmin"
                  ],
                  "icon": "/v1/assets/bitnami/phpmyadmin/logo"
              },
              "links": {
                  "self": "/v1/charts/bitnami/phpmyadmin"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "4.2.0",
                          "app_version": "4.9.1",
                          "created": "2019-11-06T09:38:39.683Z",
                          "digest": "2b61402696fc543ac4b50f147c80efec17dd8a2e397222e13d67a9cc34cbfec2",
                          "urls": [
                              "https://charts.bitnami.com/bitnami/phpmyadmin-4.2.0.tgz"
                          ],
                          "readme": "/v1/assets/bitnami/phpmyadmin/versions/4.2.0/README.md",
                          "values": "/v1/assets/bitnami/phpmyadmin/versions/4.2.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/bitnami/phpmyadmin/versions/4.2.0"
                      }
                  }
              }
          },
          {
              "id": "stable/pomerium",
              "type": "chart",
              "attributes": {
                  "name": "pomerium",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Pomerium is an identity-aware access proxy.",
                  "home": "http://www.pomerium.io/",
                  "keywords": [
                      "proxy",
                      "access-proxy",
                      "reverse-proxy",
                      "sso",
                      "openid connect",
                      "oauth2",
                      "authorization",
                      "authentication",
                      "google",
                      "okta",
                      "azure"
                  ],
                  "maintainers": [
                      {
                          "name": "desimone",
                          "email": "bobby.desimone@gmail.com"
                      },
                      {
                          "name": "travisgroth"
                      }
                  ],
                  "sources": [
                      "https://github.com/pomerium/pomerium"
                  ],
                  "icon": "/v1/assets/stable/pomerium/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/pomerium"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "4.0.4",
                          "app_version": "0.4.2",
                          "created": "2019-11-06T08:58:33.751Z",
                          "digest": "fb6b3b6ae28ceb99d4e711c9da41dd75b821e7f8035f4d196b887d20b0453379",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/pomerium-4.0.4.tgz"
                          ],
                          "readme": "/v1/assets/stable/pomerium/versions/4.0.4/README.md",
                          "values": "/v1/assets/stable/pomerium/versions/4.0.4/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/pomerium/versions/4.0.4"
                      }
                  }
              }
          },
          {
              "id": "bitnami/postgresql",
              "type": "chart",
              "attributes": {
                  "name": "postgresql",
                  "repo": {
                      "name": "bitnami",
                      "url": "https://charts.bitnami.com/bitnami"
                  },
                  "description": "Chart for PostgreSQL, an object-relational database management system (ORDBMS) with an emphasis on extensibility and on standards-compliance.",
                  "home": "https://www.postgresql.org/",
                  "keywords": [
                      "postgresql",
                      "postgres",
                      "database",
                      "sql",
                      "replication",
                      "cluster"
                  ],
                  "maintainers": [
                      {
                          "name": "Bitnami",
                          "email": "containers@bitnami.com"
                      },
                      {
                          "name": "desaintmartin",
                          "email": "cedric@desaintmartin.fr"
                      }
                  ],
                  "sources": [
                      "https://github.com/bitnami/bitnami-docker-postgresql"
                  ],
                  "icon": "/v1/assets/bitnami/postgresql/logo"
              },
              "links": {
                  "self": "/v1/charts/bitnami/postgresql"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "6.5.7",
                          "app_version": "11.5.0",
                          "created": "2019-11-06T09:38:39.685Z",
                          "digest": "2873ada4795561aac044fac86ac14abdeaf048431c48153ab6a6959d7c48ec78",
                          "urls": [
                              "https://charts.bitnami.com/bitnami/postgresql-6.5.7.tgz"
                          ],
                          "readme": "/v1/assets/bitnami/postgresql/versions/6.5.7/README.md",
                          "values": "/v1/assets/bitnami/postgresql/versions/6.5.7/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/bitnami/postgresql/versions/6.5.7"
                      }
                  }
              }
          },
          {
              "id": "bitnami/prestashop",
              "type": "chart",
              "attributes": {
                  "name": "prestashop",
                  "repo": {
                      "name": "bitnami",
                      "url": "https://charts.bitnami.com/bitnami"
                  },
                  "description": "A popular open source ecommerce solution. Professional tools are easily accessible to increase online sales including instant guest checkout, abandoned cart reminders and automated Email marketing.",
                  "home": "https://prestashop.com/",
                  "keywords": [
                      "prestashop",
                      "e-commerce",
                      "http",
                      "web",
                      "php"
                  ],
                  "maintainers": [
                      {
                          "name": "Bitnami",
                          "email": "containers@bitnami.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/bitnami/bitnami-docker-prestashop"
                  ],
                  "icon": "/v1/assets/bitnami/prestashop/logo"
              },
              "links": {
                  "self": "/v1/charts/bitnami/prestashop"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "8.2.8",
                          "app_version": "1.7.6-1",
                          "created": "2019-11-06T09:38:39.688Z",
                          "digest": "fa427312d8f18e628b3bb413d29d80e0a38ae3166329e4ff82dbf5cc8dde0f64",
                          "urls": [
                              "https://charts.bitnami.com/bitnami/prestashop-8.2.8.tgz"
                          ],
                          "readme": "/v1/assets/bitnami/prestashop/versions/8.2.8/README.md",
                          "values": "/v1/assets/bitnami/prestashop/versions/8.2.8/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/bitnami/prestashop/versions/8.2.8"
                      }
                  }
              }
          },
          {
              "id": "stable/presto",
              "type": "chart",
              "attributes": {
                  "name": "presto",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Distributed SQL query engine for running interactive analytic queries",
                  "home": "https://prestodb.io",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "bivas",
                          "email": "eliran.bivas@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/facebook/presto"
                  ],
                  "icon": "/v1/assets/stable/presto/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/presto"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.1.1",
                          "app_version": "0.196",
                          "created": "2019-11-06T08:58:33.756Z",
                          "digest": "aab32bf1a3694ac91d8ff770575a511d2ad2ec792fdd447849faefe42266a725",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/presto-0.1.1.tgz"
                          ],
                          "readme": "/v1/assets/stable/presto/versions/0.1.1/README.md",
                          "values": "/v1/assets/stable/presto/versions/0.1.1/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/presto/versions/0.1.1"
                      }
                  }
              }
          },
          {
              "id": "stable/prisma",
              "type": "chart",
              "attributes": {
                  "name": "prisma",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Prisma turns your database into a realtime GraphQL API",
                  "home": "https://www.prisma.io/",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "giacomoguiulfo",
                          "email": "giacomoguiulfo@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/prismagraphql/prisma"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/prisma"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.2.1",
                          "app_version": "1.29.1",
                          "created": "2019-11-06T08:58:33.758Z",
                          "digest": "1134b6a2de7947d5b78b6fb6c861fe650712bca12016454ac4d71cd9e4f51563",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/prisma-1.2.1.tgz"
                          ],
                          "readme": "/v1/assets/stable/prisma/versions/1.2.1/README.md",
                          "values": "/v1/assets/stable/prisma/versions/1.2.1/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/prisma/versions/1.2.1"
                      }
                  }
              }
          },
          {
              "id": "incubator/prometheus",
              "type": "chart",
              "attributes": {
                  "name": "prometheus",
                  "repo": {
                      "name": "incubator",
                      "url": "https://kubernetes-charts-incubator.storage.googleapis.com"
                  },
                  "description": "A Helm chart for Kubernetes",
                  "home": "",
                  "keywords": [],
                  "maintainers": [],
                  "sources": [],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/incubator/prometheus"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.1.4",
                          "app_version": "",
                          "created": "2016-11-10T21:03:23.417Z",
                          "digest": "149f04a5bade9c1da5898f29f91a0fe7c068da761d696c80d94c4b6cb9c500be",
                          "urls": [
                              "http://storage.googleapis.com/kubernetes-charts-incubator/prometheus-0.1.4.tgz"
                          ],
                          "readme": "/v1/assets/incubator/prometheus/versions/0.1.4/README.md",
                          "values": "/v1/assets/incubator/prometheus/versions/0.1.4/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/incubator/prometheus/versions/0.1.4"
                      }
                  }
              }
          },
          {
              "id": "stable/prometheus",
              "type": "chart",
              "attributes": {
                  "name": "prometheus",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Prometheus is a monitoring system and time series database.",
                  "home": "https://prometheus.io/",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "mgoodness",
                          "email": "mgoodness@gmail.com"
                      },
                      {
                          "name": "gianrubio",
                          "email": "gianrubio@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/prometheus/alertmanager",
                      "https://github.com/prometheus/prometheus",
                      "https://github.com/prometheus/pushgateway",
                      "https://github.com/prometheus/node_exporter",
                      "https://github.com/kubernetes/kube-state-metrics"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/prometheus"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "9.3.1",
                          "app_version": "2.13.1",
                          "created": "2019-11-06T08:58:33.759Z",
                          "digest": "7112be1e36d049dd5de426953d5719c8e2f382cbe5f661ccd1b28273463c3227",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/prometheus-9.3.1.tgz"
                          ],
                          "readme": "/v1/assets/stable/prometheus/versions/9.3.1/README.md",
                          "values": "/v1/assets/stable/prometheus/versions/9.3.1/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/prometheus/versions/9.3.1"
                      }
                  }
              }
          },
          {
              "id": "stable/prometheus-adapter",
              "type": "chart",
              "attributes": {
                  "name": "prometheus-adapter",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "A Helm chart for k8s prometheus adapter",
                  "home": "https://github.com/DirectXMan12/k8s-prometheus-adapter",
                  "keywords": [
                      "hpa",
                      "metrics",
                      "prometheus",
                      "adapter"
                  ],
                  "maintainers": [
                      {
                          "name": "mattiasgees",
                          "email": "mattias.gees@jetstack.io"
                      },
                      {
                          "name": "steven-sheehy"
                      },
                      {
                          "name": "hectorj2f",
                          "email": "hfernandez@mesosphere.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/kubernetes/charts",
                      "https://github.com/DirectXMan12/k8s-prometheus-adapter"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/prometheus-adapter"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.4.0",
                          "app_version": "v0.5.0",
                          "created": "2019-11-06T08:58:33.76Z",
                          "digest": "3388f84f3267bfede40dc20ea27283b513a9fa1c221f32393242426c0a4a3433",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/prometheus-adapter-1.4.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/prometheus-adapter/versions/1.4.0/README.md",
                          "values": "/v1/assets/stable/prometheus-adapter/versions/1.4.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/prometheus-adapter/versions/1.4.0"
                      }
                  }
              }
          },
          {
              "id": "stable/prometheus-blackbox-exporter",
              "type": "chart",
              "attributes": {
                  "name": "prometheus-blackbox-exporter",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Prometheus Blackbox Exporter",
                  "home": "https://github.com/prometheus/blackbox_exporter",
                  "keywords": [
                      "prometheus",
                      "blackbox",
                      "monitoring"
                  ],
                  "maintainers": [
                      {
                          "name": "desaintmartin",
                          "email": "cedric@desaintmartin.fr"
                      },
                      {
                          "name": "gianrubio",
                          "email": "gianrubio@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/prometheus/blackbox_exporter"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/prometheus-blackbox-exporter"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.5.0",
                          "app_version": "0.15.1",
                          "created": "2019-11-06T08:58:33.76Z",
                          "digest": "0ed32e5d7a06aaa334113d141ed27ded238d515b81f330ee840ccd55d0582d5d",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/prometheus-blackbox-exporter-1.5.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/prometheus-blackbox-exporter/versions/1.5.0/README.md",
                          "values": "/v1/assets/stable/prometheus-blackbox-exporter/versions/1.5.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/prometheus-blackbox-exporter/versions/1.5.0"
                      }
                  }
              }
          },
          {
              "id": "stable/prometheus-cloudwatch-exporter",
              "type": "chart",
              "attributes": {
                  "name": "prometheus-cloudwatch-exporter",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "A Helm chart for prometheus cloudwatch-exporter",
                  "home": "https://github.com/prometheus/cloudwatch_exporter",
                  "keywords": [
                      "aws",
                      "cloudwatch",
                      "prometheus",
                      "exporter"
                  ],
                  "maintainers": [
                      {
                          "name": "gianrubio",
                          "email": "gianrubio@gmail.com"
                      },
                      {
                          "name": "torstenwalter",
                          "email": "mail@torstenwalter.de"
                      },
                      {
                          "name": "asherf",
                          "email": "asher@asherfoa.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/prometheus/cloudwatch_exporter"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/prometheus-cloudwatch-exporter"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.5.0",
                          "app_version": "0.6.0",
                          "created": "2019-11-06T08:58:33.761Z",
                          "digest": "58f836707865c72c637fdb3189933fa386993797a18ab3f58062299fbd1da2d1",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/prometheus-cloudwatch-exporter-0.5.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/prometheus-cloudwatch-exporter/versions/0.5.0/README.md",
                          "values": "/v1/assets/stable/prometheus-cloudwatch-exporter/versions/0.5.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/prometheus-cloudwatch-exporter/versions/0.5.0"
                      }
                  }
              }
          },
          {
              "id": "stable/prometheus-consul-exporter",
              "type": "chart",
              "attributes": {
                  "name": "prometheus-consul-exporter",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "A Helm chart for the Prometheus Consul Exporter",
                  "home": "https://github.com/prometheus/consul_exporter",
                  "keywords": [
                      "metrics",
                      "consul",
                      "monitoring"
                  ],
                  "maintainers": [
                      {
                          "name": "timm088",
                          "email": "8890118+timm088@users.noreply.github.com"
                      }
                  ],
                  "sources": [],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/prometheus-consul-exporter"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.1.4",
                          "app_version": "0.4.0",
                          "created": "2019-11-06T08:58:33.761Z",
                          "digest": "16293306aa45a1d4139a57eae83cf362fd097b3efb6cbfa1686ad559fe0fe55c",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/prometheus-consul-exporter-0.1.4.tgz"
                          ],
                          "readme": "/v1/assets/stable/prometheus-consul-exporter/versions/0.1.4/README.md",
                          "values": "/v1/assets/stable/prometheus-consul-exporter/versions/0.1.4/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/prometheus-consul-exporter/versions/0.1.4"
                      }
                  }
              }
          },
          {
              "id": "stable/prometheus-couchdb-exporter",
              "type": "chart",
              "attributes": {
                  "name": "prometheus-couchdb-exporter",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "A Helm chart to export the metrics from couchdb in Prometheus format.",
                  "home": "https://github.com/gesellix/couchdb-prometheus-exporter",
                  "keywords": [
                      "couchdb-exporter"
                  ],
                  "maintainers": [
                      {
                          "name": "gkarthiks",
                          "email": "github.gkarthiks@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/gesellix/couchdb-prometheus-exporter"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/prometheus-couchdb-exporter"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.1.1",
                          "app_version": "1.0",
                          "created": "2019-11-06T08:58:33.762Z",
                          "digest": "319a2e6aaae7888e1b698fa5f4a293821647129908814fa91336cbad5a218397",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/prometheus-couchdb-exporter-0.1.1.tgz"
                          ],
                          "readme": "/v1/assets/stable/prometheus-couchdb-exporter/versions/0.1.1/README.md",
                          "values": "/v1/assets/stable/prometheus-couchdb-exporter/versions/0.1.1/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/prometheus-couchdb-exporter/versions/0.1.1"
                      }
                  }
              }
          },
          {
              "id": "stable/prometheus-mongodb-exporter",
              "type": "chart",
              "attributes": {
                  "name": "prometheus-mongodb-exporter",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "A Prometheus exporter for MongoDB metrics",
                  "home": "https://github.com/percona/mongodb_exporter",
                  "keywords": [
                      "exporter",
                      "metrics",
                      "mongodb",
                      "prometheus"
                  ],
                  "maintainers": [
                      {
                          "name": "steven-sheehy",
                          "email": "ssheehy@firescope.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/percona/mongodb_exporter"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/prometheus-mongodb-exporter"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "2.3.0",
                          "app_version": "v0.7.0",
                          "created": "2019-11-06T08:58:33.762Z",
                          "digest": "dbd7139a4e88c1083fa6a20093685afe25658cae70127fb74059c7ee487b8ff6",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/prometheus-mongodb-exporter-2.3.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/prometheus-mongodb-exporter/versions/2.3.0/README.md",
                          "values": "/v1/assets/stable/prometheus-mongodb-exporter/versions/2.3.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/prometheus-mongodb-exporter/versions/2.3.0"
                      }
                  }
              }
          },
          {
              "id": "stable/prometheus-mysql-exporter",
              "type": "chart",
              "attributes": {
                  "name": "prometheus-mysql-exporter",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "A Helm chart for prometheus mysql exporter with cloudsqlproxy",
                  "home": "https://github.com/prometheus/mysqld_exporter",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "juanchimienti",
                          "email": "juan.chimienti@gmail.com"
                      },
                      {
                          "name": "monotek",
                          "email": "monotek23@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/prometheus/mysqld_exporter"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/prometheus-mysql-exporter"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.5.2",
                          "app_version": "v0.11.0",
                          "created": "2019-11-06T08:58:33.762Z",
                          "digest": "ce93e6651f7b9c3c5d8b6777ad343210bc5f0ed6dd56dfe6641d23a01135aa30",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/prometheus-mysql-exporter-0.5.2.tgz"
                          ],
                          "readme": "/v1/assets/stable/prometheus-mysql-exporter/versions/0.5.2/README.md",
                          "values": "/v1/assets/stable/prometheus-mysql-exporter/versions/0.5.2/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/prometheus-mysql-exporter/versions/0.5.2"
                      }
                  }
              }
          },
          {
              "id": "stable/prometheus-nats-exporter",
              "type": "chart",
              "attributes": {
                  "name": "prometheus-nats-exporter",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "A Helm chart for prometheus-nats-exporter",
                  "home": "https://github.com/nats-io/prometheus-nats-exporter",
                  "keywords": [
                      "nats",
                      "prometheus",
                      "exporter"
                  ],
                  "maintainers": [
                      {
                          "name": "okgolove",
                          "email": "okgolove@markeloff.net"
                      },
                      {
                          "name": "caarlos0",
                          "email": "carlos@carlosbecker.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/nats-io/prometheus-nats-exporter"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/prometheus-nats-exporter"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "2.3.0",
                          "app_version": "0.6.0",
                          "created": "2019-11-06T08:58:33.763Z",
                          "digest": "e4240e09752379125289d66d51bf24de78231c8ba83a72627339dad4c60bb6d8",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/prometheus-nats-exporter-2.3.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/prometheus-nats-exporter/versions/2.3.0/README.md",
                          "values": "/v1/assets/stable/prometheus-nats-exporter/versions/2.3.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/prometheus-nats-exporter/versions/2.3.0"
                      }
                  }
              }
          },
          {
              "id": "stable/prometheus-node-exporter",
              "type": "chart",
              "attributes": {
                  "name": "prometheus-node-exporter",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "A Helm chart for prometheus node-exporter",
                  "home": "https://github.com/prometheus/node_exporter/",
                  "keywords": [
                      "node-exporter",
                      "prometheus",
                      "exporter"
                  ],
                  "maintainers": [
                      {
                          "name": "gianrubio",
                          "email": "gianrubio@gmail.com"
                      },
                      {
                          "name": "vsliouniaev"
                      }
                  ],
                  "sources": [
                      "https://github.com/prometheus/node_exporter/"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/prometheus-node-exporter"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.7.3",
                          "app_version": "0.18.1",
                          "created": "2019-11-06T08:58:33.763Z",
                          "digest": "e2d3e230e7f0101baea48c74b5d66ac0262491d6d58a6d2225d3c231980ea75e",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/prometheus-node-exporter-1.7.3.tgz"
                          ],
                          "readme": "/v1/assets/stable/prometheus-node-exporter/versions/1.7.3/README.md",
                          "values": "/v1/assets/stable/prometheus-node-exporter/versions/1.7.3/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/prometheus-node-exporter/versions/1.7.3"
                      }
                  }
              }
          },
          {
              "id": "bitnami/prometheus-operator",
              "type": "chart",
              "attributes": {
                  "name": "prometheus-operator",
                  "repo": {
                      "name": "bitnami",
                      "url": "https://charts.bitnami.com/bitnami"
                  },
                  "description": "The Prometheus Operator for Kubernetes provides easy monitoring definitions for Kubernetes services and deployment and management of Prometheus instances.",
                  "home": "https://github.com/coreos/prometheus-operator/",
                  "keywords": [
                      "prometheus",
                      "alertmanager",
                      "operator",
                      "monitoring"
                  ],
                  "maintainers": [
                      {
                          "name": "Bitnami",
                          "email": "containers@bitnami.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/bitnami/bitnami-docker-prometheus-operator",
                      "https://github.com/coreos/prometheus-operator/"
                  ],
                  "icon": "/v1/assets/bitnami/prometheus-operator/logo"
              },
              "links": {
                  "self": "/v1/charts/bitnami/prometheus-operator"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.1.0",
                          "app_version": "0.33.0",
                          "created": "2019-11-06T09:38:39.697Z",
                          "digest": "4ebb1438adf2e30c7380c917370fe85b0ec90e832244e993bbf90ff099e430cd",
                          "urls": [
                              "https://charts.bitnami.com/bitnami/prometheus-operator-0.1.0.tgz"
                          ],
                          "readme": "/v1/assets/bitnami/prometheus-operator/versions/0.1.0/README.md",
                          "values": "/v1/assets/bitnami/prometheus-operator/versions/0.1.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/bitnami/prometheus-operator/versions/0.1.0"
                      }
                  }
              }
          },
          {
              "id": "stable/prometheus-operator",
              "type": "chart",
              "attributes": {
                  "name": "prometheus-operator",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Provides easy monitoring definitions for Kubernetes services, and deployment and management of Prometheus instances.",
                  "home": "https://github.com/coreos/prometheus-operator",
                  "keywords": [
                      "operator",
                      "prometheus"
                  ],
                  "maintainers": [
                      {
                          "name": "vsliouniaev"
                      },
                      {
                          "name": "bismarck"
                      },
                      {
                          "name": "gianrubio",
                          "email": "gianrubio@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/coreos/kube-prometheus",
                      "https://github.com/coreos/prometheus-operator",
                      "https://coreos.com/operators/prometheus"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/prometheus-operator"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "8.1.0",
                          "app_version": "0.34.0",
                          "created": "2019-11-06T08:58:33.776Z",
                          "digest": "48b990157ffa4c5fe66de3530875ba108af746c1549cc4ac9676b0ae6042d468",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/prometheus-operator-8.1.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/prometheus-operator/versions/8.1.0/README.md",
                          "values": "/v1/assets/stable/prometheus-operator/versions/8.1.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/prometheus-operator/versions/8.1.0"
                      }
                  }
              }
          },
          {
              "id": "stable/prometheus-postgres-exporter",
              "type": "chart",
              "attributes": {
                  "name": "prometheus-postgres-exporter",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "A Helm chart for prometheus postgres-exporter",
                  "home": "https://github.com/wrouesnel/postgres_exporter",
                  "keywords": [
                      "postgresql",
                      "prometheus",
                      "exporter"
                  ],
                  "maintainers": [
                      {
                          "name": "gianrubio",
                          "email": "gianrubio@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/wrouesnel/postgres_exporter"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/prometheus-postgres-exporter"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.1.0",
                          "app_version": "0.5.1",
                          "created": "2019-11-06T08:58:33.777Z",
                          "digest": "b063b8849b5a6917ef6ec3c71e5a58344de4b939bb61fe26ca49df811d2dc4d6",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/prometheus-postgres-exporter-1.1.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/prometheus-postgres-exporter/versions/1.1.0/README.md",
                          "values": "/v1/assets/stable/prometheus-postgres-exporter/versions/1.1.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/prometheus-postgres-exporter/versions/1.1.0"
                      }
                  }
              }
          },
          {
              "id": "stable/prometheus-pushgateway",
              "type": "chart",
              "attributes": {
                  "name": "prometheus-pushgateway",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "A Helm chart for prometheus pushgateway",
                  "home": "https://github.com/prometheus/pushgateway",
                  "keywords": [
                      "pushgateway",
                      "prometheus"
                  ],
                  "maintainers": [
                      {
                          "name": "gianrubio",
                          "email": "gianrubio@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/prometheus/pushgateway"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/prometheus-pushgateway"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.2.0",
                          "app_version": "1.0.0",
                          "created": "2019-11-06T08:58:33.777Z",
                          "digest": "5946a4d2ac231014fb13379619a7eae249f0a389aadf1e16dcee9656cb2fd447",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/prometheus-pushgateway-1.2.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/prometheus-pushgateway/versions/1.2.0/README.md",
                          "values": "/v1/assets/stable/prometheus-pushgateway/versions/1.2.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/prometheus-pushgateway/versions/1.2.0"
                      }
                  }
              }
          },
          {
              "id": "stable/prometheus-rabbitmq-exporter",
              "type": "chart",
              "attributes": {
                  "name": "prometheus-rabbitmq-exporter",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Rabbitmq metrics exporter for prometheus",
                  "home": "https://github.com/kbudde/rabbitmq_exporter",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "juanchimienti",
                          "email": "juan.chimienti@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/kbudde/rabbitmq_exporter"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/prometheus-rabbitmq-exporter"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.5.3",
                          "app_version": "v0.29.0",
                          "created": "2019-11-06T08:58:33.778Z",
                          "digest": "00a56d179662f669fdd2592e7b4f58bfcb379998ac5a06fab52488e38dae650e",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/prometheus-rabbitmq-exporter-0.5.3.tgz"
                          ],
                          "readme": "/v1/assets/stable/prometheus-rabbitmq-exporter/versions/0.5.3/README.md",
                          "values": "/v1/assets/stable/prometheus-rabbitmq-exporter/versions/0.5.3/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/prometheus-rabbitmq-exporter/versions/0.5.3"
                      }
                  }
              }
          },
          {
              "id": "stable/prometheus-redis-exporter",
              "type": "chart",
              "attributes": {
                  "name": "prometheus-redis-exporter",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Prometheus exporter for Redis metrics",
                  "home": "https://github.com/oliver006/redis_exporter",
                  "keywords": [
                      "prometheus",
                      "redis"
                  ],
                  "maintainers": [
                      {
                          "name": "acondrat",
                          "email": "arcadie.condrat@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/oliver006/redis_exporter"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/prometheus-redis-exporter"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "3.1.0",
                          "app_version": "1.0.4",
                          "created": "2019-11-06T08:58:33.778Z",
                          "digest": "b5e9c190ed0c82849acd8f4f65f5a78286c9a1d2bad382ee1d41172051a79778",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/prometheus-redis-exporter-3.1.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/prometheus-redis-exporter/versions/3.1.0/README.md",
                          "values": "/v1/assets/stable/prometheus-redis-exporter/versions/3.1.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/prometheus-redis-exporter/versions/3.1.0"
                      }
                  }
              }
          },
          {
              "id": "stable/prometheus-snmp-exporter",
              "type": "chart",
              "attributes": {
                  "name": "prometheus-snmp-exporter",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Prometheus SNMP Exporter",
                  "home": "https://github.com/prometheus/snmp_exporter",
                  "keywords": [
                      "prometheus",
                      "snmp",
                      "monitoring"
                  ],
                  "maintainers": [
                      {
                          "name": "miouge1",
                          "email": "maxime@root314.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/prometheus/snmp_exporter"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/prometheus-snmp-exporter"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.0.4",
                          "app_version": "0.14.0",
                          "created": "2019-11-06T08:58:33.779Z",
                          "digest": "ae4160e1f9eba19e4012438596bf00b24766702357ccf1d43d6011d56cb564f6",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/prometheus-snmp-exporter-0.0.4.tgz"
                          ],
                          "readme": "/v1/assets/stable/prometheus-snmp-exporter/versions/0.0.4/README.md",
                          "values": "/v1/assets/stable/prometheus-snmp-exporter/versions/0.0.4/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/prometheus-snmp-exporter/versions/0.0.4"
                      }
                  }
              }
          },
          {
              "id": "stable/prometheus-to-sd",
              "type": "chart",
              "attributes": {
                  "name": "prometheus-to-sd",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Scrape metrics stored in prometheus format and push them to the Stackdriver",
                  "home": "https://github.com/GoogleCloudPlatform/k8s-stackdriver/tree/master/prometheus-to-sd",
                  "keywords": [
                      "prometheus",
                      "stackdriver"
                  ],
                  "maintainers": [
                      {
                          "name": "acondrat",
                          "email": "arcadie.condrat@gmail.com"
                      }
                  ],
                  "sources": [],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/prometheus-to-sd"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.3.0",
                          "app_version": "0.5.2",
                          "created": "2019-11-06T08:58:33.779Z",
                          "digest": "e4c17926cfa030c5cd3928d0c00efae3bbd2ae9910d6c8fdd58d3c9cadd38c0a",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/prometheus-to-sd-0.3.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/prometheus-to-sd/versions/0.3.0/README.md",
                          "values": "/v1/assets/stable/prometheus-to-sd/versions/0.3.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/prometheus-to-sd/versions/0.3.0"
                      }
                  }
              }
          },
          {
              "id": "incubator/puppet-forge",
              "type": "chart",
              "attributes": {
                  "name": "puppet-forge",
                  "repo": {
                      "name": "incubator",
                      "url": "https://kubernetes-charts-incubator.storage.googleapis.com"
                  },
                  "description": "Distribute locally developed Puppet modules and proxy to the official Puppet Forge server",
                  "home": "https://github.com/unibet/puppet-forge-server",
                  "keywords": [
                      "puppet",
                      "repository",
                      "forge"
                  ],
                  "maintainers": [
                      {
                          "name": "Gerard Hickey",
                          "email": "hickey@kinetic-compute.com"
                      }
                  ],
                  "sources": [],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/incubator/puppet-forge"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.1.8",
                          "app_version": "1.10.0",
                          "created": "2019-11-06T09:29:02.018Z",
                          "digest": "d46b6023323939d34904571e05d994b1134cc0ece72026f9b0bedbb9159d4dd3",
                          "urls": [
                              "https://kubernetes-charts-incubator.storage.googleapis.com/puppet-forge-0.1.8.tgz"
                          ],
                          "readme": "/v1/assets/incubator/puppet-forge/versions/0.1.8/README.md",
                          "values": "/v1/assets/incubator/puppet-forge/versions/0.1.8/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/incubator/puppet-forge/versions/0.1.8"
                      }
                  }
              }
          },
          {
              "id": "bitnami/pytorch",
              "type": "chart",
              "attributes": {
                  "name": "pytorch",
                  "repo": {
                      "name": "bitnami",
                      "url": "https://charts.bitnami.com/bitnami"
                  },
                  "description": "Deep learning platform that accelerates the transition from research prototyping to production deployment",
                  "home": "http://pytorch.org/",
                  "keywords": [
                      "pytorch",
                      "python",
                      "machine",
                      "learning"
                  ],
                  "maintainers": [
                      {
                          "name": "Bitnami",
                          "email": "containers@bitnami.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/bitnami/bitnami-docker-pytorch"
                  ],
                  "icon": "/v1/assets/bitnami/pytorch/logo"
              },
              "links": {
                  "self": "/v1/charts/bitnami/pytorch"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.2.9",
                          "app_version": "1.3.0",
                          "created": "2019-11-06T09:38:39.698Z",
                          "digest": "f5b10d782f8138b9079a497c4541d9572d0168325933ba179a240efc448b4b41",
                          "urls": [
                              "https://charts.bitnami.com/bitnami/pytorch-1.2.9.tgz"
                          ],
                          "readme": "/v1/assets/bitnami/pytorch/versions/1.2.9/README.md",
                          "values": "/v1/assets/bitnami/pytorch/versions/1.2.9/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/bitnami/pytorch/versions/1.2.9"
                      }
                  }
              }
          },
          {
              "id": "stable/quassel",
              "type": "chart",
              "attributes": {
                  "name": "quassel",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Quassel IRC is a modern, cross-platform, distributed IRC client.",
                  "home": "https://quassel-irc.org/",
                  "keywords": [
                      "irc"
                  ],
                  "maintainers": [
                      {
                          "name": "kiall",
                          "email": "kiall@macinnes.ie"
                      }
                  ],
                  "sources": [
                      "https://github.com/quassel/quassel",
                      "https://github.com/linuxserver/docker-quassel-core"
                  ],
                  "icon": "/v1/assets/stable/quassel/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/quassel"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.2.9",
                          "app_version": "0.12.4",
                          "created": "2019-11-06T08:58:33.78Z",
                          "digest": "28ed12d69b4a492ad8fe7722bafdd9fe3116f8cf2156fa4973267cc01f8904a5",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/quassel-0.2.9.tgz"
                          ],
                          "readme": "/v1/assets/stable/quassel/versions/0.2.9/README.md",
                          "values": "/v1/assets/stable/quassel/versions/0.2.9/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/quassel/versions/0.2.9"
                      }
                  }
              }
          },
          {
              "id": "bitnami/rabbitmq",
              "type": "chart",
              "attributes": {
                  "name": "rabbitmq",
                  "repo": {
                      "name": "bitnami",
                      "url": "https://charts.bitnami.com/bitnami"
                  },
                  "description": "Open source message broker software that implements the Advanced Message Queuing Protocol (AMQP)",
                  "home": "https://www.rabbitmq.com",
                  "keywords": [
                      "rabbitmq",
                      "message queue",
                      "AMQP"
                  ],
                  "maintainers": [
                      {
                          "name": "Bitnami",
                          "email": "containers@bitnami.com"
                      },
                      {
                          "name": "desaintmartin",
                          "email": "cedric@desaintmartin.fr"
                      }
                  ],
                  "sources": [
                      "https://github.com/bitnami/bitnami-docker-rabbitmq"
                  ],
                  "icon": "/v1/assets/bitnami/rabbitmq/logo"
              },
              "links": {
                  "self": "/v1/charts/bitnami/rabbitmq"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "6.11.1",
                          "app_version": "3.8.1",
                          "created": "2019-11-06T09:38:39.699Z",
                          "digest": "bcd9a9645a640823956b9104eb38b5c44280ea805f405c5ebb3444dc1a30cf5e",
                          "urls": [
                              "https://charts.bitnami.com/bitnami/rabbitmq-6.11.1.tgz"
                          ],
                          "readme": "/v1/assets/bitnami/rabbitmq/versions/6.11.1/README.md",
                          "values": "/v1/assets/bitnami/rabbitmq/versions/6.11.1/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/bitnami/rabbitmq/versions/6.11.1"
                      }
                  }
              }
          },
          {
              "id": "stable/rabbitmq-ha",
              "type": "chart",
              "attributes": {
                  "name": "rabbitmq-ha",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Highly available RabbitMQ cluster, the open source message broker software that implements the Advanced Message Queuing Protocol (AMQP).",
                  "home": "https://www.rabbitmq.com",
                  "keywords": [
                      "rabbitmq",
                      "message queue",
                      "AMQP",
                      "AMQPS",
                      "MQTT",
                      "STOMP"
                  ],
                  "maintainers": [
                      {
                          "name": "steven-sheehy"
                      }
                  ],
                  "sources": [
                      "https://github.com/rabbitmq/rabbitmq",
                      "https://github.com/docker-library/rabbitmq"
                  ],
                  "icon": "/v1/assets/stable/rabbitmq-ha/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/rabbitmq-ha"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.36.0",
                          "app_version": "3.8.0",
                          "created": "2019-11-06T08:58:33.783Z",
                          "digest": "0472788697fb3fd31dd9dd9361013d8d580404c60ca80c719222047c8099e7d5",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/rabbitmq-ha-1.36.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/rabbitmq-ha/versions/1.36.0/README.md",
                          "values": "/v1/assets/stable/rabbitmq-ha/versions/1.36.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/rabbitmq-ha/versions/1.36.0"
                      }
                  }
              }
          },
          {
              "id": "incubator/raw",
              "type": "chart",
              "attributes": {
                  "name": "raw",
                  "repo": {
                      "name": "incubator",
                      "url": "https://kubernetes-charts-incubator.storage.googleapis.com"
                  },
                  "description": "A place for all the Kubernetes resources which don't already have a home.",
                  "home": "https://github.com/helm/charts/blob/master/incubator/raw",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "josdotso",
                          "email": "josdotso@cisco.com"
                      },
                      {
                          "name": "mumoshu",
                          "email": "ykuoka@gmail.com"
                      }
                  ],
                  "sources": [],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/incubator/raw"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.2.3",
                          "app_version": "0.2.3",
                          "created": "2019-11-06T09:29:02.018Z",
                          "digest": "b441b2f3b445f7e352ba56714d05fed0f53adea458dbe01fe1cfe1f16d4092a1",
                          "urls": [
                              "https://kubernetes-charts-incubator.storage.googleapis.com/raw-0.2.3.tgz"
                          ],
                          "readme": "/v1/assets/incubator/raw/versions/0.2.3/README.md",
                          "values": "/v1/assets/incubator/raw/versions/0.2.3/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/incubator/raw/versions/0.2.3"
                      }
                  }
              }
          },
          {
              "id": "bitnami/redis",
              "type": "chart",
              "attributes": {
                  "name": "redis",
                  "repo": {
                      "name": "bitnami",
                      "url": "https://charts.bitnami.com/bitnami"
                  },
                  "description": "Open source, advanced key-value store. It is often referred to as a data structure server since keys can contain strings, hashes, lists, sets and sorted sets.",
                  "home": "http://redis.io/",
                  "keywords": [
                      "redis",
                      "keyvalue",
                      "database"
                  ],
                  "maintainers": [
                      {
                          "name": "Bitnami",
                          "email": "containers@bitnami.com"
                      },
                      {
                          "name": "desaintmartin",
                          "email": "cedric@desaintmartin.fr"
                      }
                  ],
                  "sources": [
                      "https://github.com/bitnami/bitnami-docker-redis"
                  ],
                  "icon": "/v1/assets/bitnami/redis/logo"
              },
              "links": {
                  "self": "/v1/charts/bitnami/redis"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "9.5.1",
                          "app_version": "5.0.5",
                          "created": "2019-11-06T09:38:39.701Z",
                          "digest": "62c13d87eaac36f7720c26d7d3bd120e9aaa17ed16004e0aa0735c86cd5c98d3",
                          "urls": [
                              "https://charts.bitnami.com/bitnami/redis-9.5.1.tgz"
                          ],
                          "readme": "/v1/assets/bitnami/redis/versions/9.5.1/README.md",
                          "values": "/v1/assets/bitnami/redis/versions/9.5.1/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/bitnami/redis/versions/9.5.1"
                      }
                  }
              }
          },
          {
              "id": "incubator/redis-cache",
              "type": "chart",
              "attributes": {
                  "name": "redis-cache",
                  "repo": {
                      "name": "incubator",
                      "url": "https://kubernetes-charts-incubator.storage.googleapis.com"
                  },
                  "description": "A pure in-memory redis cache, using statefulset and redis-sentinel-micro",
                  "home": "https://redis.io/",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "dhilipkumars",
                          "email": "dhilip.kumar.s@huawei.com"
                      },
                      {
                          "name": "cpanato",
                          "email": "ctadeu@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/antirez/redis",
                      "https://github.com/dhilipkumars/redis-sentinel-micro/tree/k8s"
                  ],
                  "icon": "/v1/assets/incubator/redis-cache/logo"
              },
              "links": {
                  "self": "/v1/charts/incubator/redis-cache"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.5.0",
                          "app_version": "4.0.12-alpine",
                          "created": "2019-11-06T09:29:02.018Z",
                          "digest": "59580d8a7025e5e8846fba1f16eb2ac3a8f3344a74b08d2defc3ff6afda179ca",
                          "urls": [
                              "https://kubernetes-charts-incubator.storage.googleapis.com/redis-cache-0.5.0.tgz"
                          ],
                          "readme": "/v1/assets/incubator/redis-cache/versions/0.5.0/README.md",
                          "values": "/v1/assets/incubator/redis-cache/versions/0.5.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/incubator/redis-cache/versions/0.5.0"
                      }
                  }
              }
          },
          {
              "id": "stable/redis-ha",
              "type": "chart",
              "attributes": {
                  "name": "redis-ha",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Highly available Kubernetes implementation of Redis",
                  "home": "http://redis.io/",
                  "keywords": [
                      "redis",
                      "keyvalue",
                      "database"
                  ],
                  "maintainers": [
                      {
                          "name": "ssalaues",
                          "email": "salimsalaues@gmail.com"
                      },
                      {
                          "name": "dandydeveloper",
                          "email": "aaron.layfield@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://redis.io/download",
                      "https://github.com/scality/Zenko/tree/development/1.0/kubernetes/zenko/charts/redis-ha",
                      "https://github.com/oliver006/redis_exporter"
                  ],
                  "icon": "/v1/assets/stable/redis-ha/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/redis-ha"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "3.10.0",
                          "app_version": "5.0.5",
                          "created": "2019-11-06T08:58:33.785Z",
                          "digest": "c17b2f0db81342baa909933509f7d4454f4da39f054ec9280731c38c80ea8e1c",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/redis-ha-3.10.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/redis-ha/versions/3.10.0/README.md",
                          "values": "/v1/assets/stable/redis-ha/versions/3.10.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/redis-ha/versions/3.10.0"
                      }
                  }
              }
          },
          {
              "id": "bitnami/redmine",
              "type": "chart",
              "attributes": {
                  "name": "redmine",
                  "repo": {
                      "name": "bitnami",
                      "url": "https://charts.bitnami.com/bitnami"
                  },
                  "description": "A flexible project management web application.",
                  "home": "http://www.redmine.org/",
                  "keywords": [
                      "redmine",
                      "project management",
                      "www",
                      "http",
                      "web",
                      "application",
                      "ruby",
                      "rails"
                  ],
                  "maintainers": [
                      {
                          "name": "Bitnami",
                          "email": "containers@bitnami.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/bitnami/bitnami-docker-redmine"
                  ],
                  "icon": "/v1/assets/bitnami/redmine/logo"
              },
              "links": {
                  "self": "/v1/charts/bitnami/redmine"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "12.2.11",
                          "app_version": "4.0.5",
                          "created": "2019-11-06T09:38:39.706Z",
                          "digest": "481e5d4d00a16b8060b4c1b60b71fdd602336a47d65c878f5e5b1e9c610f92e3",
                          "urls": [
                              "https://charts.bitnami.com/bitnami/redmine-12.2.11.tgz"
                          ],
                          "readme": "/v1/assets/bitnami/redmine/versions/12.2.11/README.md",
                          "values": "/v1/assets/bitnami/redmine/versions/12.2.11/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/bitnami/redmine/versions/12.2.11"
                      }
                  }
              }
          },
          {
              "id": "stable/reloader",
              "type": "chart",
              "attributes": {
                  "name": "reloader",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Reloader chart that runs on kubernetes",
                  "home": "https://github.com/stakater/Reloader",
                  "keywords": [
                      "Reloader",
                      "kubernetes"
                  ],
                  "maintainers": [
                      {
                          "name": "rasheedamir",
                          "email": "rasheed@aurorasolutions.io"
                      },
                      {
                          "name": "waseem-h",
                          "email": "waseemhassan@stakater.com"
                      },
                      {
                          "name": "faizanahmad055",
                          "email": "faizan.ahmad55@outlook.com"
                      },
                      {
                          "name": "kahootali",
                          "email": "ali.kahoot@aurorasolutions.io"
                      },
                      {
                          "name": "ahmadiq",
                          "email": "ahmad@aurorasolutions.io"
                      },
                      {
                          "name": "ahsan-storm",
                          "email": "ahsanmuhammad1@outlook.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/stakater/Reloader"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/reloader"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.2.0",
                          "app_version": "v0.0.41",
                          "created": "2019-11-06T08:58:33.788Z",
                          "digest": "7bec46e01f92d5c912192da3814267df26bb47862216fd105ff130561bb58741",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/reloader-1.2.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/reloader/versions/1.2.0/README.md",
                          "values": "/v1/assets/stable/reloader/versions/1.2.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/reloader/versions/1.2.0"
                      }
                  }
              }
          },
          {
              "id": "stable/rethinkdb",
              "type": "chart",
              "attributes": {
                  "name": "rethinkdb",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "The open-source database for the realtime web",
                  "home": "https://www.rethinkdb.com",
                  "keywords": [
                      "rethinkdb",
                      "database",
                      "nosql"
                  ],
                  "maintainers": [
                      {
                          "name": "meenie",
                          "email": "cody.lundquist@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://hub.docker.com/r/codylundquist/helm-rethinkdb-cluster/"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/rethinkdb"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.0.0",
                          "app_version": "0.1.0",
                          "created": "2019-11-06T08:58:33.789Z",
                          "digest": "cd575216155b6483cb48916adc10110d76b69856519c1554b91535f864651f6a",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/rethinkdb-1.0.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/rethinkdb/versions/1.0.0/README.md",
                          "values": "/v1/assets/stable/rethinkdb/versions/1.0.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/rethinkdb/versions/1.0.0"
                      }
                  }
              }
          },
          {
              "id": "incubator/riemann",
              "type": "chart",
              "attributes": {
                  "name": "riemann",
                  "repo": {
                      "name": "incubator",
                      "url": "https://kubernetes-charts-incubator.storage.googleapis.com"
                  },
                  "description": "Riemann monitors distributed systems. Riemann aggregates events from your servers and applications with a powerful stream processing language.",
                  "home": "http://riemann.io/",
                  "keywords": [
                      "riemann",
                      "metrics",
                      "monitoring"
                  ],
                  "maintainers": [
                      {
                          "name": "raykrueger",
                          "email": "raykrueger@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/raykrueger/riemann-docker"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/incubator/riemann"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.1.2",
                          "app_version": "0.2.14",
                          "created": "2019-11-06T09:29:02.019Z",
                          "digest": "20c6432b366d2408d4c4058aee9bcc8708fd17b439eca9d768349c3603cb5aab",
                          "urls": [
                              "https://kubernetes-charts-incubator.storage.googleapis.com/riemann-0.1.2.tgz"
                          ],
                          "readme": "/v1/assets/incubator/riemann/versions/0.1.2/README.md",
                          "values": "/v1/assets/incubator/riemann/versions/0.1.2/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/incubator/riemann/versions/0.1.2"
                      }
                  }
              }
          },
          {
              "id": "stable/risk-advisor",
              "type": "chart",
              "attributes": {
                  "name": "risk-advisor",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Risk Advisor add-on module for Kubernetes",
                  "home": "https://www.riskadvisory.net/",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "pposkrobko",
                          "email": "pawel.poskrobko@icloud.com"
                      },
                      {
                          "name": "Prytu",
                          "email": "mich.pryt@gmail.com"
                      },
                      {
                          "name": "GraczykowskiMichal",
                          "email": "graczykowskimichal@gmail.com"
                      },
                      {
                          "name": "jackmax",
                          "email": "jacek.maksymowicz@student.uw.edu.pl"
                      }
                  ],
                  "sources": [
                      "https://github.com/Prytu/risk-advisor/"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/risk-advisor"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "2.0.4",
                          "app_version": "1.0.0",
                          "created": "2019-11-06T08:58:33.789Z",
                          "digest": "4a56edc970e4819d0f04aa3416e28e21c96c3ae98a3cea07b49994d317e496ff",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/risk-advisor-2.0.4.tgz"
                          ],
                          "readme": "/v1/assets/stable/risk-advisor/versions/2.0.4/README.md",
                          "values": "/v1/assets/stable/risk-advisor/versions/2.0.4/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/risk-advisor/versions/2.0.4"
                      }
                  }
              }
          },
          {
              "id": "stable/rocketchat",
              "type": "chart",
              "attributes": {
                  "name": "rocketchat",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Prepare to take off with the ultimate chat platform, experience the next level of team communications",
                  "home": "https://rocket.chat/",
                  "keywords": [
                      "chat",
                      "communication",
                      "http",
                      "web",
                      "application",
                      "nodejs",
                      "javascript",
                      "meteor"
                  ],
                  "maintainers": [
                      {
                          "name": "RocketChat",
                          "email": "buildmaster@rocket.chat"
                      },
                      {
                          "name": "geekgonecrazy"
                      },
                      {
                          "name": "pierreozoux"
                      },
                      {
                          "name": "verwilst"
                      },
                      {
                          "name": "srueg"
                      }
                  ],
                  "sources": [
                      "https://github.com/RocketChat/Docker.Official.Image/"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/rocketchat"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.1.15",
                          "app_version": "1.3.1",
                          "created": "2019-11-06T08:58:33.791Z",
                          "digest": "2c34466efc41b46776ab88f3b6110ffc650b6406218a16dc0af572b96271d9d2",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/rocketchat-1.1.15.tgz"
                          ],
                          "readme": "/v1/assets/stable/rocketchat/versions/1.1.15/README.md",
                          "values": "/v1/assets/stable/rocketchat/versions/1.1.15/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/rocketchat/versions/1.1.15"
                      }
                  }
              }
          },
          {
              "id": "stable/rookout",
              "type": "chart",
              "attributes": {
                  "name": "rookout",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "A Helm chart for Rookout agent on Kubernetes",
                  "home": "http://rookout.com/",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "Zohar",
                          "email": "zohar@rookout.com"
                      }
                  ],
                  "sources": [],
                  "icon": "/v1/assets/stable/rookout/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/rookout"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.1.0",
                          "app_version": "1.0",
                          "created": "2019-11-06T08:58:33.791Z",
                          "digest": "3ea0d498456ee985b2514e248e74adedb701013de12d4c05d976da3d14b412d7",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/rookout-0.1.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/rookout/versions/0.1.0/README.md",
                          "values": "/v1/assets/stable/rookout/versions/0.1.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/rookout/versions/0.1.0"
                      }
                  }
              }
          },
          {
              "id": "incubator/rundeck",
              "type": "chart",
              "attributes": {
                  "name": "rundeck",
                  "repo": {
                      "name": "incubator",
                      "url": "https://kubernetes-charts-incubator.storage.googleapis.com"
                  },
                  "description": "A Rundeck chart for Kubernetes",
                  "home": "https://github.com/rundeck/rundeck",
                  "keywords": [
                      "rundeck",
                      "jobs",
                      "automation",
                      "operations"
                  ],
                  "maintainers": [
                      {
                          "name": "dwardu89",
                          "email": "hello@dwardu.com"
                      },
                      {
                          "name": "fabioviana",
                          "email": "fabioviana.bh@gmail.com"
                      },
                      {
                          "name": "dfduarte",
                          "email": "diego.fl.duarte@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/rundeck/rundeck"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/incubator/rundeck"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.1.2",
                          "app_version": "3.1.12",
                          "created": "2019-11-06T09:29:02.019Z",
                          "digest": "16d3699537000192f8ff2a177be7b745ee55f5f0e9a27a7c45eb1d53ffb12883",
                          "urls": [
                              "https://kubernetes-charts-incubator.storage.googleapis.com/rundeck-0.1.2.tgz"
                          ],
                          "readme": "/v1/assets/incubator/rundeck/versions/0.1.2/README.md",
                          "values": "/v1/assets/incubator/rundeck/versions/0.1.2/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/incubator/rundeck/versions/0.1.2"
                      }
                  }
              }
          },
          {
              "id": "stable/sapho",
              "type": "chart",
              "attributes": {
                  "name": "sapho",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "A micro application development and integration platform that enables organizations to create and deliver secure micro applications that tie into existing business systems and track changes to key business data.",
                  "home": "http://www.sapho.com",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "Sapho",
                          "email": "support@sapho.com"
                      }
                  ],
                  "sources": [
                      "https://bitbucket.org/sapho/ops-docker-tomcat/src",
                      "https://hub.docker.com/r/sapho/ops-docker-tomcat",
                      "https://github.com/kubernetes/charts/tree/master/stable/mysql"
                  ],
                  "icon": "/v1/assets/stable/sapho/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/sapho"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.2.2",
                          "app_version": "",
                          "created": "2019-11-06T08:58:33.792Z",
                          "digest": "2da7c6c7b581405c57782777a23ce0dd21ac9796d4bb0e7d3a0719c261d78b84",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/sapho-0.2.2.tgz"
                          ],
                          "readme": "/v1/assets/stable/sapho/versions/0.2.2/README.md",
                          "values": "/v1/assets/stable/sapho/versions/0.2.2/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/sapho/versions/0.2.2"
                      }
                  }
              }
          },
          {
              "id": "stable/satisfy",
              "type": "chart",
              "attributes": {
                  "name": "satisfy",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Composer repo hosting with Satisfy",
                  "home": "https://github.com/anapsix/docker-satisfy",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "anapsix",
                          "email": "anapsix@random.io"
                      }
                  ],
                  "sources": [
                      "https://github.com/anapsix/docker-satisfy",
                      "https://github.com/ludofleury/satisfy",
                      "https://github.com/composer/satis",
                      "https://unit.nginx.org/"
                  ],
                  "icon": "/v1/assets/stable/satisfy/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/satisfy"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.0.0",
                          "app_version": "3.0.4",
                          "created": "2019-11-06T08:58:33.793Z",
                          "digest": "5a7ff5e3a05611689694f53b07a47f8d05153c466aba6770ce5cbd14ef1a831e",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/satisfy-1.0.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/satisfy/versions/1.0.0/README.md",
                          "values": "/v1/assets/stable/satisfy/versions/1.0.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/satisfy/versions/1.0.0"
                      }
                  }
              }
          },
          {
              "id": "incubator/schema-registry",
              "type": "chart",
              "attributes": {
                  "name": "schema-registry",
                  "repo": {
                      "name": "incubator",
                      "url": "https://kubernetes-charts-incubator.storage.googleapis.com"
                  },
                  "description": "Schema Registry provides a serving layer for your metadata. It provides a RESTful interface for storing and retrieving Avro schemas. It stores a versioned history of all schemas, provides multiple compatibility settings and allows evolution of schemas according to the configured compatibility setting. It provides serializers that plug into Kafka clients that handle schema storage and retrieval for Kafka messages that are sent in the Avro format.",
                  "home": "https://docs.confluent.io/current/schema-registry/docs/index.html",
                  "keywords": [
                      "confluent",
                      "kafka",
                      "schema-registry"
                  ],
                  "maintainers": [
                      {
                          "name": "benjigoldberg",
                          "email": "ben@spothero.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/confluentinc/schema-registry",
                      "https://github.com/confluentinc/cp-docker-images"
                  ],
                  "icon": "/v1/assets/incubator/schema-registry/logo"
              },
              "links": {
                  "self": "/v1/charts/incubator/schema-registry"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.1.7",
                          "app_version": "5.0.1",
                          "created": "2019-11-06T09:29:02.021Z",
                          "digest": "ef94725fb2a46b63e89a1979436d7c9c3aa76bd4712ead4a3c093d1dd376bf19",
                          "urls": [
                              "https://kubernetes-charts-incubator.storage.googleapis.com/schema-registry-1.1.7.tgz"
                          ],
                          "readme": "/v1/assets/incubator/schema-registry/versions/1.1.7/README.md",
                          "values": "/v1/assets/incubator/schema-registry/versions/1.1.7/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/incubator/schema-registry/versions/1.1.7"
                      }
                  }
              }
          },
          {
              "id": "stable/schema-registry-ui",
              "type": "chart",
              "attributes": {
                  "name": "schema-registry-ui",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "This is a web tool for the confluentinc/schema-registry in order to create / view / search / evolve / view history & configure Avro schemas of your Kafka cluster.",
                  "home": "https://github.com/Landoop/schema-registry-ui",
                  "keywords": [
                      "confluent",
                      "schema-registry-ui",
                      "Kafka",
                      "avro",
                      "schema-registry"
                  ],
                  "maintainers": [
                      {
                          "name": "cristian04",
                          "email": "cristian04@gmail.com"
                      }
                  ],
                  "sources": [],
                  "icon": "/v1/assets/stable/schema-registry-ui/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/schema-registry-ui"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.4.0",
                          "app_version": "v0.9.5",
                          "created": "2019-11-06T08:58:33.794Z",
                          "digest": "676d4eb548916ad5cdcc2a49645fe0390f96fe4ea9549e7265336c2410cf700f",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/schema-registry-ui-0.4.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/schema-registry-ui/versions/0.4.0/README.md",
                          "values": "/v1/assets/stable/schema-registry-ui/versions/0.4.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/schema-registry-ui/versions/0.4.0"
                      }
                  }
              }
          },
          {
              "id": "stable/sealed-secrets",
              "type": "chart",
              "attributes": {
                  "name": "sealed-secrets",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "A Helm chart for Sealed Secrets",
                  "home": "https://github.com/bitnami-labs/sealed-secrets",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "stefanprodan",
                          "email": "stefan.prodan@gmail.com"
                      },
                      {
                          "name": "olib963",
                          "email": "olib963@gmail.com"
                      }
                  ],
                  "sources": [],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/sealed-secrets"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.4.3",
                          "app_version": "0.9.1",
                          "created": "2019-11-06T08:58:33.794Z",
                          "digest": "7f32b482d9ef786eb89ab1cdd913d6bfb43531549562005abfcf9a1698856c43",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/sealed-secrets-1.4.3.tgz"
                          ],
                          "readme": "/v1/assets/stable/sealed-secrets/versions/1.4.3/README.md",
                          "values": "/v1/assets/stable/sealed-secrets/versions/1.4.3/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/sealed-secrets/versions/1.4.3"
                      }
                  }
              }
          },
          {
              "id": "stable/selenium",
              "type": "chart",
              "attributes": {
                  "name": "selenium",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Chart for selenium grid",
                  "home": "http://www.seleniumhq.org/",
                  "keywords": [
                      "qa"
                  ],
                  "maintainers": [
                      {
                          "name": "flah00",
                          "email": "techops@adaptly.com"
                      },
                      {
                          "name": "diemol",
                          "email": "diemol@gmail.com"
                      },
                      {
                          "name": "ekirmayer",
                          "email": "ekirmayer@hotmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/SeleniumHQ/docker-selenium"
                  ],
                  "icon": "/v1/assets/stable/selenium/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/selenium"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.0.10",
                          "app_version": "3.141.59",
                          "created": "2019-11-06T08:58:33.795Z",
                          "digest": "9a03cb419d0244fc3b48192a1a103e330acc8c5598a6b869f6cdacffe58efb02",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/selenium-1.0.10.tgz"
                          ],
                          "readme": "/v1/assets/stable/selenium/versions/1.0.10/README.md",
                          "values": "/v1/assets/stable/selenium/versions/1.0.10/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/selenium/versions/1.0.10"
                      }
                  }
              }
          },
          {
              "id": "stable/sematext-agent",
              "type": "chart",
              "attributes": {
                  "name": "sematext-agent",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Helm chart for deploying Sematext Agent to Kubernetes",
                  "home": "https://sematext.com/cloud",
                  "keywords": [
                      "sematext",
                      "observability",
                      "monitoring",
                      "logging",
                      "containers",
                      "ebpf"
                  ],
                  "maintainers": [
                      {
                          "name": "hakman",
                          "email": "ciprian.hacman@sematext.com"
                      }
                  ],
                  "sources": [],
                  "icon": "/v1/assets/stable/sematext-agent/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/sematext-agent"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.0.20",
                          "app_version": "1.0",
                          "created": "2019-11-06T08:58:33.796Z",
                          "digest": "bc6602b327d70f8638f16123e9f4becd45da55cb2244b503fe4263024036fc30",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/sematext-agent-1.0.20.tgz"
                          ],
                          "readme": "/v1/assets/stable/sematext-agent/versions/1.0.20/README.md",
                          "values": "/v1/assets/stable/sematext-agent/versions/1.0.20/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/sematext-agent/versions/1.0.20"
                      }
                  }
              }
          },
          {
              "id": "stable/sensu",
              "type": "chart",
              "attributes": {
                  "name": "sensu",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Sensu monitoring framework backed by the Redis transport",
                  "home": "https://sensuapp.org/",
                  "keywords": [
                      "sensu",
                      "monitoring"
                  ],
                  "maintainers": [
                      {
                          "name": "Shane Starcher",
                          "email": "shane.starcher@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/kubernetes/charts",
                      "https://github.com/sstarcher/docker-sensu",
                      "https://github.com/sensu/sensu"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/sensu"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.2.3",
                          "app_version": "0.28",
                          "created": "2019-11-06T08:58:33.797Z",
                          "digest": "51a5ac43327cbe4c90300d0276d030dff2eb0979bdb94103dd74adf5b1e804f1",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/sensu-0.2.3.tgz"
                          ],
                          "readme": "/v1/assets/stable/sensu/versions/0.2.3/README.md",
                          "values": "/v1/assets/stable/sensu/versions/0.2.3/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/sensu/versions/0.2.3"
                      }
                  }
              }
          },
          {
              "id": "stable/sentry",
              "type": "chart",
              "attributes": {
                  "name": "sentry",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Sentry is a cross-platform crash reporting and aggregation platform.",
                  "home": "https://sentry.io/",
                  "keywords": [
                      "debugging",
                      "logging"
                  ],
                  "maintainers": [
                      {
                          "name": "rothgar",
                          "email": "justin@linux.com"
                      },
                      {
                          "name": "okgolove",
                          "email": "okgolove@markeloff.net"
                      }
                  ],
                  "sources": [
                      "https://github.com/getsentry/sentry"
                  ],
                  "icon": "/v1/assets/stable/sentry/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/sentry"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "3.1.2",
                          "app_version": "9.1.2",
                          "created": "2019-11-06T08:58:33.801Z",
                          "digest": "95044d9350e24e27aea187fbc1e57e8844bdcb31896bd8e1a2062bd358414885",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/sentry-3.1.2.tgz"
                          ],
                          "readme": "/v1/assets/stable/sentry/versions/3.1.2/README.md",
                          "values": "/v1/assets/stable/sentry/versions/3.1.2/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/sentry/versions/3.1.2"
                      }
                  }
              }
          },
          {
              "id": "incubator/sentry-kubernetes",
              "type": "chart",
              "attributes": {
                  "name": "sentry-kubernetes",
                  "repo": {
                      "name": "incubator",
                      "url": "https://kubernetes-charts-incubator.storage.googleapis.com"
                  },
                  "description": "A Helm chart for sentry-kubernetes (https://github.com/getsentry/sentry-kubernetes)",
                  "home": "https://github.com/getsentry/sentry-kubernetes",
                  "keywords": [
                      "sentry",
                      "report kubernetes events"
                  ],
                  "maintainers": [
                      {
                          "name": "cpanato",
                          "email": "ctadeu@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/getsentry/sentry-kubernetes"
                  ],
                  "icon": "/v1/assets/incubator/sentry-kubernetes/logo"
              },
              "links": {
                  "self": "/v1/charts/incubator/sentry-kubernetes"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.2.2",
                          "app_version": "latest",
                          "created": "2019-11-06T09:29:02.021Z",
                          "digest": "ff474654635cc82eeec3b3f208d0fed6a43001dc82245f23901514aa7d720fa4",
                          "urls": [
                              "https://kubernetes-charts-incubator.storage.googleapis.com/sentry-kubernetes-0.2.2.tgz"
                          ],
                          "readme": "/v1/assets/incubator/sentry-kubernetes/versions/0.2.2/README.md",
                          "values": "/v1/assets/incubator/sentry-kubernetes/versions/0.2.2/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/incubator/sentry-kubernetes/versions/0.2.2"
                      }
                  }
              }
          },
          {
              "id": "stable/seq",
              "type": "chart",
              "attributes": {
                  "name": "seq",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Seq is the easiest way for development teams to capture, search and visualize structured log events! This page will walk you through the very quick setup process.",
                  "home": "https://getseq.net/",
                  "keywords": [
                      "seq",
                      "structured",
                      "logging"
                  ],
                  "maintainers": [
                      {
                          "name": "nblumhardt",
                          "email": "nblumhardt@nblumhardt.com"
                      },
                      {
                          "name": "KodrAus",
                          "email": "ashleymannix@live.com.au"
                      },
                      {
                          "name": "gertjvr",
                          "email": "gertjvr@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/datalust/seq-tickets"
                  ],
                  "icon": "/v1/assets/stable/seq/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/seq"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.0.2",
                          "app_version": "5",
                          "created": "2019-11-06T08:58:33.801Z",
                          "digest": "8c64cdeb44d002cec4cda2abeaf7a3fa618da34aebdb7b789512400fd3543b82",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/seq-1.0.2.tgz"
                          ],
                          "readme": "/v1/assets/stable/seq/versions/1.0.2/README.md",
                          "values": "/v1/assets/stable/seq/versions/1.0.2/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/seq/versions/1.0.2"
                      }
                  }
              }
          },
          {
              "id": "stable/signalsciences",
              "type": "chart",
              "attributes": {
                  "name": "signalsciences",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "SignalSciences is a web application firewall. This chart is the installable agent.",
                  "home": "https://signalsciences.com",
                  "keywords": [
                      "signalsciences",
                      "signal-sciences",
                      "sigsci",
                      "agent",
                      "firewall",
                      "waf"
                  ],
                  "maintainers": [
                      {
                          "name": "cpanato",
                          "email": "ctadeu@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/marccampbell/docker-sigsci"
                  ],
                  "icon": "/v1/assets/stable/signalsciences/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/signalsciences"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.0.0",
                          "app_version": "3.12.1",
                          "created": "2019-11-06T08:58:33.802Z",
                          "digest": "0d9d12cb88fc13872ba19e1509b2a96d4dacf1fe2a5c4872ff32be47da237bb6",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/signalsciences-1.0.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/signalsciences/versions/1.0.0/README.md",
                          "values": "/v1/assets/stable/signalsciences/versions/1.0.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/signalsciences/versions/1.0.0"
                      }
                  }
              }
          },
          {
              "id": "stable/socat-tunneller",
              "type": "chart",
              "attributes": {
                  "name": "socat-tunneller",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "A Helm chart for socat-tunneller",
                  "home": "http://www.dest-unreach.org/socat/",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "plumdog",
                          "email": "plummer574@gmail.com"
                      }
                  ],
                  "sources": [],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/socat-tunneller"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.1.0",
                          "app_version": "1.0",
                          "created": "2019-11-06T08:58:33.802Z",
                          "digest": "b6682d5aee86e3d2ed6705c23b3b7babe71cfad7e567b5fc7d6abe7d65567f57",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/socat-tunneller-0.1.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/socat-tunneller/versions/0.1.0/README.md",
                          "values": "/v1/assets/stable/socat-tunneller/versions/0.1.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/socat-tunneller/versions/0.1.0"
                      }
                  }
              }
          },
          {
              "id": "incubator/solr",
              "type": "chart",
              "attributes": {
                  "name": "solr",
                  "repo": {
                      "name": "incubator",
                      "url": "https://kubernetes-charts-incubator.storage.googleapis.com"
                  },
                  "description": "A helm chart to install Apache Solr: http://lucene.apache.org/solr/",
                  "home": "http://lucene.apache.org/solr/",
                  "keywords": [
                      "solr"
                  ],
                  "maintainers": [
                      {
                          "name": "ian-thebridge-lucidworks",
                          "email": "ian.thebridge@lucidworks.com"
                      }
                  ],
                  "sources": [
                      "https://gitbox.apache.org/repos/asf?p=lucene-solr.git"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/incubator/solr"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.3.1",
                          "app_version": "7.7.2",
                          "created": "2019-11-06T09:29:02.022Z",
                          "digest": "8366c52534fea3e11e099fbbb72645065e74c3bc253ae667fe7ed1e8732a16fa",
                          "urls": [
                              "https://kubernetes-charts-incubator.storage.googleapis.com/solr-1.3.1.tgz"
                          ],
                          "readme": "/v1/assets/incubator/solr/versions/1.3.1/README.md",
                          "values": "/v1/assets/incubator/solr/versions/1.3.1/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/incubator/solr/versions/1.3.1"
                      }
                  }
              }
          },
          {
              "id": "stable/sonarqube",
              "type": "chart",
              "attributes": {
                  "name": "sonarqube",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Sonarqube is an open sourced code quality scanning tool",
                  "home": "https://www.sonarqube.org/",
                  "keywords": [
                      "coverage",
                      "security",
                      "code",
                      "quality"
                  ],
                  "maintainers": [
                      {
                          "name": "rjkernick",
                          "email": "rjkernick@gmail.com"
                      },
                      {
                          "name": "tsiddique",
                          "email": "tsiddique@live.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/SonarSource/docker-sonarqube"
                  ],
                  "icon": "/v1/assets/stable/sonarqube/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/sonarqube"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "3.2.1",
                          "app_version": "7.9.1",
                          "created": "2019-11-06T08:58:33.804Z",
                          "digest": "fe83207fd486322cdb0ac8facb3e7bd5ceb39995625be125688d6bab553b83b3",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/sonarqube-3.2.1.tgz"
                          ],
                          "readme": "/v1/assets/stable/sonarqube/versions/3.2.1/README.md",
                          "values": "/v1/assets/stable/sonarqube/versions/3.2.1/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/sonarqube/versions/3.2.1"
                      }
                  }
              }
          },
          {
              "id": "stable/sonatype-nexus",
              "type": "chart",
              "attributes": {
                  "name": "sonatype-nexus",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Sonatype Nexus is an open source repository manager",
                  "home": "https://www.sonatype.com/nexus-repository-oss",
                  "keywords": [
                      "artifacts",
                      "dependency",
                      "management",
                      "sonatype",
                      "nexus",
                      "repository"
                  ],
                  "maintainers": [
                      {
                          "name": "rjkernick",
                          "email": "rjkernick@gmail.com"
                      },
                      {
                          "name": "tsiddique",
                          "email": "tsiddique@live.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/sonatype/nexus-public",
                      "https://github.com/travelaudience/docker-nexus",
                      "https://github.com/travelaudience/kubernetes-nexus",
                      "https://github.com/travelaudience/docker-nexus-backup"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/sonatype-nexus"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.20.0",
                          "app_version": "3.17.0-01",
                          "created": "2019-11-06T08:58:33.805Z",
                          "digest": "e3285748022a1635c4fa02cda0504792aa0e10dc44317396d059ca33fb44cb2f",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/sonatype-nexus-1.20.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/sonatype-nexus/versions/1.20.0/README.md",
                          "values": "/v1/assets/stable/sonatype-nexus/versions/1.20.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/sonatype-nexus/versions/1.20.0"
                      }
                  }
              }
          },
          {
              "id": "stable/spark",
              "type": "chart",
              "attributes": {
                  "name": "spark",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Fast and general-purpose cluster computing system.",
                  "home": "http://spark.apache.org",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "lachie83",
                          "email": "lachlan.evenson@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/kubernetes/kubernetes/tree/master/examples/spark",
                      "https://github.com/apache/spark"
                  ],
                  "icon": "/v1/assets/stable/spark/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/spark"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.0.0",
                          "app_version": "1.5.1",
                          "created": "2019-11-06T08:58:33.805Z",
                          "digest": "0185aafa73066a28202e1e840e0771f77e57912d0012d2157382fa9517c66ccf",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/spark-1.0.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/spark/versions/1.0.0/README.md",
                          "values": "/v1/assets/stable/spark/versions/1.0.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/spark/versions/1.0.0"
                      }
                  }
              }
          },
          {
              "id": "bitnami/spark",
              "type": "chart",
              "attributes": {
                  "name": "spark",
                  "repo": {
                      "name": "bitnami",
                      "url": "https://charts.bitnami.com/bitnami"
                  },
                  "description": "Spark is a fast and general-purpose cluster computing system.",
                  "home": "https://spark.apache.org/",
                  "keywords": [
                      "apache",
                      "spark"
                  ],
                  "maintainers": [
                      {
                          "name": "Bitnami",
                          "email": "containers@bitnami.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/bitnami/bitnami-docker-spark"
                  ],
                  "icon": "/v1/assets/bitnami/spark/logo"
              },
              "links": {
                  "self": "/v1/charts/bitnami/spark"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.0.11",
                          "app_version": "2.4.4",
                          "created": "2019-11-06T09:38:39.707Z",
                          "digest": "1c9818ddae33d8c530fb0d8c2296438b6c90583ec0dcbc7b72f25f70e4537508",
                          "urls": [
                              "https://charts.bitnami.com/bitnami/spark-1.0.11.tgz"
                          ],
                          "readme": "/v1/assets/bitnami/spark/versions/1.0.11/README.md",
                          "values": "/v1/assets/bitnami/spark/versions/1.0.11/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/bitnami/spark/versions/1.0.11"
                      }
                  }
              }
          },
          {
              "id": "incubator/spark",
              "type": "chart",
              "attributes": {
                  "name": "spark",
                  "repo": {
                      "name": "incubator",
                      "url": "https://kubernetes-charts-incubator.storage.googleapis.com"
                  },
                  "description": "A Apache Spark Helm chart for Kubernetes. Apache Spark is a fast and general-purpose cluster computing system",
                  "home": "http://spark.apache.org/",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "Lachlan Evenson",
                          "email": "lachlan.evenson@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/kubernetes/kubernetes/tree/master/examples/spark",
                      "https://github.com/apache/spark"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/incubator/spark"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.1.1",
                          "app_version": "",
                          "created": "2016-11-03T23:18:36.142Z",
                          "digest": "fa173c5dbd3713a9c80c6913eb5f84cb200d51205c9073cc2c77583f2fcb3cb2",
                          "urls": [
                              "http://storage.googleapis.com/kubernetes-charts-incubator/spark-0.1.1.tgz"
                          ],
                          "readme": "/v1/assets/incubator/spark/versions/0.1.1/README.md",
                          "values": "/v1/assets/incubator/spark/versions/0.1.1/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/incubator/spark/versions/0.1.1"
                      }
                  }
              }
          },
          {
              "id": "stable/spark-history-server",
              "type": "chart",
              "attributes": {
                  "name": "spark-history-server",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "A Helm chart for Spark History Server",
                  "home": "https://spark.apache.org",
                  "keywords": [
                      "spark",
                      "history-server"
                  ],
                  "maintainers": [
                      {
                          "name": "yuchaoran2011",
                          "email": "yuchaoran2011@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/apache/spark",
                      "https://github.com/lightbend/spark-history-server-docker"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/spark-history-server"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.1.1",
                          "app_version": "2.4.0",
                          "created": "2019-11-06T08:58:33.806Z",
                          "digest": "efec7188ef4a6046624d2ecabf81169e5c68c168785c060943cb892f21374379",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/spark-history-server-1.1.1.tgz"
                          ],
                          "readme": "/v1/assets/stable/spark-history-server/versions/1.1.1/README.md",
                          "values": "/v1/assets/stable/spark-history-server/versions/1.1.1/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/spark-history-server/versions/1.1.1"
                      }
                  }
              }
          },
          {
              "id": "incubator/sparkoperator",
              "type": "chart",
              "attributes": {
                  "name": "sparkoperator",
                  "repo": {
                      "name": "incubator",
                      "url": "https://kubernetes-charts-incubator.storage.googleapis.com"
                  },
                  "description": "A Helm chart for Spark on Kubernetes operator",
                  "home": "https://github.com/GoogleCloudPlatform/spark-on-k8s-operator",
                  "keywords": [
                      "spark"
                  ],
                  "maintainers": [
                      {
                          "name": "yuchaoran2011",
                          "email": "yuchaoran2011@gmail.com"
                      }
                  ],
                  "sources": [],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/incubator/sparkoperator"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.4.7",
                          "app_version": "v1beta2-1.0.1-2.4.4",
                          "created": "2019-11-06T09:29:02.023Z",
                          "digest": "307ee886c359b84a01898285306cf00f94141efc2c6830d125f4ae3b76799a11",
                          "urls": [
                              "https://kubernetes-charts-incubator.storage.googleapis.com/sparkoperator-0.4.7.tgz"
                          ],
                          "readme": "/v1/assets/incubator/sparkoperator/versions/0.4.7/README.md",
                          "values": "/v1/assets/incubator/sparkoperator/versions/0.4.7/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/incubator/sparkoperator/versions/0.4.7"
                      }
                  }
              }
          },
          {
              "id": "stable/spartakus",
              "type": "chart",
              "attributes": {
                  "name": "spartakus",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Collect information about Kubernetes clusters to help improve the project.",
                  "home": "https://www.shdlr.com",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "mgoodness",
                          "email": "mgoodness@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/kubernetes-incubator/spartakus"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/spartakus"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.1.6",
                          "app_version": "1.0.0",
                          "created": "2019-11-06T08:58:33.806Z",
                          "digest": "f90c229442fd2cd5c312c472fc3a4058f2268a8fe1e70f7f579f2c8796c8dbd1",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/spartakus-1.1.6.tgz"
                          ],
                          "readme": "/v1/assets/stable/spartakus/versions/1.1.6/README.md",
                          "values": "/v1/assets/stable/spartakus/versions/1.1.6/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/spartakus/versions/1.1.6"
                      }
                  }
              }
          },
          {
              "id": "stable/spinnaker",
              "type": "chart",
              "attributes": {
                  "name": "spinnaker",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Open source, multi-cloud continuous delivery platform for releasing software changes with high velocity and confidence.",
                  "home": "http://spinnaker.io/",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "viglesiasce",
                          "email": "viglesias@google.com"
                      },
                      {
                          "name": "lwander",
                          "email": "lwander@google.com"
                      },
                      {
                          "name": "dwardu89",
                          "email": "hello@dwardu.com"
                      },
                      {
                          "name": "paulczar",
                          "email": "username.taken@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/spinnaker",
                      "https://github.com/viglesiasce/images"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/spinnaker"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.22.0",
                          "app_version": "1.16.2",
                          "created": "2019-11-06T08:58:33.809Z",
                          "digest": "a5115c807c2cf6ea7afd4ecc053a5ae041318c0f17a9e66460820329104b898b",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/spinnaker-1.22.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/spinnaker/versions/1.22.0/README.md",
                          "values": "/v1/assets/stable/spinnaker/versions/1.22.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/spinnaker/versions/1.22.0"
                      }
                  }
              }
          },
          {
              "id": "stable/spotify-docker-gc",
              "type": "chart",
              "attributes": {
                  "name": "spotify-docker-gc",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "A simple Docker container and image garbage collection script.",
                  "home": "https://github.com/spotify/docker-gc",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "vdice",
                          "email": "vadice@microsoft.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/spotify/docker-gc"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/spotify-docker-gc"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.0.0",
                          "app_version": "latest",
                          "created": "2019-11-06T08:58:33.81Z",
                          "digest": "7f6bcbc55bbeb581dad7ddc7c4b15f0362cf0d8a876ff2123e2de42e829ac912",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/spotify-docker-gc-1.0.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/spotify-docker-gc/versions/1.0.0/README.md",
                          "values": "/v1/assets/stable/spotify-docker-gc/versions/1.0.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/spotify-docker-gc/versions/1.0.0"
                      }
                  }
              }
          },
          {
              "id": "stable/spring-cloud-data-flow",
              "type": "chart",
              "attributes": {
                  "name": "spring-cloud-data-flow",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Toolkit for building data processing pipelines.",
                  "home": "http://cloud.spring.io/spring-cloud-dataflow/",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "trisberg",
                          "email": "trisberg@pivotal.io"
                      },
                      {
                          "name": "chrisjs",
                          "email": "cschaefer@pivotal.io"
                      },
                      {
                          "name": "sabbyanandan",
                          "email": "sanandan@pivotal.io"
                      }
                  ],
                  "sources": [
                      "https://github.com/spring-cloud/spring-cloud-dataflow",
                      "https://github.com/spring-cloud/spring-cloud-skipper"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/spring-cloud-data-flow"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "2.4.3",
                          "app_version": "2.2.1.RELEASE",
                          "created": "2019-11-06T08:58:33.814Z",
                          "digest": "789ad7b01543efe66d68e9d6f976c3ffae46b14f58effa53270ccab2b8e64f35",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/spring-cloud-data-flow-2.4.3.tgz"
                          ],
                          "readme": "/v1/assets/stable/spring-cloud-data-flow/versions/2.4.3/README.md",
                          "values": "/v1/assets/stable/spring-cloud-data-flow/versions/2.4.3/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/spring-cloud-data-flow/versions/2.4.3"
                      }
                  }
              }
          },
          {
              "id": "stable/stackdriver-exporter",
              "type": "chart",
              "attributes": {
                  "name": "stackdriver-exporter",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Stackdriver exporter for Prometheus",
                  "home": "https://www.stackdriver.com/",
                  "keywords": [
                      "metrics",
                      "stackdriver",
                      "monitoring"
                  ],
                  "maintainers": [
                      {
                          "name": "apenney",
                          "email": "apenney@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/frodenas/stackdriver_exporter/releases"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/stackdriver-exporter"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.2.1",
                          "app_version": "0.6.0",
                          "created": "2019-11-06T08:58:33.814Z",
                          "digest": "5446b095584f45090286fdf4f37a4feb64edb4974a5928e48a99c01048e2b889",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/stackdriver-exporter-1.2.1.tgz"
                          ],
                          "readme": "/v1/assets/stable/stackdriver-exporter/versions/1.2.1/README.md",
                          "values": "/v1/assets/stable/stackdriver-exporter/versions/1.2.1/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/stackdriver-exporter/versions/1.2.1"
                      }
                  }
              }
          },
          {
              "id": "stable/stellar-core",
              "type": "chart",
              "attributes": {
                  "name": "stellar-core",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Backbone node of the Stellar cryptocurrency network.",
                  "home": "https://www.stellar.org",
                  "keywords": [
                      "stellar",
                      "stellar-core",
                      "cryptocurrency",
                      "blockchain"
                  ],
                  "maintainers": [
                      {
                          "name": "andrenarchy",
                          "email": "andre.extern@satoshipay.io"
                      },
                      {
                          "name": "rendhalver",
                          "email": "pete.brown@powerhrg.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/satoshipay/docker-stellar-core/"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/stellar-core"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.0.0",
                          "app_version": "10.0.0",
                          "created": "2019-11-06T08:58:33.816Z",
                          "digest": "4434b786a4da31f03e2037591063ae05ea07ebc72b63ef8e40f170ad7311ac84",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/stellar-core-1.0.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/stellar-core/versions/1.0.0/README.md",
                          "values": "/v1/assets/stable/stellar-core/versions/1.0.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/stellar-core/versions/1.0.0"
                      }
                  }
              }
          },
          {
              "id": "stable/stolon",
              "type": "chart",
              "attributes": {
                  "name": "stolon",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Stolon - PostgreSQL cloud native High Availability.",
                  "home": "https://github.com/sorintlab/stolon",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "rtluckie",
                          "email": "rluckie@cisco.com"
                      },
                      {
                          "name": "lwolf",
                          "email": "ipaq.lw@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/sorintlab/stolon",
                      "https://github.com/lwolf/stolon-chart"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/stolon"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.3.0",
                          "app_version": "0.13.0",
                          "created": "2019-11-06T08:58:33.817Z",
                          "digest": "30c60a6bafcbb0a5c5dbb84c04ab10f1d0208ceed687bad40609a6aaeef61c03",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/stolon-1.3.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/stolon/versions/1.3.0/README.md",
                          "values": "/v1/assets/stable/stolon/versions/1.3.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/stolon/versions/1.3.0"
                      }
                  }
              }
          },
          {
              "id": "bitnami/sugarcrm",
              "type": "chart",
              "attributes": {
                  "name": "sugarcrm",
                  "repo": {
                      "name": "bitnami",
                      "url": "https://charts.bitnami.com/bitnami"
                  },
                  "description": "SugarCRM enables businesses to create extraordinary customer relationships with the most innovative and affordable CRM solution in the market.",
                  "home": "http://www.sugarcrm.com/",
                  "keywords": [
                      "sugarcrm",
                      "CRM"
                  ],
                  "maintainers": [
                      {
                          "name": "Bitnami",
                          "email": "containers@bitnami.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/bitnami/bitnami-docker-sugarcrm"
                  ],
                  "icon": "/v1/assets/bitnami/sugarcrm/logo"
              },
              "links": {
                  "self": "/v1/charts/bitnami/sugarcrm"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.0.5",
                          "app_version": "6.5.26",
                          "created": "2018-05-25T08:15:15.741Z",
                          "digest": "84ee9229c20afac52c0994f148485bbb1475f22ea69674a500a4efbe073c9e3d",
                          "urls": [
                              "https://charts.bitnami.com/bitnami/sugarcrm-1.0.5.tgz"
                          ],
                          "readme": "/v1/assets/bitnami/sugarcrm/versions/1.0.5/README.md",
                          "values": "/v1/assets/bitnami/sugarcrm/versions/1.0.5/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/bitnami/sugarcrm/versions/1.0.5"
                      }
                  }
              }
          },
          {
              "id": "bitnami/suitecrm",
              "type": "chart",
              "attributes": {
                  "name": "suitecrm",
                  "repo": {
                      "name": "bitnami",
                      "url": "https://charts.bitnami.com/bitnami"
                  },
                  "description": "SuiteCRM is a completely open source enterprise-grade Customer Relationship Management (CRM) application. SuiteCRM is a software fork of the popular customer relationship management (CRM) system SugarCRM.",
                  "home": "http://www.suitecrm.com",
                  "keywords": [
                      "suitecrm",
                      "CRM"
                  ],
                  "maintainers": [
                      {
                          "name": "Bitnami",
                          "email": "containers@bitnami.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/bitnami/bitnami-docker-suitecrm"
                  ],
                  "icon": "/v1/assets/bitnami/suitecrm/logo"
              },
              "links": {
                  "self": "/v1/charts/bitnami/suitecrm"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "7.2.8",
                          "app_version": "7.11.8",
                          "created": "2019-11-06T09:38:39.708Z",
                          "digest": "75170a2efe967824fe7ba6c8b967013d7bd23a9d2aba0d5fb33fb6cf520bdce1",
                          "urls": [
                              "https://charts.bitnami.com/bitnami/suitecrm-7.2.8.tgz"
                          ],
                          "readme": "/v1/assets/bitnami/suitecrm/versions/7.2.8/README.md",
                          "values": "/v1/assets/bitnami/suitecrm/versions/7.2.8/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/bitnami/suitecrm/versions/7.2.8"
                      }
                  }
              }
          },
          {
              "id": "stable/sumokube",
              "type": "chart",
              "attributes": {
                  "name": "sumokube",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Sumologic Log Collector",
                  "home": "https://www.sumologic.com/",
                  "keywords": [
                      "monitoring",
                      "logging"
                  ],
                  "maintainers": [
                      {
                          "name": "jdumars",
                          "email": "jdumars+github@gmail.com"
                      },
                      {
                          "name": "seanknox",
                          "email": "knoxville+github@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/SumoLogic/sumologic-collector-docker"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/sumokube"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.0.0",
                          "app_version": "latest",
                          "created": "2019-11-06T08:58:33.819Z",
                          "digest": "9640019230d66d7bd66c769bb0a6096242aeff5df75fbe1b567ae9c1d40ccd14",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/sumokube-1.0.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/sumokube/versions/1.0.0/README.md",
                          "values": "/v1/assets/stable/sumokube/versions/1.0.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/sumokube/versions/1.0.0"
                      }
                  }
              }
          },
          {
              "id": "stable/sumologic-fluentd",
              "type": "chart",
              "attributes": {
                  "name": "sumologic-fluentd",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Sumologic Log Collector",
                  "home": "https://github.com/SumoLogic/fluentd-kubernetes-sumologic",
                  "keywords": [
                      "monitoring",
                      "logging"
                  ],
                  "maintainers": [
                      {
                          "name": "flah00",
                          "email": "techops@adaptly.com"
                      },
                      {
                          "name": "frankreno",
                          "email": "freno@sumologic.com"
                      },
                      {
                          "name": "darend",
                          "email": "darend@gmail.com"
                      },
                      {
                          "name": "bendrucker",
                          "email": "ben@takescoop.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/SumoLogic/fluentd-kubernetes-sumologic"
                  ],
                  "icon": "/v1/assets/stable/sumologic-fluentd/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/sumologic-fluentd"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "2.0.1",
                          "app_version": "2.3.0",
                          "created": "2019-11-06T08:58:33.82Z",
                          "digest": "4d2bd45d9a41ab2855dd628436c2e26ffd2f4c6593f36269bc6065684ffd81f2",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/sumologic-fluentd-2.0.1.tgz"
                          ],
                          "readme": "/v1/assets/stable/sumologic-fluentd/versions/2.0.1/README.md",
                          "values": "/v1/assets/stable/sumologic-fluentd/versions/2.0.1/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/sumologic-fluentd/versions/2.0.1"
                      }
                  }
              }
          },
          {
              "id": "stable/superset",
              "type": "chart",
              "attributes": {
                  "name": "superset",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Apache Superset (incubating) is a modern, enterprise-ready business intelligence web application",
                  "home": "https://github.com/apache/incubator-superset",
                  "keywords": [
                      "bi"
                  ],
                  "maintainers": [
                      {
                          "name": "alitari",
                          "email": "alitari67@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/apache/incubator-superset"
                  ],
                  "icon": "/v1/assets/stable/superset/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/superset"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.1.7",
                          "app_version": "0.28.1",
                          "created": "2019-11-06T08:58:33.821Z",
                          "digest": "7c2ae49a5adb6ba95939dbd3324d109b23a337b91a98f90991a95ea2883c87b6",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/superset-1.1.7.tgz"
                          ],
                          "readme": "/v1/assets/stable/superset/versions/1.1.7/README.md",
                          "values": "/v1/assets/stable/superset/versions/1.1.7/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/superset/versions/1.1.7"
                      }
                  }
              }
          },
          {
              "id": "stable/sysdig",
              "type": "chart",
              "attributes": {
                  "name": "sysdig",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Sysdig Monitor and Secure agent",
                  "home": "https://www.sysdig.com/",
                  "keywords": [
                      "monitoring",
                      "security",
                      "alerting",
                      "metric",
                      "troubleshooting",
                      "run-time"
                  ],
                  "maintainers": [
                      {
                          "name": "lachie83",
                          "email": "lachlan@deis.com"
                      },
                      {
                          "name": "bencer",
                          "email": "jorge.salamero@sysdig.com"
                      },
                      {
                          "name": "nestorsalceda",
                          "email": "nestor.salceda@sysdig.com"
                      }
                  ],
                  "sources": [
                      "https://app.sysdigcloud.com/#/settings/user",
                      "https://github.com/draios/sysdig"
                  ],
                  "icon": "/v1/assets/stable/sysdig/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/sysdig"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.4.21",
                          "app_version": "0.92.3",
                          "created": "2019-11-06T08:58:33.822Z",
                          "digest": "2236aef59ee68d8580c86d55d4f20e6b345d3fe79ec63bfdd748c06e835cdb34",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/sysdig-1.4.21.tgz"
                          ],
                          "readme": "/v1/assets/stable/sysdig/versions/1.4.21/README.md",
                          "values": "/v1/assets/stable/sysdig/versions/1.4.21/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/sysdig/versions/1.4.21"
                      }
                  }
              }
          },
          {
              "id": "stable/telegraf",
              "type": "chart",
              "attributes": {
                  "name": "telegraf",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Telegraf is an agent written in Go for collecting, processing, aggregating, and writing metrics.",
                  "home": "https://www.influxdata.com/time-series-platform/telegraf/",
                  "keywords": [
                      "telegraf",
                      "collector",
                      "timeseries",
                      "influxdata"
                  ],
                  "maintainers": [
                      {
                          "name": "naseemkullah",
                          "email": "naseemkullah@gmail.com"
                      }
                  ],
                  "sources": [],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/telegraf"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.1.9",
                          "app_version": "1.12",
                          "created": "2019-11-06T08:58:33.823Z",
                          "digest": "e088f9c300db8c59f6af82794f14a3ab1b185512ac157184b2d59649cfc27bff",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/telegraf-1.1.9.tgz"
                          ],
                          "readme": "/v1/assets/stable/telegraf/versions/1.1.9/README.md",
                          "values": "/v1/assets/stable/telegraf/versions/1.1.9/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/telegraf/versions/1.1.9"
                      }
                  }
              }
          },
          {
              "id": "incubator/tensorflow-inception",
              "type": "chart",
              "attributes": {
                  "name": "tensorflow-inception",
                  "repo": {
                      "name": "incubator",
                      "url": "https://kubernetes-charts-incubator.storage.googleapis.com"
                  },
                  "description": "Open source software library for numerical computation using data flow graphs.",
                  "home": "https://github.com/kubernetes/charts",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "lachie83",
                          "email": "lachlan.evenson@gmail.com"
                      },
                      {
                          "name": "thomasjungblut",
                          "email": "thomas.jungblut@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/tensorflow/",
                      "https://tensorflow.github.io/serving/serving_inception.html"
                  ],
                  "icon": "/v1/assets/incubator/tensorflow-inception/logo"
              },
              "links": {
                  "self": "/v1/charts/incubator/tensorflow-inception"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.4.1",
                          "app_version": "1.4.0",
                          "created": "2019-11-06T09:29:02.024Z",
                          "digest": "b3af73560ee1f980f9de70e47c6fea5831202b008ad3cca3f7e817a2a95ffe00",
                          "urls": [
                              "https://kubernetes-charts-incubator.storage.googleapis.com/tensorflow-inception-0.4.1.tgz"
                          ],
                          "readme": "/v1/assets/incubator/tensorflow-inception/versions/0.4.1/README.md",
                          "values": "/v1/assets/incubator/tensorflow-inception/versions/0.4.1/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/incubator/tensorflow-inception/versions/0.4.1"
                      }
                  }
              }
          },
          {
              "id": "bitnami/tensorflow-inception",
              "type": "chart",
              "attributes": {
                  "name": "tensorflow-inception",
                  "repo": {
                      "name": "bitnami",
                      "url": "https://charts.bitnami.com/bitnami"
                  },
                  "description": "Open-source software library for serving machine learning models",
                  "home": "https://www.tensorflow.org/serving/",
                  "keywords": [
                      "tensorflow",
                      "serving",
                      "inception",
                      "machine",
                      "learning",
                      "library"
                  ],
                  "maintainers": [
                      {
                          "name": "Bitnami",
                          "email": "containers@bitnami.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/bitnami/bitnami-docker-tensorflow-serving",
                      "https://github.com/bitnami/bitnami-docker-tensorflow-inception"
                  ],
                  "icon": "/v1/assets/bitnami/tensorflow-inception/logo"
              },
              "links": {
                  "self": "/v1/charts/bitnami/tensorflow-inception"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "3.3.1",
                          "app_version": "1.13.0",
                          "created": "2019-05-07T10:31:52.46Z",
                          "digest": "4b4c6ab8537294ecbd51d746946e48c7a3902bb246198fc085d75b36d88f0124",
                          "urls": [
                              "https://charts.bitnami.com/bitnami/tensorflow-inception-3.3.1.tgz"
                          ],
                          "readme": "/v1/assets/bitnami/tensorflow-inception/versions/3.3.1/README.md",
                          "values": "/v1/assets/bitnami/tensorflow-inception/versions/3.3.1/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/bitnami/tensorflow-inception/versions/3.3.1"
                      }
                  }
              }
          },
          {
              "id": "stable/tensorflow-notebook",
              "type": "chart",
              "attributes": {
                  "name": "tensorflow-notebook",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "A Helm chart for tensorflow notebook and tensorboard",
                  "home": "https://www.tensorflow.org",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "cheyang",
                          "email": "cheyang@163.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/tensorflow/tensorflow",
                      "https://github.com/jupyter"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/tensorflow-notebook"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.1.3",
                          "app_version": "1.6.0",
                          "created": "2019-11-06T08:58:33.823Z",
                          "digest": "1e38df3b056c1c47c6f99428a85591f85364144619109ff491e48f0188880885",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/tensorflow-notebook-0.1.3.tgz"
                          ],
                          "readme": "/v1/assets/stable/tensorflow-notebook/versions/0.1.3/README.md",
                          "values": "/v1/assets/stable/tensorflow-notebook/versions/0.1.3/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/tensorflow-notebook/versions/0.1.3"
                      }
                  }
              }
          },
          {
              "id": "bitnami/tensorflow-resnet",
              "type": "chart",
              "attributes": {
                  "name": "tensorflow-resnet",
                  "repo": {
                      "name": "bitnami",
                      "url": "https://charts.bitnami.com/bitnami"
                  },
                  "description": "Open-source software library serving the ResNet machine learning model.",
                  "home": "https://www.tensorflow.org/serving/",
                  "keywords": [
                      "tensorflow",
                      "serving",
                      "resnet",
                      "machine",
                      "learning",
                      "library"
                  ],
                  "maintainers": [
                      {
                          "name": "Bitnami",
                          "email": "containers@bitnami.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/bitnami/bitnami-docker-tensorflow-serving",
                      "https://github.com/bitnami/bitnami-docker-tensorflow-resnet"
                  ],
                  "icon": "/v1/assets/bitnami/tensorflow-resnet/logo"
              },
              "links": {
                  "self": "/v1/charts/bitnami/tensorflow-resnet"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.2.8",
                          "app_version": "1.14.0",
                          "created": "2019-11-06T09:38:39.709Z",
                          "digest": "6ccd22fec158ac8c6e12263be54e29230f9e8c1ff222a3d46100e4805c455be6",
                          "urls": [
                              "https://charts.bitnami.com/bitnami/tensorflow-resnet-1.2.8.tgz"
                          ],
                          "readme": "/v1/assets/bitnami/tensorflow-resnet/versions/1.2.8/README.md",
                          "values": "/v1/assets/bitnami/tensorflow-resnet/versions/1.2.8/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/bitnami/tensorflow-resnet/versions/1.2.8"
                      }
                  }
              }
          },
          {
              "id": "stable/tensorflow-serving",
              "type": "chart",
              "attributes": {
                  "name": "tensorflow-serving",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "TensorFlow Serving is an open-source software library for serving machine learning models.",
                  "home": "https://github.com/kubernetes/charts",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "cheyang",
                          "email": "cheyang@163.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/tensorflow/serving"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/tensorflow-serving"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.0.1",
                          "app_version": "1.14.0",
                          "created": "2019-11-06T08:58:33.824Z",
                          "digest": "7c8009057ac1a9aab33726e08147730ce8e89aa1f6d22c5c167c93f9796c661e",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/tensorflow-serving-1.0.1.tgz"
                          ],
                          "readme": "/v1/assets/stable/tensorflow-serving/versions/1.0.1/README.md",
                          "values": "/v1/assets/stable/tensorflow-serving/versions/1.0.1/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/tensorflow-serving/versions/1.0.1"
                      }
                  }
              }
          },
          {
              "id": "stable/terracotta",
              "type": "chart",
              "attributes": {
                  "name": "terracotta",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Terracotta Ehcache is an improved version of Java's de facto caching API, Ehcache. It has a powerful, streamlined, modernized caching API taking advantage of newer Java features as well as the capability to be used via the JSR-107 \"JCache\" API.",
                  "home": "http://www.terracotta.org/",
                  "keywords": [
                      "terracotta",
                      "jcache",
                      "in-memory",
                      "caching"
                  ],
                  "maintainers": [
                      {
                          "name": "anthonydahanne",
                          "email": "anthonydahanne@softwareag.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/Terracotta-OSS"
                  ],
                  "icon": "/v1/assets/stable/terracotta/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/terracotta"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.1.0",
                          "app_version": "5.6.0",
                          "created": "2019-11-06T08:58:33.825Z",
                          "digest": "9e9ad51e617fe7809b8c29a68c06dcaf492f6ffe36f6b6a1ff8cb6ffdf3e53d2",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/terracotta-1.1.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/terracotta/versions/1.1.0/README.md",
                          "values": "/v1/assets/stable/terracotta/versions/1.1.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/terracotta/versions/1.1.0"
                      }
                  }
              }
          },
          {
              "id": "svc-cat/test-broker",
              "type": "chart",
              "attributes": {
                  "name": "test-broker",
                  "repo": {
                      "name": "svc-cat",
                      "url": "https://svc-catalog-charts.storage.googleapis.com"
                  },
                  "description": "test service-broker deployment Helm chart.",
                  "home": "",
                  "keywords": [],
                  "maintainers": [],
                  "sources": [],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/svc-cat/test-broker"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.3.0-beta.2",
                          "app_version": "",
                          "created": "2019-11-05T19:13:49.284Z",
                          "digest": "411d06ea6b7c3fa104a2cc57c95b48277a109ba89d773eb14b52f7aacf468e98",
                          "urls": [
                              "https://svc-catalog-charts.storage.googleapis.com/test-broker-0.3.0-beta.2.tgz"
                          ],
                          "readme": "/v1/assets/svc-cat/test-broker/versions/0.3.0-beta.2/README.md",
                          "values": "/v1/assets/svc-cat/test-broker/versions/0.3.0-beta.2/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/svc-cat/test-broker/versions/0.3.0-beta.2"
                      }
                  }
              }
          },
          {
              "id": "bitnami/testlink",
              "type": "chart",
              "attributes": {
                  "name": "testlink",
                  "repo": {
                      "name": "bitnami",
                      "url": "https://charts.bitnami.com/bitnami"
                  },
                  "description": "Web-based test management system that facilitates software quality assurance.",
                  "home": "http://www.testlink.org/",
                  "keywords": [
                      "testlink",
                      "testing",
                      "http",
                      "php"
                  ],
                  "maintainers": [
                      {
                          "name": "Bitnami",
                          "email": "containers@bitnami.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/bitnami/bitnami-docker-testlink"
                  ],
                  "icon": "/v1/assets/bitnami/testlink/logo"
              },
              "links": {
                  "self": "/v1/charts/bitnami/testlink"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "6.3.6",
                          "app_version": "1.9.19",
                          "created": "2019-11-06T09:38:39.712Z",
                          "digest": "3eb62045f533df7e93aee67bc68580e20b13c1c9639029320ce74f9dbe452358",
                          "urls": [
                              "https://charts.bitnami.com/bitnami/testlink-6.3.6.tgz"
                          ],
                          "readme": "/v1/assets/bitnami/testlink/versions/6.3.6/README.md",
                          "values": "/v1/assets/bitnami/testlink/versions/6.3.6/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/bitnami/testlink/versions/6.3.6"
                      }
                  }
              }
          },
          {
              "id": "stable/tomcat",
              "type": "chart",
              "attributes": {
                  "name": "tomcat",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Deploy a basic tomcat application server with sidecar as web archive container",
                  "home": "https://github.com/yahavb",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "yahavb",
                          "email": "ybiran@ananware.systems"
                      }
                  ],
                  "sources": [],
                  "icon": "/v1/assets/stable/tomcat/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/tomcat"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.4.0",
                          "app_version": "7.0",
                          "created": "2019-11-06T08:58:33.828Z",
                          "digest": "affdb284a5a6df38afdcfcd5791661a98aeb5e8fe0a0a9cf0dbd02b94ec70a97",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/tomcat-0.4.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/tomcat/versions/0.4.0/README.md",
                          "values": "/v1/assets/stable/tomcat/versions/0.4.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/tomcat/versions/0.4.0"
                      }
                  }
              }
          },
          {
              "id": "bitnami/tomcat",
              "type": "chart",
              "attributes": {
                  "name": "tomcat",
                  "repo": {
                      "name": "bitnami",
                      "url": "https://charts.bitnami.com/bitnami"
                  },
                  "description": "Chart for Apache Tomcat",
                  "home": "http://tomcat.apache.org",
                  "keywords": [
                      "tomcat",
                      "java",
                      "http",
                      "web",
                      "application server",
                      "jsp"
                  ],
                  "maintainers": [
                      {
                          "name": "Bitnami",
                          "email": "containers@bitnami.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/bitnami/bitnami-docker-tomcat"
                  ],
                  "icon": "/v1/assets/bitnami/tomcat/logo"
              },
              "links": {
                  "self": "/v1/charts/bitnami/tomcat"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "6.0.4",
                          "app_version": "9.0.27",
                          "created": "2019-11-06T09:38:39.713Z",
                          "digest": "72bc84f22e7587f8a7737517a241e7cd91a769cb9a2a8cb37b4faca4d617e6a9",
                          "urls": [
                              "https://charts.bitnami.com/bitnami/tomcat-6.0.4.tgz"
                          ],
                          "readme": "/v1/assets/bitnami/tomcat/versions/6.0.4/README.md",
                          "values": "/v1/assets/bitnami/tomcat/versions/6.0.4/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/bitnami/tomcat/versions/6.0.4"
                      }
                  }
              }
          },
          {
              "id": "stable/traefik",
              "type": "chart",
              "attributes": {
                  "name": "traefik",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "A Traefik based Kubernetes ingress controller with Let's Encrypt support",
                  "home": "https://traefik.io/",
                  "keywords": [
                      "traefik",
                      "ingress",
                      "acme",
                      "letsencrypt"
                  ],
                  "maintainers": [
                      {
                          "name": "krancour",
                          "email": "kent.rancourt@microsoft.com"
                      },
                      {
                          "name": "emilevauge",
                          "email": "emile@vauge.com"
                      },
                      {
                          "name": "dtomcej",
                          "email": "daniel.tomcej@gmail.com"
                      },
                      {
                          "name": "ldez",
                          "email": "ludovic@containo.us"
                      }
                  ],
                  "sources": [
                      "https://github.com/containous/traefik",
                      "https://github.com/helm/charts/tree/master/stable/traefik"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/traefik"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.79.0",
                          "app_version": "1.7.14",
                          "created": "2019-11-06T08:58:33.83Z",
                          "digest": "0fa039746d7fd8efbbe5255a60a29670967102fe7baa0d0f1155bfb0c41d4ed9",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/traefik-1.79.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/traefik/versions/1.79.0/README.md",
                          "values": "/v1/assets/stable/traefik/versions/1.79.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/traefik/versions/1.79.0"
                      }
                  }
              }
          },
          {
              "id": "stable/uchiwa",
              "type": "chart",
              "attributes": {
                  "name": "uchiwa",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Dashboard for the Sensu monitoring framework",
                  "home": "https://uchiwa.io/",
                  "keywords": [
                      "uchiwa",
                      "sensu",
                      "monitoring"
                  ],
                  "maintainers": [
                      {
                          "name": "sstarcher",
                          "email": "shane.starcher@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/kubernetes/charts",
                      "https://github.com/sstarcher/docker-uchiwa",
                      "https://github.com/sensu/uchiwa"
                  ],
                  "icon": "/v1/assets/stable/uchiwa/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/uchiwa"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.0.0",
                          "app_version": "0.22",
                          "created": "2019-11-06T08:58:33.831Z",
                          "digest": "e80a9a651d1449f473bb9d6b83787cbfe0c054d8a69390a909d601235517c789",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/uchiwa-1.0.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/uchiwa/versions/1.0.0/README.md",
                          "values": "/v1/assets/stable/uchiwa/versions/1.0.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/uchiwa/versions/1.0.0"
                      }
                  }
              }
          },
          {
              "id": "stable/unbound",
              "type": "chart",
              "attributes": {
                  "name": "unbound",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Unbound is a fast caching DNS resolver",
                  "home": "https://www.unbound.net/",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "Markbnj",
                          "email": "betz.mark@gmail.com"
                      }
                  ],
                  "sources": [
                      "http://unbound.nlnetlabs.nl/svn/",
                      "https://github.com/Markbnj/unbound-docker",
                      "https://github.com/kubernetes/contrib/tree/master/exec-healthz"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/unbound"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.0.0",
                          "app_version": "1.6.7",
                          "created": "2019-11-06T08:58:33.832Z",
                          "digest": "52eae26f1c86a81197f99493dbf2a62c62901bc78a27b80aa876c2e1cecbfed6",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/unbound-1.0.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/unbound/versions/1.0.0/README.md",
                          "values": "/v1/assets/stable/unbound/versions/1.0.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/unbound/versions/1.0.0"
                      }
                  }
              }
          },
          {
              "id": "stable/unifi",
              "type": "chart",
              "attributes": {
                  "name": "unifi",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Ubiquiti Network's Unifi Controller",
                  "home": "https://github.com/jacobalberty/unifi-docker",
                  "keywords": [
                      "ubiquiti",
                      "unifi",
                      "mongodb"
                  ],
                  "maintainers": [
                      {
                          "name": "billimek",
                          "email": "jeff@billimek.com"
                      },
                      {
                          "name": "mcronce",
                          "email": "mike@quadra-tec.net"
                      }
                  ],
                  "sources": [
                      "https://github.com/jacobalberty/unifi-docker",
                      "https://github.com/helm/charts/tree/master/stable/unifi"
                  ],
                  "icon": "/v1/assets/stable/unifi/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/unifi"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.5.1",
                          "app_version": "5.11.50",
                          "created": "2019-11-06T08:58:33.833Z",
                          "digest": "e7b751b5f660a8c63b6dc3c9fd28859894df3f782dd614e62d2e580d3f68c0a7",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/unifi-0.5.1.tgz"
                          ],
                          "readme": "/v1/assets/stable/unifi/versions/0.5.1/README.md",
                          "values": "/v1/assets/stable/unifi/versions/0.5.1/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/unifi/versions/0.5.1"
                      }
                  }
              }
          },
          {
              "id": "svc-cat/ups-broker",
              "type": "chart",
              "attributes": {
                  "name": "ups-broker",
                  "repo": {
                      "name": "svc-cat",
                      "url": "https://svc-catalog-charts.storage.googleapis.com"
                  },
                  "description": "user-provided service-broker deployment Helm chart.",
                  "home": "",
                  "keywords": [],
                  "maintainers": [],
                  "sources": [],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/svc-cat/ups-broker"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.3.0-beta.2",
                          "app_version": "",
                          "created": "2019-11-05T19:13:49.284Z",
                          "digest": "a6cd1e188915d8a537801c0c8b00e42a62c4892f699c85ca92157add751d1cb2",
                          "urls": [
                              "https://svc-catalog-charts.storage.googleapis.com/ups-broker-0.3.0-beta.2.tgz"
                          ],
                          "readme": "/v1/assets/svc-cat/ups-broker/versions/0.3.0-beta.2/README.md",
                          "values": "/v1/assets/svc-cat/ups-broker/versions/0.3.0-beta.2/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/svc-cat/ups-broker/versions/0.3.0-beta.2"
                      }
                  }
              }
          },
          {
              "id": "incubator/vault",
              "type": "chart",
              "attributes": {
                  "name": "vault",
                  "repo": {
                      "name": "incubator",
                      "url": "https://kubernetes-charts-incubator.storage.googleapis.com"
                  },
                  "description": "A Helm chart for Vault, a tool for managing secrets",
                  "home": "https://www.vaultproject.io/",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "jpds",
                          "email": "jpds@protonmail.com"
                      },
                      {
                          "name": "jbialy",
                          "email": "jbialy@gmail.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/hashicorp/vault",
                      "https://github.com/hashicorp/docker-vault"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/incubator/vault"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.23.0",
                          "app_version": "1.2.3",
                          "created": "2019-11-06T09:29:02.025Z",
                          "digest": "bfa9656d6d254abe37336d0506180cf6e2f945aa6b3b324f3d72da860324d866",
                          "urls": [
                              "https://kubernetes-charts-incubator.storage.googleapis.com/vault-0.23.0.tgz"
                          ],
                          "readme": "/v1/assets/incubator/vault/versions/0.23.0/README.md",
                          "values": "/v1/assets/incubator/vault/versions/0.23.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/incubator/vault/versions/0.23.0"
                      }
                  }
              }
          },
          {
              "id": "stable/vault-operator",
              "type": "chart",
              "attributes": {
                  "name": "vault-operator",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "CoreOS vault-operator Helm chart for Kubernetes",
                  "home": "https://github.com/coreos/vault-operator",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "mlaccetti",
                          "email": "michael@laccetti.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/coreos/vault-operator"
                  ],
                  "icon": "/v1/assets/stable/vault-operator/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/vault-operator"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.1.1",
                          "app_version": "0.1.9",
                          "created": "2019-11-06T08:58:33.834Z",
                          "digest": "4db7e470842ae3af424ee0a6aed36028749afe49c77a55ff67f38de84aac53a8",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/vault-operator-0.1.1.tgz"
                          ],
                          "readme": "/v1/assets/stable/vault-operator/versions/0.1.1/README.md",
                          "values": "/v1/assets/stable/vault-operator/versions/0.1.1/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/vault-operator/versions/0.1.1"
                      }
                  }
              }
          },
          {
              "id": "incubator/vaultingkube",
              "type": "chart",
              "attributes": {
                  "name": "vaultingkube",
                  "repo": {
                      "name": "incubator",
                      "url": "https://kubernetes-charts-incubator.storage.googleapis.com"
                  },
                  "description": "vaultingkube takes config maps and secrets stored inside Hashicorp Vault and syncs them to your Kubernetes cluster.",
                  "home": "https://github.com/sunshinekitty/vaultingkube",
                  "keywords": [],
                  "maintainers": [],
                  "sources": [],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/incubator/vaultingkube"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.1.2",
                          "app_version": "0.1.1",
                          "created": "2019-11-06T09:29:02.025Z",
                          "digest": "835dbd6a81f2a11629b0b8ceedc1322c95bb1de41dce1ebe3f6fc221327d3d44",
                          "urls": [
                              "https://kubernetes-charts-incubator.storage.googleapis.com/vaultingkube-0.1.2.tgz"
                          ],
                          "readme": "/v1/assets/incubator/vaultingkube/versions/0.1.2/README.md",
                          "values": "/v1/assets/incubator/vaultingkube/versions/0.1.2/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/incubator/vaultingkube/versions/0.1.2"
                      }
                  }
              }
          },
          {
              "id": "stable/velero",
              "type": "chart",
              "attributes": {
                  "name": "velero",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "A Helm chart for velero",
                  "home": "https://github.com/vmware-tanzu/velero",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "domcar",
                          "email": "d-caruso@hotmail.it"
                      },
                      {
                          "name": "hectorj2f",
                          "email": "hfernandez@mesosphere.com"
                      },
                      {
                          "name": "nrb",
                          "email": "brubakern@vmware.com"
                      },
                      {
                          "name": "prydonius",
                          "email": "aadnan@vmware.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/vmware-tanzu/velero"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/velero"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "2.3.0",
                          "app_version": "1.1.0",
                          "created": "2019-11-06T08:58:33.835Z",
                          "digest": "67b4f01065478ace19dc6e2d29353809d3a1cbf438b41b52952da3f0c8f3726c",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/velero-2.3.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/velero/versions/2.3.0/README.md",
                          "values": "/v1/assets/stable/velero/versions/2.3.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/velero/versions/2.3.0"
                      }
                  }
              }
          },
          {
              "id": "stable/verdaccio",
              "type": "chart",
              "attributes": {
                  "name": "verdaccio",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "A lightweight private npm proxy registry (sinopia fork)",
                  "home": "http://www.verdaccio.org",
                  "keywords": [
                      "npm",
                      "nodejs"
                  ],
                  "maintainers": [
                      {
                          "name": "etiennetremel",
                          "email": "etienne.tremel@container-solutions.com"
                      }
                  ],
                  "sources": [
                      "http://www.verdaccio.org",
                      "https://github.com/verdaccio/verdaccio"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/verdaccio"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.7.2",
                          "app_version": "3.11.6",
                          "created": "2019-11-06T08:58:33.836Z",
                          "digest": "758062b7126fada11bd8cf2d4dd6a18b9a319b8ca012f5a07773541076515516",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/verdaccio-0.7.2.tgz"
                          ],
                          "readme": "/v1/assets/stable/verdaccio/versions/0.7.2/README.md",
                          "values": "/v1/assets/stable/verdaccio/versions/0.7.2/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/verdaccio/versions/0.7.2"
                      }
                  }
              }
          },
          {
              "id": "stable/wavefront",
              "type": "chart",
              "attributes": {
                  "name": "wavefront",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Wavefront Kubernetes collector",
                  "home": "https://www.wavefront.com",
                  "keywords": [
                      "metric",
                      "monitoring",
                      "observability",
                      "alerting"
                  ],
                  "maintainers": [
                      {
                          "name": "vikramraman",
                          "email": "rvikram@vmware.com"
                      },
                      {
                          "name": "puckpuck",
                          "email": "pierre@wavefront.com"
                      },
                      {
                          "name": "krisclarkdev",
                          "email": "clarkk@vmware.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/wavefrontHQ/wavefront-kubernetes-collector",
                      "https://github.com/wavefrontHQ/java/tree/master/proxy"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/wavefront"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.0.0",
                          "app_version": "0.9.7",
                          "created": "2019-11-06T08:58:33.838Z",
                          "digest": "cd8ae810f57d8eac209963702e36d6f0bd618b33d95ee14224d4b6b864c4a05c",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/wavefront-1.0.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/wavefront/versions/1.0.0/README.md",
                          "values": "/v1/assets/stable/wavefront/versions/1.0.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/wavefront/versions/1.0.0"
                      }
                  }
              }
          },
          {
              "id": "stable/weave-cloud",
              "type": "chart",
              "attributes": {
                  "name": "weave-cloud",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Weave Cloud is a add-on to Kubernetes which provides Continuous Delivery, along with hosted Prometheus Monitoring and a visual dashboard for exploring & debugging microservices\n",
                  "home": "https://weave.works",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "errordeveloper",
                          "email": "ilya@weave.works"
                      },
                      {
                          "name": "stefanprodan",
                          "email": "stefan@weave.works"
                      }
                  ],
                  "sources": [],
                  "icon": "/v1/assets/stable/weave-cloud/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/weave-cloud"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.3.5",
                          "app_version": "1.3.0",
                          "created": "2019-11-06T08:58:33.838Z",
                          "digest": "fc73ce27e9c7e22ee11d62e3128dd5857f4156f22b47d69a1a781c20c9966a41",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/weave-cloud-0.3.5.tgz"
                          ],
                          "readme": "/v1/assets/stable/weave-cloud/versions/0.3.5/README.md",
                          "values": "/v1/assets/stable/weave-cloud/versions/0.3.5/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/weave-cloud/versions/0.3.5"
                      }
                  }
              }
          },
          {
              "id": "stable/weave-scope",
              "type": "chart",
              "attributes": {
                  "name": "weave-scope",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "A Helm chart for the Weave Scope cluster visualizer.",
                  "home": "https://www.weave.works/oss/scope/",
                  "keywords": [
                      "containers",
                      "dashboard",
                      "monitoring"
                  ],
                  "maintainers": [
                      {
                          "name": "omkensey",
                          "email": "github@orion-com.com"
                      },
                      {
                          "name": "dholbach",
                          "email": "daniel@weave.works"
                      },
                      {
                          "name": "fbarl",
                          "email": "filip@weave.works"
                      },
                      {
                          "name": "bboreham",
                          "email": "bryan@weave.works"
                      }
                  ],
                  "sources": [
                      "https://github.com/weaveworks/scope"
                  ],
                  "icon": "/v1/assets/stable/weave-scope/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/weave-scope"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.1.6",
                          "app_version": "1.11.6",
                          "created": "2019-11-06T08:58:33.84Z",
                          "digest": "9d4ab53ddb563131b725d623c862d37045c0a3e66ca4719fe03f10fc61e30c0f",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/weave-scope-1.1.6.tgz"
                          ],
                          "readme": "/v1/assets/stable/weave-scope/versions/1.1.6/README.md",
                          "values": "/v1/assets/stable/weave-scope/versions/1.1.6/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/weave-scope/versions/1.1.6"
                      }
                  }
              }
          },
          {
              "id": "incubator/webpagetest-agent",
              "type": "chart",
              "attributes": {
                  "name": "webpagetest-agent",
                  "repo": {
                      "name": "incubator",
                      "url": "https://kubernetes-charts-incubator.storage.googleapis.com"
                  },
                  "description": "A Helm chart for Kubernetes",
                  "home": "https://www.webpagetest.org/",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "timothyclarke",
                          "email": "ghtimothy@timothy.fromnz.net"
                      },
                      {
                          "name": "pmeenan",
                          "email": "pmeenan@webpagetest.org"
                      }
                  ],
                  "sources": [
                      "https://github.com/WPO-Foundation/webpagetest"
                  ],
                  "icon": "/v1/assets/incubator/webpagetest-agent/logo"
              },
              "links": {
                  "self": "/v1/charts/incubator/webpagetest-agent"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.2.0",
                          "app_version": "2018-01-23",
                          "created": "2019-11-06T09:29:02.025Z",
                          "digest": "8b1b81dfd15c5d0e57aea9b67a0db64937706500da4caeeae1e3a738217815d7",
                          "urls": [
                              "https://kubernetes-charts-incubator.storage.googleapis.com/webpagetest-agent-0.2.0.tgz"
                          ],
                          "readme": "/v1/assets/incubator/webpagetest-agent/versions/0.2.0/README.md",
                          "values": "/v1/assets/incubator/webpagetest-agent/versions/0.2.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/incubator/webpagetest-agent/versions/0.2.0"
                      }
                  }
              }
          },
          {
              "id": "incubator/webpagetest-server",
              "type": "chart",
              "attributes": {
                  "name": "webpagetest-server",
                  "repo": {
                      "name": "incubator",
                      "url": "https://kubernetes-charts-incubator.storage.googleapis.com"
                  },
                  "description": "A Helm chart for Kubernetes",
                  "home": "https://www.webpagetest.org/",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "timothyclarke",
                          "email": "ghtimothy@timothy.fromnz.net"
                      },
                      {
                          "name": "pmeenan",
                          "email": "pmeenan@webpagetest.org"
                      }
                  ],
                  "sources": [
                      "https://github.com/WPO-Foundation/webpagetest"
                  ],
                  "icon": "/v1/assets/incubator/webpagetest-server/logo"
              },
              "links": {
                  "self": "/v1/charts/incubator/webpagetest-server"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.2.1",
                          "app_version": "2018-03-08",
                          "created": "2019-11-06T09:29:02.026Z",
                          "digest": "7fa53fcada711541f23835c5945a9176c2bbb4cb97724287db0a4e5bd89cba74",
                          "urls": [
                              "https://kubernetes-charts-incubator.storage.googleapis.com/webpagetest-server-0.2.1.tgz"
                          ],
                          "readme": "/v1/assets/incubator/webpagetest-server/versions/0.2.1/README.md",
                          "values": "/v1/assets/incubator/webpagetest-server/versions/0.2.1/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/incubator/webpagetest-server/versions/0.2.1"
                      }
                  }
              }
          },
          {
              "id": "bitnami/wildfly",
              "type": "chart",
              "attributes": {
                  "name": "wildfly",
                  "repo": {
                      "name": "bitnami",
                      "url": "https://charts.bitnami.com/bitnami"
                  },
                  "description": "Chart for Wildfly",
                  "home": "http://wildfly.org",
                  "keywords": [
                      "wildfly",
                      "java",
                      "http",
                      "web",
                      "application server",
                      "jsp"
                  ],
                  "maintainers": [
                      {
                          "name": "Bitnami",
                          "email": "containers@bitnami.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/bitnami/bitnami-docker-wildfly"
                  ],
                  "icon": "/v1/assets/bitnami/wildfly/logo"
              },
              "links": {
                  "self": "/v1/charts/bitnami/wildfly"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "3.3.6",
                          "app_version": "18.0.0",
                          "created": "2019-11-06T09:38:39.714Z",
                          "digest": "6822e74ef2ef05591ac08df591ad1cafeaca1b5336e9622d0841ef4992cf6522",
                          "urls": [
                              "https://charts.bitnami.com/bitnami/wildfly-3.3.6.tgz"
                          ],
                          "readme": "/v1/assets/bitnami/wildfly/versions/3.3.6/README.md",
                          "values": "/v1/assets/bitnami/wildfly/versions/3.3.6/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/bitnami/wildfly/versions/3.3.6"
                      }
                  }
              }
          },
          {
              "id": "bitnami/wordpress",
              "type": "chart",
              "attributes": {
                  "name": "wordpress",
                  "repo": {
                      "name": "bitnami",
                      "url": "https://charts.bitnami.com/bitnami"
                  },
                  "description": "Web publishing platform for building blogs and websites.",
                  "home": "http://www.wordpress.com/",
                  "keywords": [
                      "wordpress",
                      "cms",
                      "blog",
                      "http",
                      "web",
                      "application",
                      "php"
                  ],
                  "maintainers": [
                      {
                          "name": "Bitnami",
                          "email": "containers@bitnami.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/bitnami/bitnami-docker-wordpress"
                  ],
                  "icon": "/v1/assets/bitnami/wordpress/logo"
              },
              "links": {
                  "self": "/v1/charts/bitnami/wordpress"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "7.6.2",
                          "app_version": "5.2.4",
                          "created": "2019-11-06T09:38:39.716Z",
                          "digest": "1d5d162b2d8250a3d69e8e7b4d1fd8c5cb48c0fd4df269e373def3bce4b682d8",
                          "urls": [
                              "https://charts.bitnami.com/bitnami/wordpress-7.6.2.tgz"
                          ],
                          "readme": "/v1/assets/bitnami/wordpress/versions/7.6.2/README.md",
                          "values": "/v1/assets/bitnami/wordpress/versions/7.6.2/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/bitnami/wordpress/versions/7.6.2"
                      }
                  }
              }
          },
          {
              "id": "stable/zeppelin",
              "type": "chart",
              "attributes": {
                  "name": "zeppelin",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "Web-based notebook that enables data-driven, interactive data analytics and collaborative documents with SQL, Scala and more.",
                  "home": "https://zeppelin.apache.org/",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "danisla",
                          "email": "disla@google.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/apache/zeppelin"
                  ],
                  "icon": "/v1/assets/stable/zeppelin/logo"
              },
              "links": {
                  "self": "/v1/charts/stable/zeppelin"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "1.1.0",
                          "app_version": "0.7.2",
                          "created": "2019-11-06T08:58:33.847Z",
                          "digest": "699538b6c9802c0ced51b4cc78a6edfbd54196ccbe160e2b84f98c91ce4c276a",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/zeppelin-1.1.0.tgz"
                          ],
                          "readme": "/v1/assets/stable/zeppelin/versions/1.1.0/README.md",
                          "values": "/v1/assets/stable/zeppelin/versions/1.1.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/zeppelin/versions/1.1.0"
                      }
                  }
              }
          },
          {
              "id": "stable/zetcd",
              "type": "chart",
              "attributes": {
                  "name": "zetcd",
                  "repo": {
                      "name": "stable",
                      "url": "https://kubernetes-charts.storage.googleapis.com"
                  },
                  "description": "CoreOS zetcd Helm chart for Kubernetes",
                  "home": "https://github.com/coreos/zetcd",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "hunter"
                      }
                  ],
                  "sources": [
                      "https://github.com/coreos/zetcd"
                  ],
                  "icon": ""
              },
              "links": {
                  "self": "/v1/charts/stable/zetcd"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "0.1.9",
                          "app_version": "0.0.3",
                          "created": "2019-11-06T08:58:33.847Z",
                          "digest": "7d15e3b6d562fd687754381521493ee5b07bbc833f250e7e007d951acfe71966",
                          "urls": [
                              "https://kubernetes-charts.storage.googleapis.com/zetcd-0.1.9.tgz"
                          ],
                          "readme": "/v1/assets/stable/zetcd/versions/0.1.9/README.md",
                          "values": "/v1/assets/stable/zetcd/versions/0.1.9/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/stable/zetcd/versions/0.1.9"
                      }
                  }
              }
          },
          {
              "id": "bitnami/zookeeper",
              "type": "chart",
              "attributes": {
                  "name": "zookeeper",
                  "repo": {
                      "name": "bitnami",
                      "url": "https://charts.bitnami.com/bitnami"
                  },
                  "description": "A centralized service for maintaining configuration information, naming, providing distributed synchronization, and providing group services for distributed applications.",
                  "home": "https://zookeeper.apache.org/",
                  "keywords": [
                      "zookeeper"
                  ],
                  "maintainers": [
                      {
                          "name": "Bitnami",
                          "email": "containers@bitnami.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/bitnami/bitnami-docker-zookeeper"
                  ],
                  "icon": "/v1/assets/bitnami/zookeeper/logo"
              },
              "links": {
                  "self": "/v1/charts/bitnami/zookeeper"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "5.1.0",
                          "app_version": "3.5.6",
                          "created": "2019-11-06T09:38:39.717Z",
                          "digest": "beb957ff3bd1ebd8a3fcb01ad106299aa9c3a5d380df53bf85d42dda6bb580a2",
                          "urls": [
                              "https://charts.bitnami.com/bitnami/zookeeper-5.1.0.tgz"
                          ],
                          "readme": "/v1/assets/bitnami/zookeeper/versions/5.1.0/README.md",
                          "values": "/v1/assets/bitnami/zookeeper/versions/5.1.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/bitnami/zookeeper/versions/5.1.0"
                      }
                  }
              }
          },
          {
              "id": "incubator/zookeeper",
              "type": "chart",
              "attributes": {
                  "name": "zookeeper",
                  "repo": {
                      "name": "incubator",
                      "url": "https://kubernetes-charts-incubator.storage.googleapis.com"
                  },
                  "description": "Centralized service for maintaining configuration information, naming, providing distributed synchronization, and providing group services.",
                  "home": "https://zookeeper.apache.org/",
                  "keywords": [],
                  "maintainers": [
                      {
                          "name": "lachie83",
                          "email": "lachlan.evenson@microsoft.com"
                      },
                      {
                          "name": "kow3ns",
                          "email": "owensk@google.com"
                      }
                  ],
                  "sources": [
                      "https://github.com/apache/zookeeper",
                      "https://github.com/kubernetes/contrib/tree/master/statefulsets/zookeeper"
                  ],
                  "icon": "/v1/assets/incubator/zookeeper/logo"
              },
              "links": {
                  "self": "/v1/charts/incubator/zookeeper"
              },
              "relationships": {
                  "latestChartVersion": {
                      "data": {
                          "version": "2.1.0",
                          "app_version": "3.5.5",
                          "created": "2019-11-06T09:29:02.029Z",
                          "digest": "45225170c6be645da110ac1aa6efdee86de62ce2e9ab3ca99263b3f64c1fe597",
                          "urls": [
                              "https://kubernetes-charts-incubator.storage.googleapis.com/zookeeper-2.1.0.tgz"
                          ],
                          "readme": "/v1/assets/incubator/zookeeper/versions/2.1.0/README.md",
                          "values": "/v1/assets/incubator/zookeeper/versions/2.1.0/values.yaml",
                          "schema": ""
                      },
                      "links": {
                          "self": "/v1/charts/incubator/zookeeper/versions/2.1.0"
                      }
                  }
              }
          }
      ];
    }
  }
};
</script>

<style scoped>
  .catalog-content{
    padding: 1em;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 5em;
  }
  .catalog-search{
    float: left;
    width: 40%;
    margin: 20px 0 0 1em;
  }
  .bottom {
    line-height: 12px;
    text-align: left;
  }

  .button-left {
    padding: 5px;
    float: left;
      height: 24px;
      overflow : hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
  }

  .button-right {
    padding: 5px;
    float: right;
  }

  .image {
    max-width: 7em;
    max-height: 6em;
    display: block;
    margin: 1em;
  }

  .el-col{
    padding: 10px 0;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .catalog-image{
    display: flex;
    height: calc(72px + 2em);
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    text-align: center;
    background-color: #f1f1f1;
    box-sizing: border-box;
  }

  .catalog-desc{
    height: 2em;
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .catalog-label{
    word-wrap: break-word;
    text-align: center;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    font-size: 1.1em;
    font-weight: 700;
    margin: 0;
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
</style>
