import axios from 'axios'
import qs from 'qs'

// 创建axios实例
var service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 20000 // 请求超时时间
})


// 创建axios实例
var service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 20000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  //默认所有请求加loading，如果设置为false，就不打开loading
  config.proxy = config.proxy == true ? true : false;//是否自己处理 接口返回数据

  //如果是开发环境并且不是 mock 接口，为非模拟接口加上“跨域”前缀 proxyString
  if (config.url.indexOf('mock') === -1) {
    config.url = '/ln' + config.url;
  }

  //不设置 这样，后台拿不到数据
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  //上传附件头部设置
  if(config.headerConfig=="upload"){
    config.headers['Content-Type'] = 'multipart/form-data;boundary=----WebKitFormBoundaryRXO00uMJXRBOQ5En'
  }
  //get请求，只能放在 params 中，转为url传参的方式
  //post请求，只能放在 data 中，转为formData 的形式，这种方式要 qs
  if (config.type == "post" || config.type == "POST") {
    config.method = "POST"
    //把所有参数处理为 form 表单提交的方式，并且转义，如果不这样，后端（会直接得到字符串，不是正常对象）解析不出来；
    config.data = qs.stringify(config.data)
  } else if(config.type=="get" || !config.type){
    config.params = config.data;
    config.data = {};
    config.method = config.type|| "GET"
  }else {
    config.method = config.type;
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  return Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    let res = response.data;
    if (response.status == 200) {
      return res
    }
    else {  //这里处理所有网络正常但数据错误
      console.log(response.msg || "网络错误，状态码："+ res.httpCode)
      return Promise.reject(response.msg)
    }
  },
  error => {  //这里处理的是 所有网络请求错误
    console.log('err' + error)// for debug
    let err = error + '', info = '';
    if (err.indexOf('timeout') != -1) {
      info = "请求超时";
    } else {
      info = err
    }
    console.log(info)
    return Promise.reject(error)
  }
)

export default service
