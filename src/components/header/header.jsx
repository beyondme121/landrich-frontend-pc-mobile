import React, { useState, memo, useEffect, useMemo } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createFromIconfontCN } from '@ant-design/icons';
import { asyncReqMenuList } from '../../redux/actions/menu-action'
import { logout } from '../../redux/actions/user-action'
import { iconfontURL } from '../../config/config'
import HeaderMenu from './header-menu'
import { Dropdown, Menu } from 'antd'
import './header.less'

const IconFont = createFromIconfontCN({
  scriptUrl: iconfontURL
});
const { Item } = Menu

const MyHeader = memo(function MyHeader(props) {
  const { user, logout } = props
  const { asyncReqMenuList, menuListByChildrenAllInfo } = props
  const [menuStatus, setMenuStatus] = useState(-1)
  const [menuIndex, setMenuIndex] = useState(null)

  const toggle = (index) => {
    setMenuStatus(menuStatus + 1)
    setMenuIndex(index)
  }

  const handleGoHome = () => {
    setMenuStatus(1)
    props.history.push('/')
  }

  const dropDownMenu = () => {
    return user.user.username === 'admin' ?
      <Menu>
        <Item onClick={() => { props.history.replace('/admin') }}>
          <span>后台数据管理</span>
        </Item>
        <Item onClick={logout}>
          <span>注销</span>
        </Item>
      </Menu> :
      <Menu >
        <Item onClick={logout}>
          <span>注销</span>
        </Item>
      </Menu>
  }

  // 请求菜单数据
  useEffect(() => {
    let reqMenuList = async () => {
      await asyncReqMenuList()
    }
    if (menuListByChildrenAllInfo.length > 0) {
      return
    }
    reqMenuList()
  }, [menuListByChildrenAllInfo, asyncReqMenuList])

  // 前端界面展示内容 菜单类型Type是client
  let menuList = useMemo(() => {
    return menuListByChildrenAllInfo.filter(item => item.Type === 'client')
  }, [menuListByChildrenAllInfo])

  return (
    <header>
      <div className="logo" onClick={handleGoHome}>NMEFC FCST</div>
      <div className="pc-menu">
        <HeaderMenu />
      </div>
      <div className="mobile-menu">
        {/* 只解析第一层菜单 */}
        <nav className={menuStatus === -1 ? 'init' : menuStatus % 2 === 0 ? 'open' : 'closed'}>
          <ul>
            {
              menuList && menuList.map((item, index) => {
                if (item.MenuPath.startsWith('http')) {
                  return (
                    <li key={item.MenuId} onClick={() => toggle(index)} >
                      <a
                        href={item.MenuPath}
                        key={item.MenuId}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={menuIndex === index ? 'active' : ''}
                      >
                        {item.MenuNameEN}
                      </a>
                    </li>
                  )
                } else {
                  return (
                    <li key={item.MenuId} onClick={() => toggle(index)} >
                      <Link
                        to={item.MenuPath}
                        key={item.MenuId}
                        className={menuIndex === index ? 'active' : ''}
                      >
                        {item.MenuNameEN}
                      </Link>
                    </li>
                  )
                }
              })
            }
          </ul>
        </nav>
      </div>
      {/* {
        props.user.isLogin ? null : <div className="userinfo">
          <span className="userinfo-item" onClick={() => props.history.push('/login')}>登录</span>
          <span className="userinfo-item" onClick={() => props.history.push('/register')}>注册</span>
        </div>
      } */}
      <Dropdown overlay={dropDownMenu}>
        <span className="ant-dropdown-link" onClick={e => e.preventDefault()}>
          {user.user.username}
        </span>
      </Dropdown>
      {/* 自适应 手机屏幕 折叠导航栏的三个横线按钮(图片) */}
      <IconFont type="icon-caidan" className="phoneIcon" onClick={toggle} />
    </header>
  )
})

export default withRouter(connect(
  state => ({
    user: state.user,
    menuList: state.menuList,
    menuListByChildren: state.menuListByChildren,
    menuListByChildrenAllInfo: state.menuListByChildrenAllInfo
  }),
  {
    asyncReqMenuList,
    logout
  }
)(MyHeader))
