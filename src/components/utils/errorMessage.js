/**
 * @message 报错信息展示
 * @return
 * @author: maguohao
 */
var errorMessage = function (obj, res) {
    const h = obj.$createElement;
    let message = ''
    if (res.data.status) {
        message = res.data.status + ': ' + res.data.message
    } else {
        message = res.data
    }
    obj.$notify({
        title: "Error",
        message: h(
            "i",
            { style: "color: black" },
            message
        ),
        type: "error",
        offset: 100
    });
}
export default errorMessage
