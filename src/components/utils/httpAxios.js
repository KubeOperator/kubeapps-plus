import axios from 'axios'
import store from '../store/store.js'


// 请求时的拦截器
axios.interceptors.request.use(config => {
        // 发送请求之前做一些处理,loading...
        return config
    },
    error => {
        // 当请求异常时做一些处理
        return Promise.reject(error)
    })

// 请求完成后的拦截器
axios.interceptors.response.use(response => {
        // 返回响应时做一些处理
        // 这里的return response返回的是一个对象, 内容如下:
        // {
        //      data: { },        // 服务器提供的响应
        //      status: 200,      // 服务器响应的HTTP状态代码
        //      statusText: 'OK', // 服务器响应的HTTP状态消息
        //      headers: {},      // 服务器响应头
        //      config: {}        // axios 的配置
        // }
        return response
    },
    error => {
        // 当响应异常时做一些处理
        // 这里我们把错误信息扶正, 后面就不需要写 catch 了
        return Promise.resolve(error.response)
    })

function errorState(response) {
    //  ..隐藏loading
    // console.log(response)
    // console.log('失败，统一判断后端返回的错误码')
    // 如果http状态码正常，则直接返回数据
    if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
        return response
    } else {
        console.log('网络异常')
    }
}

function successState(res) {
    //  ..隐藏loading
    console.log(res)
    // console.log('成功，统一判断后端返回的错误码')
    // 统一判断后端返回的错误码
    // if (res.data.errCode == '000002') {
    //   console.log(res.data.errDesc || '网络异常')
    // } else if (res.data.errCode != '000002' && res.data.errCode != '000000') {
    //   console.log(res.data.errDesc || '网络异常')
    // }
}

const httpServer = (opts, data) => {
    // 公共参数
    let Public = {}
    // http默认配置
    let httpDefaultOpts = {
        method: opts.method,
        // 请求协议
        // baseURL,  // 基础 url 前缀
        url: opts.url,
        // 请求的地址
        timeout: 10000,
        // 超时时间, 单位毫秒
        params: Object.assign(Public, data),
        // get 请求时带的参数
        // 这里的 data 为什么需要用qs.stringify(data)包一下,
        // 数据处理, 主要是配合下面headers里的Content-Type, 转成表单提交, 让后端可以直接用 $_POST 拿到数据
        data: Object.assign(Public, data),
        // post 请求的数据
        // 请求头信息
        headers: opts.method === 'get' ? {
            'X-Requested-With': 'XMLHttpRequest',
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + store.fetch('accessToken')
        } : {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + store.fetch('accessToken')
        }
    }

    if (opts.method === 'get') {
        delete httpDefaultOpts.data
    } else {
        delete httpDefaultOpts.params
    }

    /*
   * 将异常部分直接封装到业务调用的 then 方法中 例如：
    promise(apiSetting.getProjects).then(
      res => {
        //... do something
      },
      error => {
        //... do something
      }
    )
  */
    let promise = new Promise(async (resolve, reject)=>  {
        await axios(httpDefaultOpts).then((res) => {
            console.log('... ',res)
            successState(res)
            resolve(res)
        }).catch((response) => {
            errorState(response)
            reject(response)
        })
    })

    return promise
}

export default httpServer
