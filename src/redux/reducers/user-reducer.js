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
  let { type, payload } = action
  switch (type) {
    case SAVE_USER:
      return {
        user: payload.user,
        token: payload.token,
        isLogin: true,
      }
    case LOGOUT:
      return {
        user: {},
        token: '',
        isLogin: false,
      }
    default:
      return state
  }
}

export default userReducer
