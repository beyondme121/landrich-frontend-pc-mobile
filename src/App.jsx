import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import Login from './pages/login/login'
import Register from './pages/register/register'
import Main from './pages/main/main'
import AdminIndex from './pages/admin/index/admin-index'
import './App.css'

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/admin' component={AdminIndex} />
        <Route path='/' component={Main} />
      </Switch>
    </Router>
  )
}

export default App
