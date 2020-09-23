import axios from 'axios'
// import { message } from 'antd'
import store from '../redux/store'
let instance = axios.create()

// 请求拦截器, 给请求添加token验证的Authorization
instance.interceptors.request.use((config) => {
  let token = store.getState().user.token
  token && (config.headers.common['Authorization'] = 'Bearer ' + token)
  return config
})

instance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // if (error.response.status === 401) {
    //   message.error(`Protected resource, Please login!!!, ${error.message}`, 3)
    // } else {
    //   message.error(`请求出错了: ${error.message}`, 3)
    // }
    return new Promise(() => {})
  }
)

export default function ajax(url, data = {}, method = 'GET') {
  return new Promise((resolve, reject) => {
    let promise
    // 异步请求
    if (method === 'GET') {
      promise = instance.get(url, { params: data })
    } else {
      promise = instance({
        url,
        method,
        data,
      })
    }
    // 异常处理
    promise
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        // message.error(`请求出错了!!!: ${err.message}`, 5)
        console.log('error')
      })
  })
}
