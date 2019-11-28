/**
 * @key  用户输入的input值
 * @return 返回查询结果集
 * @author: maguohao
 */
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
    gitlab: 'https://dyltqmyl993wv.cloudfront.net/assets/stacks/gitlab/img/gitlab-stack-110x117.png'
}

var searchIcon = function (val){
    console.log('common val: ', imageIcon[val])
    return imageIcon[val]
}

const common = {search, searchIcon}
export default common
