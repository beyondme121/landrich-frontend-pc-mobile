import ajax from './ajax'
let BASE = '/api'

// ========================= 1. 用户行为 =========================
export const reqRegister = (user) => ajax(BASE + '/user/register', user, 'POST')
// 邮箱密码登录
export const reqLogin = (user) => ajax(BASE + '/user/login', user, 'POST')
// 退出登录-注销
export const reqLogout = () => ajax(BASE + '/user/logout')

// ========================= 2. 菜单管理(一级菜单) =========================
// 1. 查询所有菜单
export const reqGetMenuList = () => ajax(BASE + '/menu')
// 2. 创建菜单
export const reqCreateMenu = (menu) => ajax(BASE + '/menu', menu, 'POST')

// ========================= 3. 内容管理(图片Card) =========================
// 3. 创建图片Card
export const reqCreateImageCard = (card) =>
  ajax(BASE + '/image-cards', card, 'POST')

// 4. 获取所有一级菜单下的所有cards明细数组
export const reqGetImageCards = () => ajax(BASE + '/image-cards')

// 5. 查看明细
export const reqGetImageCardDetailById = (id) =>
  ajax(BASE + '/image-cards-detail', { id })
export const reqGetImageCardDetailAll = () =>
  ajax(BASE + '/image-cards-detail-all')

// ========================= 4. Tab管理(菜单下的Tab) =========================
// 6. tab清单
export const reqGetTabList = () => ajax(BASE + '/tab-list')
// 7. 创建tab
export const reqCreateTab = (tab) => ajax(BASE + '/tab', tab, 'POST')
// 8. tab与menu对应关系
export const reqGetTabMenuMapping = () => ajax(BASE + '/tab-menu-mapping')
