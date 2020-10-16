import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import TabForm from './tab-form'
import TabList from './tab-list'

function Tabs() {
  return (
    <Switch>
      <Route path='/admin/tab/list' component={TabList} />
      <Route path='/admin/tab/form' component={TabForm} />
      <Redirect to='/admin/tab/list' />
    </Switch>
  )
}
export default Tabs