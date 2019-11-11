/**
 * 封装loading方法
 * obj: this对象
 * timeout: 设置超时时间 2000即2s
 * @author: maguohao
 */
var loading = function (obj, timeout) {
    const loading = obj.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.1)'
    });
    setTimeout(() => {
        loading.close();
    }, timeout);
}

export default loading
