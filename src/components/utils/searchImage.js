/**
 * @value example: /api/chartsvc/v1/assets/stable/aerospike/logo
 * @return example: https://hub.kubeapps.com/api/chartsvc//v1/assets/stable/aerospike/logo
 * @author: maguohao
 */
// import apiSetting from "./apiSetting.js";
// import http from "./httpAxios.js";
// import getParamApi from "./getParamApi";
// import noticeMessage from './noticeMessage.js';
/* eslint-disable */
const https = 'https://hub.kubeapps.com/api/chartsvc/'
export function searchImage (value) {
    if (!value) {
        return ''
    }
    let src = https + value
    return src
    // return promise(value).then((res)=>{
    //     console.log(res)
    //     return res;
    // })
}

var promise = function(value){
    return  new Promise(function(resolve) {
        setTimeout(function () {
            resolve(httpI(value));
        }, 300);
    })
}

var httpI =  function (value) {
    // await http(getParamApi(apiSetting.kubernetes.getImage, value)).then(res => {
    //     if (res.status == 200) {
    //         src = res.request.responseURL;
    //     } else {
    //         noticeMessage(this, res, 'error');
    //     }
    // }, msg => {
    //     noticeMessage(this, msg.data, 'error');
    // })
    // return src.toString()
    let src = https + value
    return src
}

