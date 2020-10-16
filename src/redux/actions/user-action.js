import { reqLogin } from '../../api'
import { SAVE_USER, LOGOUT, CLEAR_REDUX_STATE } from '../action-types'
import { message } from 'antd'

// 保存登录用户信息
const save_user = (userInfo) => ({ type: SAVE_USER, payload: userInfo })
const logoutSync = () => ({ type: LOGOUT })
const clearReduxState = () => ({ type: CLEAR_REDUX_STATE })

// 注销, 清除本地存储以及返回action 触发reducer中的状态的修改
export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    message.success(`注销成功`)
    dispatch(logoutSync())
    dispatch(clearReduxState())
  }
}

// 登录
export const asyncLogin = ({ email, password }) => {
  return async (dispatch) => {
    let { code, user, token, msg } = await reqLogin({ email, password })
    if (code === 0) {
      let userData = {
        userid: user.userid,
        username: user.username,
        email: user.email,
        company: user.company,
      }
      localStorage.setItem('user', JSON.stringify(userData))
      localStorage.setItem('token', token)
      dispatch(save_user({ code, user: userData, token: token }))
      message.success(`欢迎${user.username}用户访问网站`)
    } else {
      message.error(`Login failed. action asyncLogin, ${msg}`)
    }
  }
}
