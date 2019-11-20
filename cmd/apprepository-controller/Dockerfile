FROM golang:1.11 as builder
COPY . /go/src/github.com/kubeapps_plus
WORKDIR /go/src/github.com/kubeapps_plus
RUN CGO_ENABLED=0 go build -a -installsuffix cgo ./cmd/apprepository-controller

FROM scratch
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=builder /go/src/github.com/kubeapps_plus/apprepository-controller /apprepository-controller
CMD ["/apprepository-controller"]
