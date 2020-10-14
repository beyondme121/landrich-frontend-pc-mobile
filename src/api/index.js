import ajax from './ajax'
let BASE = '/api'

// 用户行为
export const reqRegister = (user) => ajax(BASE + '/user/register', user, 'POST')
// 邮箱密码登录
export const reqLogin = (user) => ajax(BASE + '/user/login', user, 'POST')
// export const reqLoginUtils = (user) => http(BASE + '/user/login', user, 'POST')

// 退出登录-注销
export const reqLogout = () => ajax(BASE + '/user/logout')

// 获取所有一级菜单下的所有cards明细数组
export const reqImageCards = () => ajax(BASE + '/image-cards')

// 查看明细
export const reqImageCardDetailById = (id) =>
  ajax(BASE + '/image-cards-detail', { id })

// 菜单管理(一级菜单)
// 1. 查询所有菜单
export const reqMenuList = () => ajax(BASE + '/menu')
// 2. 创建菜单
export const reqCreateMenu = (menuInfo) =>
  ajax(BASE + '/menu', menuInfo, 'POST')
