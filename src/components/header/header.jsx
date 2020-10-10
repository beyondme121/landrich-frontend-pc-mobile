import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import menuConfig from '../../config/menu-config'
import './header.less'

function MyHeader(props) {
  const [menuStatus, setMenuStatus] = useState(-1)
  const toggle = () => {
    setMenuStatus(menuStatus + 1)
  }

  const handleGoHome = () => {
    // setMenuStatus(menuStatus + 1)
    setMenuStatus(1)
    props.history.push('/')
  }

  return (
    <header>
      <div className="logo" onClick={handleGoHome}>NMEFC FCST</div>
      <nav className={menuStatus === -1 ? 'init' : menuStatus % 2 === 0 ? 'open' : 'closed'}>
        <ul>
          {
            menuConfig.map(item => {
              return (
                <li key={item.key} onClick={toggle}>
                  <Link
                    to={item.key}
                    key={item.key}
                  >
                    {item.title}
                  </Link>
                </li>
              )
            })
          }
        </ul>
      </nav>
      <div className="userinfo">
        <span className="userinfo-item" onClick={() => props.history.push('/login')}>登录</span>
        <span className="userinfo-item" onClick={() => props.history.push('/register')}>注册</span>
      </div>
      {/* 自适应 手机屏幕 折叠导航栏的三个横线按钮(图片) */}
      <div className="phoneIcon" onClick={toggle}></div>
    </header>
  )
}

export default withRouter(MyHeader)
