#!/bin/bash

docker build -t registry.fit2cloud.com/kubeapps/kubeapps-plus:v1.0 .
docker push registry.fit2cloud.com/kubeapps/kubeapps-plus:v1.0
