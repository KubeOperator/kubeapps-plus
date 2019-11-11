/**
 * 封装loading方法
 * @author: maguohao
 */
var loading = function (obj) {
    const loading = obj.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.3)'
    });
    setTimeout(() => {
        loading.close();
    }, 2000);
}

export default loading
