import React, { useState, useCallback } from 'react'
import { connect } from 'react-redux'
import { Redirect, Switch, Route } from 'react-router-dom'
import { Layout, Breadcrumb } from 'antd';
// 通用组件
import Header from '../header/header'
import LeftNav from '../left-nav/left-nav'
import MenuIndex from '../menu/menu'

// import { asyncReqMenuList } from '../../../redux/actions/menu-action'
import './admin.less'

const { Content } = Layout;

const Admin = function Admin(props) {
  let { user } = props
  const [collapsed, setCollapsed] = useState(false)

  const onCollapsed = useCallback(collapsed => {
    setCollapsed(!collapsed)
  }, [])

  // 如果没有登录
  if (!user.isLogin || user.user.username !== 'admin') {
    return <Redirect to="/" />
  }

  return (
    <Layout className="admin-wrapper">
      <Header onCollapsed={onCollapsed} myCollapsed={collapsed} />
      <Layout>
        <LeftNav myCollapsed={collapsed} />
        <Layout style={{ padding: '0', position: "relative" }}>
          <Breadcrumb className="admin-bread-nav">
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content className="admin-content">
            <Switch>
              <Route path='/admin/menu' component={MenuIndex} />
              <Redirect to='/admin/menu' />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default connect(
  state => ({
    user: state.user,
  }),
)(Admin)

