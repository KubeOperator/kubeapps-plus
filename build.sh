#!/bin/bash

docker build -t registry.fit2cloud.com/innovation/kubeapps-plus-dashboard:master .
docker push registry.fit2cloud.com/innovation/kubeapps-plus-dashboard:master
