import React, { useState, memo, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { createFromIconfontCN } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import { asyncReqMenuList } from '../../redux/actions/menu-action'
import { iconfontURL } from '../../config/config'
import menuConfig from '../../config/menu-config'
import './header.less'

const IconFont = createFromIconfontCN({
  scriptUrl: iconfontURL
});

const MyHeader = memo(function MyHeader(props) {
  const { asyncReqMenuList, menuList } = props
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

  // 请求菜单数据
  useEffect(() => {
    let reqMenuList = async () => {
      await asyncReqMenuList()
    }
    if (menuList.length > 0) {
      return
    }
    reqMenuList()
  }, [menuList])

  return (
    <header>
      <div className="logo" onClick={handleGoHome}>NMEFC FCST</div>
      <nav className={menuStatus === -1 ? 'init' : menuStatus % 2 === 0 ? 'open' : 'closed'}>
        <ul>
          {
            menuList && menuList.map((item, index) => {
              if (item.MenuPath.startsWith('http')) {
                return (
                  <li key={item.key} onClick={() => toggle(index)} >
                    <a
                      href={item.key}
                      key={item.key}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={menuIndex === index ? 'active' : ''}
                    >
                      {item.title}
                    </a>
                  </li>
                )
              } else {
                return (
                  <li key={item.MenuPath} onClick={() => toggle(index)} >
                    <Link
                      to={item.MenuPath}
                      key={item.MenuPath}
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
      {
        props.user.isLogin ? null : <div className="userinfo">
          <span className="userinfo-item" onClick={() => props.history.push('/login')}>登录</span>
          <span className="userinfo-item" onClick={() => props.history.push('/register')}>注册</span>
        </div>
      }
      {/* 自适应 手机屏幕 折叠导航栏的三个横线按钮(图片) */}
      <IconFont type="icon-caidan" className="phoneIcon" onClick={toggle} />
    </header>
  )
})

export default withRouter(connect(
  state => ({
    user: state.user,
    menuList: state.menuList
  }),
  { asyncReqMenuList }
)(MyHeader))
