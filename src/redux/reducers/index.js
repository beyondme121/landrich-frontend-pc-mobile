import { combineReducers } from 'redux'
import user from './user-reducer'
import menu from './menu-reducer'

export default combineReducers({
  user,
  imageCards: menu.menuCardsReducer, //
  menuList: menu.menuReducer, //  菜单数据
  menuListByChildren: menu.menuListByChildren,
  menuListByChildrenAllInfo: menu.menuListByChildrenAllInfo,
})
