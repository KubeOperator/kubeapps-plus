#!/usr/bin/env bash
SCRIPT_DIR=$(
    cd "$(dirname "$0")"
    pwd
)
PROJECT_DIR=$(dirname ${SCRIPT_DIR})
OS=$(uname)

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
    key=$1
    value=$2
    # if [[ "${OS}" == 'Darwin' ]]; then
    #     sed -i '' "s,^${key}=.*$,${key}=${value},g" config.txt
    # else
    sed -i "s,^${key}=.*$,${key}=${value},g" docker-config.json
    # fi
    cd ${cwd}
}
