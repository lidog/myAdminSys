/*
 * @Author lizhenhua
 * @version 2018/5/17
 * @description
 */

import axios from 'axios'
import store from '../store'
import {Message} from 'element-ui'
import {getToken,removeToken} from '@/util/cookie'
import tools from '@/util/tools'
import qs from 'qs'
// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 60000*5 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {

  //如果是开发环境，为非模拟接口加上“跨域”前缀 'ln'
  if(process.env.NODE_ENV=='development'&& config.url.indexOf('api')==-1){
    config.url = 'ln/'+ config.url;
  }

  let token = getToken();

  //如果data参数为 对象或者数组，就把参数 封装到key为data 属性中；
  if(typeof config.data == "object" ||typeof config.data == "Object" ||typeof config.data == "OBJECT"){
    let data = tools.cloneObj(config.data);
    config.data = {};
    config.data['data'] = JSON.stringify(data);
  }else {
    config.data = {};
  }

  //统一为所有请求加上 这两个参数
  if (token) {
    config.data['LE_AUTH_TOKEN'] = token
    config.data['token'] = token
  }

  //设置头部token
  if (store.getters.token) {
    config.headers['X-Token'] = token // 让每个请求携带自定义token 请根据实际情况自行修改
  }

  //不设置 这样，后台拿不到数据
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded'

  //get请求，只能放在 params 中，转为url传参的方式
  //所以统一使用post请求，只有post存在 paramBody，我们可以吧参数放在 data 中
  config.method = "POST"

  //把所有参数处理为 form 表单提交的方式，并且转义，如果不这样，后端（会直接得到字符串，不是正常对象）解析不出来；
  //前端发送：data=%7B%22loginName%22%3A%22lzh%22%2C%22loginPassword%22%3A%22123456%22%2C%22appId%22%3A%22lext79987422-5180-40%22%2C%22platType%22%3A1%7D
  //后端收到：{data={"loginName":"lzh","loginPassword":"123456","appId":"lext79987422-5180-40","platType":1}}
  config.data = qs.stringify(config.data)

  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    let res = response.data;
    if (res.status == 1) {
      return res.data
    }if(res.status ==-1208){
      Message({
        message: res.errorMsg,
        type: 'error',
        duration: 5 * 1000
      })
      removeToken();
    } else {  //这里处理 所有数据错误
      Message({
        message: res.errorMsg,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(res.errorMsg)
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
    Message({
      message: info,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)


export default service


