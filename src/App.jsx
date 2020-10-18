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

const GetBaidu = props => {
  let children = props.children;
  (function () {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?dd229fe0376190ea704035d12d84aa4e";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
  })();
  return children;
};

function App() {
  return (
    <Router>
      <Switch>
        {/* <GetBaidu> */}
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/admin' component={AdminIndex} />
        <Route path='/' component={Main} />
        {/* </GetBaidu> */}
      </Switch>
    </Router>
  )
}

export default App
