import { reqLogin } from '../../api'
import { SAVE_USER, LOGOUT } from '../action-types'
import { message } from 'antd'

// 保存登录用户信息
const save_user = (user) => ({ type: SAVE_USER, data: user })

// 注销, 清除本地存储以及返回action 触发reducer中的状态的修改
export const logout = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  return {
    type: LOGOUT,
    data: '',
  }
}

// 登录
export const asyncLogin = ({ email, password }) => {
  return async (dispatch) => {
    const { code, data } = await reqLogin({ email, password })
    if (code === 0) {
      localStorage.setItem('user', JSON.stringify(data))
      localStorage.setItem('token', data.token)
      dispatch(save_user({ code, data, token: data.token }))
      message.success(`欢迎${data.name}用户访问网站`)
    } else {
      message.error(`Login failed.`)
    }
  }
}
