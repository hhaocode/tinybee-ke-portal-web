import axios from 'axios'
import qs from 'qs'

import { getToken, removeToken } from '@/utils/auth'
// import router from '@/router'

const http = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 1000 * 60 // 10秒
})

http.interceptors.request.use(
  config => {
    // can set some setting before request is sent
    // get token for authentication
    const token = getToken()
    if (token) {
      config.headers.Authorization = token
      config.headers['x-access-token'] = token
    }
    if (config.method === 'get') {
      config.paramsSerializer = function (params) {
        return qs.stringify(params, { arrayFormat: 'repeat' })
      }
    }
    return config
  },
  error => {
    console.error('request error: => ', error)
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  response => {
    const res = response.data
    // do something response
    // business handle
    if (res && res.code === 401) {
      console.log(401)
      console.log(res)
      removeToken()
      // router.replace({ name: 'Login', query: { redirect: window.location.href } })
      window.location.href = '/auth/login?redirect=' + window.location.href
    }
    if (res && res.code === 4011) {
      removeToken()
      // return Promise.reject({ message: 'token失效但是不需要用户去登录' })
    }
    console.log(res)
    return res
  },
  error => {
    console.error('response error: => ', error)
    // UI notice
    return Promise.reject(error)
  }
)

export default http
