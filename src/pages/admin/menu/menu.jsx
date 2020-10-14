import React from 'react'
import { Route, Switch } from 'react-router-dom'
import MenuForm from './menuForm'
import MenuList from './menuList'

function MenuIndex(props) {
  return (
    <Switch>
      <Route path='/admin/menu' component={MenuList} exact />
      <Route path='/admin/menu/form' component={MenuForm} />
      <Route component={MenuList} />
    </Switch>
  )
}

export default MenuIndex
