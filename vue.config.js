//vue.config.js
module.exports = {
    devServer: {
        port: 9090,

        host: "localhost",

        https: false,

        open: false,
        proxy: {
            "/api": {
                target: "http://localhost:8080", //设置调用的接口域名和端口
                changeOrigin: true, //是否跨域
                ws: true,
                pathRewrite: {
                    "^/rpc": ""
                }
            }
        }
    }
}