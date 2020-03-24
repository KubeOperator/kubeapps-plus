/**
 * @key  用户输入的input值
 * @return 返回查询结果集
 * @author: maguohao
 */
/* eslint-disable */
let arr = []
var search = function (key, json) {
    let jsonObj
    if (json instanceof String) {
        jsonObj = JSON.parse(json)
    } else {
        jsonObj = json
    }
    if (!key || !json) {
        return json
    }
    for (let i of jsonObj) {
        if (i.id.indexOf(key) > -1) {
            arr.push(i)
        }
    }
    return arr
}

const imageIcon2 = {
    apache: 'https://dyltqmyl993wv.cloudfront.net/assets/stacks/apache/img/apache-stack-110x117.png',
    docker: '',
    drupal: 'https://dyltqmyl993wv.cloudfront.net/assets/stacks/drupal/img/drupal-stack-110x117.png',
    elasticsearch: 'https://dyltqmyl993wv.cloudfront.net/assets/stacks/elasticsearch-curator/img/elasticsearch-curator-stack-110x117.png',
    etcd: 'https://bitnami.com/assets/stacks/etcd/img/etcd-stack-110x117.png',
    harbor: 'https://dyltqmyl993wv.cloudfront.net/assets/stacks/harbor/img/harbor-stack-110x117.png',
    jenkins: 'https://dyltqmyl993wv.cloudfront.net/assets/stacks/jenkins/img/jenkins-stack-110x117.png',
    kafka: 'https://dyltqmyl993wv.cloudfront.net/assets/stacks/kafka/img/kafka-stack-110x117.png',
    mysql: 'https://dyltqmyl993wv.cloudfront.net/assets/stacks/mysql/img/mysql-stack-110x117.png',
    mongodb: 'https://dyltqmyl993wv.cloudfront.net/assets/stacks/mongodb-sharded/img/mongodb-sharded-stack-110x117.png',
    nginx: 'https://dyltqmyl993wv.cloudfront.net/assets/stacks/nginx/img/nginx-stack-110x117.png',
    rabbitmq: 'https://dyltqmyl993wv.cloudfront.net/assets/stacks/rabbitmq/img/rabbitmq-stack-110x117.png',
    redis: 'https://dyltqmyl993wv.cloudfront.net/assets/stacks/redis/img/redis-stack-110x117.png',
    tomcat: 'https://dyltqmyl993wv.cloudfront.net/assets/stacks/tomcat/img/tomcat-stack-110x117.png',
    wordpress: 'https://dyltqmyl993wv.cloudfront.net/assets/stacks/wordpress/img/wordpress-stack-110x117.png',
    zookeeper: 'https://dyltqmyl993wv.cloudfront.net/assets/stacks/zookeeper/img/zookeeper-stack-110x117.png',
    gitlab: 'https://dyltqmyl993wv.cloudfront.net/assets/stacks/gitlab/img/gitlab-stack-110x117.png',
    sonarqube: 'https://dyltqmyl993wv.cloudfront.net/assets/stacks/sonarqube/img/sonarqube-stack-110x117.png',
    istio: 'https://hub.kubeapps.com/api/chartsvc/v1/assets/ibm-charts/ibm-istio/logo',
    tensorflow: 'https://dyltqmyl993wv.cloudfront.net/assets/stacks/tensorflow-serving/img/tensorflow-serving-stack-110x117.png',
    'argo-cd': 'https://raw.githubusercontent.com/argoproj/argo/master/docs/assets/argo.png'
    'weave-scope': '@/assets/image/charts/weave-scope-110x117.png',
    'tensorflow-serving': "@/assets/image/charts/tensorflow-110x117.png",
    'tensorflow-notebook': "@/assets/image/charts/tensorflow-110x117.png"
}

const imageIcon = {
    default: '@/assets/image/charts/default.png',
    apache: '@/assets/image/charts/apache-stack-110x117.png',
    docker: '',
    drupal: '@/assets/image/charts/drupal-stack-110x117.png',
    elasticsearch: '@/assets/image/charts/elasticsearch-curator-stack-110x117.png',
    etcd: '@/assets/image/charts/etcd-stack-110x117.png',
    harbor: '@/assets/image/charts/harbor-stack-110x117.png',
    jenkins: '@/assets/image/charts/jenkins-stack-110x117.png',
    kafka: '@/assets/image/charts/kafka-stack-110x117.png',
    mysql: '@/assets/image/charts/mysql-stack-110x117.png',
    mongodb: '@/assets/image/charts/mongodb-sharded-stack-110x117.png',
    nginx: '@/assets/image/charts/nginx-stack-110x117.png',
    rabbitmq: '@/assets/image/charts/rabbitmq-stack-110x117.png',
    redis: '@/assets/image/charts/redis-stack-110x117.png',
    tomcat: '@/assets/image/charts/tomcat-stack-110x117.png',
    wordpress: '@/assets/image/charts/wordpress-stack-110x117.png',
    zookeeper: '@/assets/image/charts/zookeeper-stack-110x117.png',
    'gitlab-ce': '@/assets/image/charts/gitlab-stack-110x117.png',
    sonarqube: '@/assets/image/charts/sonarqube-stack-110x117.png',
    istio: '@/assets/image/charts/istio-110x117.png',
    'tensorflow-notebook': '@/assets/image/charts/tensorflow-stack-110x117.png',
    'tensorflow-serving': '@/assets/image/charts/tensorflow-stack-110x117.png',
    grafana: '@/assets/image/charts/grafana-stack-110x117.png',
    'kubeapps-plus': '@/assets/image/charts/kubeapps-plus-stack-110x117.png',
    loki: '@/assets/image/charts/loki-stack-110x117.png',
    prometheus: '@/assets/image/charts/prometheus-stack-110x117.png',
    'weave-scope': '@/assets/image/charts/weave-scope-110x117.png',
    'tensorflow-serving': "@/assets/image/charts/tensorflow-110x117.png",
    'tensorflow-notebook': "@/assets/image/charts/tensorflow-110x117.png"
    'argo-cd': '@/assets/image/charts/argo-110x117.png'
}

var searchCatelogIcon = function (val) {
    let str = imageIcon[val];
    return str ? str.split('charts/')[1] : 'default.png';
}

var searchApplicationIcon = function (val) {
    let auto_ = 'default';
    if (!val) {
        return auto_;
    }
    if (val.indexOf('tensorflow-notebook') >= 0) {
        auto_ = 'tensorflow-notebook';
    } else if (val.indexOf('tensorflow-serving') >= 0) {
        auto_ = 'tensorflow-serving';
    } else if (val.indexOf('gitlab-ce') >= 0) {
        auto_ = 'gitlab-ce';
    } else if (val.indexOf('harbor') >= 0) {
        auto_ = 'harbor';
    } else if (val.indexOf('jenkins') >= 0) {
        auto_ = 'jenkins';
    } else if (val.indexOf('sonarqube') >= 0) {
        auto_ = 'sonarqube';
    } else if (val.indexOf('istio') >= 0) {
        auto_ = 'istio';
    } else if (val.indexOf('loki') >= 0) {
        auto_ = 'loki';
    } else if (val.indexOf('grafana') >= 0) {
        auto_ = 'grafana';
    } else if (val.indexOf('kubeapps-plus') >= 0) {
        auto_ = 'kubeapps-plus';
    } else if (val.indexOf('prometheus') >= 0) {
        auto_ = 'prometheus';
    } else if (val.indexOf('argo-cd') >= 0) {
        auto_ = 'argo-cd';
    } else if (val.indexOf('weave-scope') >= 0) {
        auto_ = 'weave-scope';
    }
    let str = imageIcon[auto_];
    return str ? str.split('charts/')[1] : 'default.png';
}

const common = {search, searchCatelogIcon, searchApplicationIcon}
export default common
