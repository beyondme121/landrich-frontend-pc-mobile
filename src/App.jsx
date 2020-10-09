import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import Login from './pages/login/login'
import Main from './pages/main/main'
import './App.css'

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/' component={Main} />
      </Switch>
    </Router>
  )
}

export default App
