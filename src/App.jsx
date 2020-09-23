import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import Login from './pages/login/login'
import Home from './pages/home/home'
import './App.css'

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/' component={Home} />
      </Switch>
    </Router>
  )
}

export default App
