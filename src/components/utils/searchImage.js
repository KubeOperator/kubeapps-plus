/**
 * @value example: /api/chartsvc/v1/assets/stable/aerospike/logo
 * @return example: https://hub.kubeapps.com/api/chartsvc//v1/assets/stable/aerospike/logo
 * @author: maguohao
 */

const https = 'http://172.16.10.163/api/chartsvc/'
export function searchImage (value) {
    if (!value) {
        return ''
    }
    let src = https + value
    return src
}
