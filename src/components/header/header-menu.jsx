import React, { memo, useMemo, useCallback } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
// import { createFromIconfontCN } from '@ant-design/icons';
// import { iconfontURL } from '../../config/config'
import { asyncReqMenuList } from '../../redux/actions/menu-action'
import { Menu } from 'antd';
import './header-menu.less'
const { SubMenu, Item } = Menu;

const HeaderMenu = memo(function HeaderMenu(props) {
  let { user, menuListByChildrenAllInfo } = props

  // 客户端鉴权
  const hasAuth = useCallback(
    item => {
      if (item.Type === 'client' && user.username === 'admin') {
        return true
      }
      return false
    },
    [user.username],
  )

  let menuTree = useMemo(() => {
    // 递归函数
    const getMenuNodes = data => {
      let res = data && data.reduce((pre, item) => {
        if (hasAuth(item)) {
          if (!item.children) {
            if (!item.MenuPath.startsWith('http')) {
              pre.push(
                <Item key={item.MenuPath}>
                  <Link to={item.MenuPath}>
                    <span>{item.MenuNameEN}</span>
                  </Link>
                </Item>
              )
            } else {
              pre.push(
                <Item key={item.MenuPath}>
                  <a
                    href={item.MenuPath}
                    key={item.MenuPath}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.MenuNameEN}
                  </a>
                </Item>
              )
            }
          } else {
            pre.push(
              <SubMenu
                key={item.MenuPath}
                title={
                  <>
                    <span>{item.MenuNameEN}</span>
                  </>
                }
              >
                {getMenuNodes(item.children)}
              </SubMenu>
            )
          }
        }
        return pre
      }, [])
      return res
    }
    // 调用函数
    return getMenuNodes(menuListByChildrenAllInfo)
  }, [menuListByChildrenAllInfo, hasAuth])

  return (
    <Menu
      mode="horizontal"
    >
      {menuTree}
    </Menu>
  )
})

export default connect(
  state => ({
    user: state.user.user,
    menuList: state.menuList,
    menuListByChildren: state.menuListByChildren,
    menuListByChildrenAllInfo: state.menuListByChildrenAllInfo
  }),
  { asyncReqMenuList }
)(HeaderMenu)