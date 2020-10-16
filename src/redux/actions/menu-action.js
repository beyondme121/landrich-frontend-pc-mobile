import { reqGetImageCards, reqGetMenuList } from '../../api'
import {
  SAVE_MENU_CARDS,
  SAVE_MENU_LIST,
  SAVE_MENU_LIST_CHILDREN_FOR_TREE_SELECT,
  SAVE_MENU_LIST_CHILDREN_FOR_ALL_INFO,
} from '../action-types'
import { message } from 'antd'
import { toTree, makeDataToChildren } from '../../utils/index'
// 保存card数据
const save_cards = (data) => ({ type: SAVE_MENU_CARDS, data })

// 保存一级菜单数据 (数据库中二维表结构)
const save_menu_list = (data) => ({ type: SAVE_MENU_LIST, data })
// 保存菜单children结构, 所有信息
const save_menu_list_children_for_all_info = (data) => ({
  type: SAVE_MENU_LIST_CHILDREN_FOR_ALL_INFO,
  data,
})
// 专门处理TreeSelect组件使用的树形结构
const save_menu_children_for_tree_select = (data) => {
  // 递归的写法
  const fn = (data) => {
    return data.reduce((pre, item) => {
      if (!item.children) {
        pre.push({
          title: item.MenuNameEN,
          value: item.MenuId,
          key: item.MenuId,
        })
      } else {
        pre.push({
          title: item.MenuNameEN,
          value: item.MenuId,
          key: item.MenuId,
          children: fn(item.children),
        })
      }
      return pre
    }, [])
  }

  let res = fn(data)

  return {
    type: SAVE_MENU_LIST_CHILDREN_FOR_TREE_SELECT,
    data: res,
  }
}

// 获取一级菜单列表数据
export const asyncReqMenuList = () => {
  return async (dispatch) => {
    let { code, data } = await reqGetMenuList()
    if (code === 0) {
      // 将数据库中父子结构转换成children结构
      let childrenDataForTree = toTree(data, {
        id: 'MenuId',
        parentId: 'ParentMenuId',
        children: 'children',
        rootId: '',
      })
      let childrenData = makeDataToChildren(data, 'MenuId', 'ParentMenuId', '')
      dispatch(save_menu_list(data))
      dispatch(save_menu_list_children_for_all_info(childrenData))
      dispatch(save_menu_children_for_tree_select(childrenDataForTree))
    } else {
      message.error(`查询菜单数据失败`)
    }
  }
}

// 3. 请求图片
export const asyncReqImageCards = () => {
  return async (dispatch) => {
    const { code, data } = await reqGetImageCards()
    if (code === 0) {
      dispatch(save_cards(data))
    } else {
      message.error(`查询数据失败`)
    }
  }
}
