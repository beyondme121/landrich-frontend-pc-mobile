import React, { useMemo, useEffect, useCallback } from 'react'
import { Link, withRouter } from 'react-router-dom'
import {
  // createFromIconfontCN,
  FileTextOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { connect } from 'react-redux'
import { asyncReqMenuList } from '../../../redux/actions/menu-action'
// import { iconfontURL } from '../../../config/config'
import './left-nav.less'
const { Sider } = Layout;
const { SubMenu, Item } = Menu;

// const IconFont = createFromIconfontCN({
//   scriptUrl: iconfontURL,
// });

const LeftNav = function LeftNav(props) {
  // redux
  const { user, asyncReqMenuList, menuList, menuListByChildrenAllInfo } = props
  // 父组件
  const { myCollapsed } = props

  useEffect(() => {
    let fn = async () => {
      await asyncReqMenuList()
    }
    if (menuList.length > 0) {
      return
    }
    fn()
  }, [menuList, asyncReqMenuList])

  const hasAuth = useCallback(
    item => {
      if (item.Type === 'admin' && user.username === 'admin') {
        return true
      }
      // else if (item.children) {
      // return !!item.children.find(child => child.Type === 'admin')
      // }
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
            pre.push(
              <Item key={item.MenuPath}>
                <Link to={item.MenuPath}>
                  {/* <IconFont type="icon-menu" className="menuIcon" /> */}
                  <FileTextOutlined />
                  <span>{item.MenuNameCN}</span>
                </Link>
              </Item>
            )
          } else {
            pre.push(
              <SubMenu
                key={item.MenuPath}
                title={
                  <>
                    {/* <IconFont type="icon-menu" className="menuIcon" /> */}
                    <FileTextOutlined />
                    <span>{item.MenuNameCN}</span>
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
    <div className="left-nav">
      <Sider
        className="admin-layout-background"
        collapsible
        collapsed={myCollapsed}   //  collapsed
        trigger={null}
      >
        {
          menuTree ?
            <Menu
              mode="inline"   // vertical, inline
              theme="dark"
              style={{ height: '100%', borderRight: 0 }}
              defaultOpenKeys={['/admin']}
              inlineIndent={10}
            >
              {menuTree}
            </Menu> : null
        }
      </Sider>
    </div>
  )
}

export default withRouter(connect(
  state => ({
    user: state.user.user,
    menuList: state.menuList,
    menuListByChildren: state.menuListByChildren,
    menuListByChildrenAllInfo: state.menuListByChildrenAllInfo
  }),
  {
    asyncReqMenuList,
  }
)(LeftNav))