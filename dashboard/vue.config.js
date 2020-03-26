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
                target: "http://172.16.10.76:30261", //设置调用的接口域名和端口
                // target: "http://106.54.186.184:9999", //设置调用的接口域名和端口
                changeOrigin: true, //是否跨域
                ws: true,
                pathRewrite: {
                    "^/rpc": ""
                }
            }
        }
    },
    chainWebpack:(config)=>{
        config.plugins.delete('fork-ts-checker') // 禁用fork-ts-checker
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
