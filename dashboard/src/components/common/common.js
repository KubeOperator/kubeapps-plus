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
    for(let i of jsonObj) {
        if (i.id.indexOf(key) > -1) {
            arr.push(i)
        }
    }
    return arr
}

const imageIcon2 = {
    apache: '../../assets/image/charts/apache-stack-110x117.png',
    docker: '',
    drupal: '../../assets/image/charts/drupal-stack-110x117.png',
    elasticsearch: '../.././assets/image/charts/elasticsearch-curator-stack-110x117.png',
    etcd: '../../assets/image/charts/etcd-stack-110x117.png',
    harbor: '../../assets/image/charts/harbor-stack-110x117.png',
    jenkins: '../../assets/image/charts/jenkins-stack-110x117.png',
    kafka: '../../assets/image/charts/kafka-stack-110x117.png',
    mysql: '../../assets/image/charts/mysql-stack-110x117.png',
    mongodb: '../../assets/image/charts/mongodb-sharded-stack-110x117.png',
    nginx: '../../assets/image/charts/nginx-stack-110x117.png',
    rabbitmq: 'https://dyltqmyl993wv.cloudfront.net/assets/stacks/rabbitmq/img/rabbitmq-stack-110x117.png',
    redis: '../../assets/image/charts/redis-stack-110x117.png',
    tomcat: '../../assets/image/charts/tomcat-stack-110x117.png',
    wordpress: '../../assets/image/charts/wordpress-stack-110x117.png',
    zookeeper: '../../assets/image/charts/zookeeper-stack-110x117.png',
    gitlab: '../../assets/image/charts/gitlab-stack-110x117.png'
}

const imageIcon = {
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
    istio: 'https://hub.kubeapps.com/api/chartsvc/v1/assets/ibm-charts/ibm-istio/logo'
}

var searchIcon = function (val){
    return imageIcon[val]
}

const common = {search, searchIcon}
export default common
