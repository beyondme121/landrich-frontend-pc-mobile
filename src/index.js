import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './redux/store'
import 'core-js/es'
import 'react-app-polyfill/ie9'
import 'react-app-polyfill/stable'
// 轮播图文字动画必须加载animate.css
import 'animate.css'
// import 'normalize.css'
import './assets/style/reset.css'
import './index.less'
import './assets/style/key-frames.css'

import App from './App.jsx'
// import Home from './pages/home/home'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
