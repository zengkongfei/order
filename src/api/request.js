import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import { getToken,setToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 15000, // 请求超时时间.
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
  responseType: 'json'
})

// request interceptor
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['Authorization'] = getToken() // 让每个请求携带token

  }
  if (config.data){
    if (config.data.page){
      config.headers['pageNum'] = config.data.page.pageNum
      config.headers['pageSize'] = config.data.page.pageSize
      if (config.data.page.orderBy) {
        config.headers['orderBy'] = config.data.page.orderBy
      }
    }
  }
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(response => {
  const res = response.data
  if (res) {
    if (res.responseCode === 200) {
      const token = response.headers.Authorization
      if (token) {
        setToken(token)
      }
    }else if (res.responseCode === 201) {
      Message({
        message: res.msg,
        type: 'error',
        duration: 5 * 1000
      }).then(() => {
        location.reload()// 为了重新实例化vue-router对象 避免bug
      })
    }else if (res.responseCode === 203) {
      MessageBox.confirm('你还未登录，点击确定返回登陆页面', '确定', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('FedLogOut').then(() => {
          location.reload()// 为了重新实例化vue-router对象 避免bug
        })
      })
    }
    else if (res.responseCode === 9999) {
      MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('FedLogOut').then(() => {
          location.reload()// 为了重新实例化vue-router对象 避免bug
        })
      })
    }
    return response
  }
}, error => {
  console.log('err' + error)// for debug
  Message({
    message: error.message,
    type: 'error',
    duration: 10 * 1000
  })
  return Promise.reject(error)
})

export default {
  get: function (url, data) {
    let config = {
        url: url ,
        method: 'get'
      },
      get = function (url, data) {
        if(data){
          url = url+ '/' + JSON.stringify(data);
        }
        return service.get(url)
      }
    return get(url, data)
  },
  post:function (url, data) {
    //console.log(data)
    let config = {
      url: url,
      method: 'post',
      transformRequest: [function (data) {
        return JSON.stringify(data);
      }],
      data: data
    }
    return service.post(url, data)
  },
  put: function (url, data) {
    let config = {
      url: url,
      method: 'put',
      transformRequest: [function (data) {
        return JSON.stringify(data)
      }],
      data: data
    }
    return service.put(url, data)
  },
  delete: function(url, data) {
    let config = {
      url: url,
      method: 'delete',
      data: data
    }
    return service.delete(url, data)
  },
  upload: function (url, data) {
    let config = {
      url: url,
      method: 'post',
      data: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    return service.post(url, data)
  }
}
