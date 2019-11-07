/**
 * @message
 * @return
 * @author: maguohao
 */
var errorMessage = function (obj, message) {
    const h = obj.$createElement;
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
