/**
 * @key  用户输入的input值
 * @return 返回查询结果集
 * @author: maguohao
 */
let arr = []
var search = function (key, json) {
    let jsonObj
    if (json instanceof String) {
        jsonObj = JSON.stringify(json)
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

const common = {search}
export default common
