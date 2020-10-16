import React, { useState } from 'react'
import { Dropdown, Menu } from 'antd'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { logout } from '../../../redux/actions/user-action'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import './header.less'
const { Item } = Menu

function MyHeader(props) {
  const {
    logout,
    user
  } = props

  const { onCollapsed, myCollapsed } = props
  // 将传入组件内部的参数转换为内部的状态
  const [innerStatus, setInnerStatus] = useState(myCollapsed)

  const dropDownMenu = (
    <Menu>
      <Item onClick={() => { props.history.replace('/') }}>
        <span>前台网站</span>
      </Item>
      <Item onClick={logout}>
        <span>注销</span>
      </Item>
    </Menu>
  )

  const changeStatus = () => {
    setInnerStatus(!myCollapsed)
    onCollapsed(innerStatus)
  }

  return (
    <div className="admin-header">
      <div className="admin-header-left">
        <div className="admin-title">NMEFC后台系统</div>
        <div className="admin-trigger" onClick={changeStatus}>
          {myCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>
      </div>
      <div className="admin-header-right">
        <Dropdown overlay={dropDownMenu}>
          <span className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            {user.username}
          </span>
        </Dropdown>
      </div>
    </div>
  )
}


export default connect(
  state => ({
    isLogin: state.user.isLogin,
    user: state.user.user
  }),
  { logout }
)(withRouter(MyHeader))