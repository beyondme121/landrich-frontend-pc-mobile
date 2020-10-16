import {
  SAVE_MENU_LIST,
  SAVE_MENU_CARDS,
  SAVE_MENU_LIST_CHILDREN_FOR_TREE_SELECT,
  SAVE_MENU_LIST_CHILDREN_FOR_ALL_INFO,
  CLEAR_REDUX_STATE,
} from '../action-types'

let initMenuCards = []

// 一级菜单状态(数据库原始表结构)
function menuReducer(state = [], action) {
  let { type, data } = action
  switch (type) {
    case SAVE_MENU_LIST:
      return [...data]
    case CLEAR_REDUX_STATE:
      return []
    default:
      return state
  }
}

// 菜单children结构
const menuListByChildren = (state = [], action) => {
  const { type, data } = action
  switch (type) {
    case SAVE_MENU_LIST_CHILDREN_FOR_TREE_SELECT:
      return [...data]
    case CLEAR_REDUX_STATE:
      return []
    default:
      return state
  }
}

const menuListByChildrenAllInfo = (state = [], action) => {
  const { type, data } = action
  switch (type) {
    case SAVE_MENU_LIST_CHILDREN_FOR_ALL_INFO:
      return [...data]
    case CLEAR_REDUX_STATE:
      return []
    default:
      return state
  }
}

// 每个card的数据
function menuCardsReducer(state = initMenuCards, action) {
  let { type, data } = action
  switch (type) {
    case SAVE_MENU_CARDS:
      return [...data]
    case CLEAR_REDUX_STATE:
      return []
    default:
      return state
  }
}

export default {
  menuReducer,
  menuCardsReducer,
  menuListByChildren,
  menuListByChildrenAllInfo,
}
