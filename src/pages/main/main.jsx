import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from '../home/home'
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import Template from '../page-template/page-template'
import ImageWrapper from '../../components/image-detail/image-detail'
import './main.less'

function Main(props) {
  if (!props.user.isLogin) {
    return <Redirect to='/login' />
  }
  return (
    <div className="container">
      <Header />
      <div className="content">
        <Switch>
          <Route path='/' component={Home} exact />
          {/* 菜单路由切换 根据路由切换的url, 加载不同的数据 */}
          <Route path="/nav/:moduleName" component={Template} />
          <Route path="/:tag" component={ImageWrapper} />
        </Switch>
      </div>
      <Footer />
    </div>
  )
}

export default connect(
  state => ({
    user: state.user
  }),
  {}
)(Main)