#!/bin/bash

docker build -t registry.fit2cloud.com/public/docker.io/kubeoperator/kubeapps-plus/kubeapps-plus:v1.0 .
docker push registry.fit2cloud.com/public/docker.io/kubeoperator/kubeapps-plus/kubeapps-plus:v1.0
