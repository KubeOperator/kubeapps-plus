/**
 * @msg 消息提示
 * @type 类型：成功 success、警告 warning、消息 info、错误 error
 * @author: maguohao
 */
var noticeMessage = function (obj, msg, type) {
    obj.$message({
        message: msg,       //消息文字
        type: type,         //主题 success/warning/info/error
        duration: 5000,     //显示时间, 毫秒。设为 0 则不会自动关闭
        showClose: true,    //是否显示关闭按钮
        center: false,       //文字是否居中
        onClose: null       //关闭时的回调函数, 参数为被关闭的 message 实例
    });
}
export default noticeMessage
