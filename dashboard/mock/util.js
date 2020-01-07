const fs = require('fs');//引入文件系统模块
const path = require('path');//引入path模块

module.exports = {
    //读取json文件
    getJsonFile:function (filePath) {
        //读取指定json文件
        var json = fs.readFileSync(path.resolve(__dirname,filePath), 'utf-8');
        //解析并返回
        return JSON.parse(json);
    }
};