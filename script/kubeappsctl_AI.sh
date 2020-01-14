#!/bin/bash
BASE_DIR=$(
    cd "$(dirname "$0")"
    pwd
)
PROJECT_DIR=${BASE_DIR}
SCRIPT_DIR=${BASE_DIR}/scripts
UTILS_DIR=${BASE_DIR}/utils
action=$1

#工具函数
function read_from_input() {
    var=$1
    msg=$2
    choices=$3
    default=$4
    if [[ ! -z "${choices}" ]]; then
        msg="${msg} (${choices}) "
    fi
    if [[ -z "${default}" ]]; then
        msg="${msg} (无默认值)"
    else
        msg="${msg} (默认为${default})"
    fi
    echo -n "${msg}: "
    read input
    if [[ -z "${input}" && ! -z "${default}" ]]; then
        export ${var}="${default}"
    else
        export ${var}="${input}"
    fi
}
function set_docker_config() {
    cwd=$(pwd)
    cd ${PROJECT_DIR}
    url=$1
    user=$2
    password=$3
    authed=$(echo -n ${user}:${password} | base64)
    #bug
    # sed -i '/registry/c\ \"\'${url}'\",' utils/docker-config.json
    # sed -i "s,'password'/${auth},g" utils/docker-config.json

    echo '{
	    "auths": {
            "'${url}'": {
			    "auth": "'${authed}'"
		        }
	        },
	    "HttpHeaders": {
		    "User-Agent": "Docker-Client/18.09.9 (linux)"
	    }
    }' >utils/docker-config.json

    secret=$(base64 -w 0 utils/docker-config.json)
    all_variables_secret="secret=${secret}"
    #替换Secert
    resourcefile=`cat apps/userdefined-secret.yaml`
    printf "$all_variables_secret\ncat << EOF\n$resourcefile\nEOF" | bash >apps/tensorflow-notebook/templates/userdefined-secret.yaml
    printf "$all_variables_secret\ncat << EOF\n$resourcefile\nEOF" | bash >apps/tensorflow-serving/templates/userdefined-secret.yaml
    #TODO
    #替换source
    # registryfile=`cat apps/jenkins/values.yaml`
    # all_variables_source="imageregistry=\"${url}\""
    # printf "$all_variables_source\ncat << EOF\n$registryfile\nEOF" | bash >apps/jenkins/values.yaml

    # 替换变量
    sed "s/imageregistryvalue/\"${url}\"/g" apps/tensorflow-notebook/values_default.yaml > apps/tensorflow-notebook/values.yaml
    sed "s/imageregistryvalue/\"${url}\"/g" apps/tensorflow-serving/values_default.yaml > apps/tensorflow-serving/values.yaml


}

## 检查环境 安装helm push
function env_check() {
    echo "检查Docker......"
    docker -v
    if [ $? -eq 0 ]; then
        echo "检查到Docker已安装!"
    else
        echo "请先安装Docker"
    fi
    echo "检查Helm......"
    helm version
    if [ $? -eq 0 ]; then
        echo "检查到Helm已安装!"
    else
        echo "请先安装Helm"
    fi
    #安装Helm Push Plugins
    mv ${UTILS_DIR}/push $(helm home)/plugins/
    echo "安装 Push Plugins 完成"
}
registry_host=""
registry_user=""
registry_pass=""
function set_external_registry() {

    read_from_input registry_host "请输入registry的域名" "" "${registry_host}"

    read_from_input registry_user "请输入registry的用户名" "" "${registry_user}"

    read_from_input registry_pass "请输入registry的密码" "" "${registry_pass}"

    #test_registry_connect ${registry_host} ${registry_port} ${registry_user} ${registry_pass} ${registry_db}
    # if [[ "$?" != "0" ]]; then
    #     echo "测试连接数据库失败, 请重新设置"
    #     set_external_registry
    #     return
    # fi
    set_docker_config ${registry_host} ${registry_user} ${registry_pass}
}

function set_internal_registry() {
    registry_host="registry.kubeapps.fit2cloud.com"
    registry_user="admin"
    registry_pass="admin123"
    set_docker_config ${registry_host} ${registry_user} ${registry_pass}
}

function set_registry() {
    echo ">>> 配置registry"
    use_external_registry="n"
    read_from_input use_external_registry "是否使用外部Docker Image Registry" "y/n" "${use_external_registry}"

    if [[ "${use_external_registry}" == "y" ]]; then
        set_external_registry
    else
        set_internal_registry
    fi
}

#docker retag & push

function docker_upload_image() {

    docker load < tensorflow.jar
    docker tag ac494312205a ${registry_host}/tensorflow/tensorflow:1.6.0-devel
    docker push ${registry_host}/tensorflow/tensorflow:1.6.0-devel

    docker load < tf-model-server.jar
    docker tag e468a5495acb ${registry_host}/cheyang/tf-model-server:1.4
    docker push ${registry_host}/cheyang/tf-model-server:1.4


}

#打包Helm Chart

# function pakcage_chart() {
#     echo ">>> 打包Chart"
#     cd ${PROJECT_DIR}/jenkins
#     helm pakcage .
#     if [ $? -eq 0 ]; then
#         echo ">>> 打包完成"
#     else
#         echo ">>> 打包失败"
#     fi
# }

#配置chart 仓库

function set_external_chartrepo() {
    repo_url=""
    read_from_input repo_url "请输入Chart Repo的主机域名 例: http://chartmuseum.kubeapps.fit2cloud.com" "" "${repo_url}"

    repo_username=""
    read_from_input repo_username "请输入Repo的用户名" "" "${repo_username}"

    repo_password=""
    read_from_input repo_password "请输入Repo的密码" "" "${repo_password}"

    helm repo add localrepo ${repo_url} --username ${repo_username} --password ${repo_password}
}

function set_internal_chartrepo() {
    helm repo add localrepo http://chartmuseum.kubeapps.fit2cloud.com
}

function set_chartrepo() {
    echo ">>> 配置 Chart 仓库"
    use_external_chartrepo="n"
    read_from_input use_external_chartrepo "是否使用外部 Chart 仓库" "y/n" "${use_external_chartrepo}"

    if [[ "${use_external_chartrepo}" == "y" ]]; then
        set_external_chartrepo
    else
        set_internal_chartrepo
    fi
}

#上传Chart 到 Chart Repo

function upload_chart() {
    cd ${PROJECT_DIR}/apps/tensorflow-notebook
    helm package .
    helm push . localrepo -f
    cd ${PROJECT_DIR}/apps/tensorflow-serving
    helm package .
    helm push . localrepo -f
    if [ $? -eq 0 ]; then
        echo ">>> 上传完成"
    else
        echo ">>> 上传失败"
    fi
}

function usage() {
    echo "Kubeapps 推送Docker镜像及Helm Chart包脚本"
    echo
    echo "Usage: "
    echo "  ./kubeappsctl.sh [COMMAND] [ARGS...]"
    echo "  ./kubeappsctl.sh --help"
    echo
    echo "Commands: "
    echo "  start 推送Docker镜像及Helm Chart包"
}

#主进程
function main() {
    case "${action}" in
    start)
        env_check
        set_registry
        docker_upload_image
        set_chartrepo
        upload_chart
        ;;
    help)
        usage
        ;;
    --help)
        usage
        ;;
    *)
        usage
        ;;
    esac
}
main
