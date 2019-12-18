/**
 * @msg 消息
 * @author: maguohao
 */
var MessageBox = function (obj, msg, title, successMsg, cancelMsg) {
    let flag = false;
    obj.$confirm(msg, title, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        obj.$message({
            type: 'success',
            message: successMsg
        });
    }).catch(() => {
        obj.$message({
            type: 'info',
            message: cancelMsg
        });
    });
    return flag;
}
export default MessageBox
