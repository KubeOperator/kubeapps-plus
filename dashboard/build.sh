#!/bin/bash

docker build -t registry-console/kubeapps/kubeapps-plus:v1.0 .
docker push registry-console/kubeapps/kubeapps-plus:v1.0
