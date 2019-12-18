#!/bin/bash

docker build -t registry.fit2cloud.com/kubeapps/kubeapps-plus:master .
docker push registry.fit2cloud.com/kubeapps/kubeapps-plus:master
