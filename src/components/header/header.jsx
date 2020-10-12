import React, { useState, memo } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { createFromIconfontCN } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import menuConfig from '../../config/menu-config'
import './header.less'


const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1914917_oqq5lu3wd0e.js',
});

const MyHeader = memo(function MyHeader(props) {
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

  return (
    <header>
      <div className="logo" onClick={handleGoHome}>NMEFC FCST</div>
      <nav className={menuStatus === -1 ? 'init' : menuStatus % 2 === 0 ? 'open' : 'closed'}>
        <ul>
          {
            menuConfig.map((item, index) => {
              if (item.key.startsWith('http')) {
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
                  <li key={item.key} onClick={() => toggle(index)} >
                    <Link
                      to={item.key}
                      key={item.key}
                      className={menuIndex === index ? 'active' : ''}
                    >
                      {item.title}
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
    user: state.user
  }),
  {}
)(MyHeader))
