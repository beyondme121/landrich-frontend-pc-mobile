import React, { useState } from 'react'
import { Select, message } from 'antd'
import { connect } from 'react-redux'
import { logout } from '../../../redux/actions/user-action'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import './header.less'
const { Option } = Select

function MyHeader(props) {
  const {
    logout,
    user
  } = props

  const { onCollapsed, myCollapsed } = props
  // 将传入组件内部的参数转换为内部的状态
  const [innerStatus, setInnerStatus] = useState(myCollapsed)

  const handleLogout = value => {
    if (value === '注销') {
      logout()
      message.info('注销')
    }
  }

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
        <Select onChange={val => handleLogout(val)} style={{ width: 120 }} bordered={false}>
          <Option value={user.username}>{user.name}</Option>
          <Option value='注销'>注销</Option>
          <Option value='个人设置'>个人设置</Option>
        </Select>
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
)(MyHeader)