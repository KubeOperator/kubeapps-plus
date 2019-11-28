/**
 * @apiSetting api体
 * @params 需要拼接的参数(变量)
 * @return
 * @author: maguohao
 */
var getParamApi = function (apiSetting, ...params) {
    let api = {}
    let str = ''
    if (apiSetting) {
        for (let param of params) {
            str += '/' + param
        }
        let url = apiSetting.url + str
        api = {
            url: url,
            method: apiSetting.method
        }
    }
    return api
}

export default getParamApi
