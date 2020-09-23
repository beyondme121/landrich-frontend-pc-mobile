import { SAVE_USER, LOGOUT } from '../action-types'

let _user =
  localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'))
let _token = localStorage.getItem('token')

let initUser = {
  user: _user || {},
  token: _token || '',
  isLogin: _user && _token ? true : false,
}

function userReducer(state = initUser, action) {
  let { type, data } = action
  switch (type) {
    case SAVE_USER:
      return {
        user: data.data,
        token: data.token,
        isLogin: true,
      }
    case LOGOUT:
      return {
        user: {},
        token: '',
      }
    default:
      return state
  }
}

export default userReducer
