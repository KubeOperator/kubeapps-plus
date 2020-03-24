//vue.config.js
// const path = require('path')
// function resolve(dir) {
//     return path.join(__dirname, dir)
// }
module.exports = {
    assetsDir: './',
    devServer: {
        port: 9090,

        host: "localhost",

        https: false,

        open: false,
        proxy: {
            "/api": {
                target: "http://172.16.10.78:31065", //设置调用的接口域名和端口
                // target: "http://106.54.186.184:9999", //设置调用的接口域名和端口
                changeOrigin: true, //是否跨域
                ws: true,
                pathRewrite: {
                    "^/rpc": ""
                }
            }
        },
        before: require('./mock')
    },
    // configureWebpack:{
    //     resolve:{
    //         alias:{
    //             '@':resolve('src')
    //         }
    //     },
    //     module: {
    //         rules: [
    //             {
    //                 test: /\.(png|jpg|gif)$/,
    //                 use: [
    //                     {
    //                         loader: 'url-loader',
    //                         options: {
    //                             limit: 1
    //                         }
    //                     }
    //                 ]
    //             }
    //         ]
    //     }
    // }
}
