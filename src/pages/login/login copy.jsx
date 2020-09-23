import React from 'react'
import { connect } from 'react-redux'
import { Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom'
import { asyncLogin } from '../../redux/actions/user-action'
import { Redirect } from 'react-router-dom';
import bgimg from '../../assets/images/login-bgimg.png'
import './login.less'
const { Item } = Form
function Login(props) {
  const { asyncLogin } = props
  // 登录提交点击事件
  const handleSubmit = async values => {
    await asyncLogin(values)
  };

  return (

    <div className="signup-container">
      <div className="signup-container-left" style={{ backgroundImage: `url(${bgimg})` }}>
        <h1>NMEFC&nbsp;FCST&nbsp;Portal</h1>
        <p className="welcome-slogon">
          This UNOFFICIAL Web shows some FCST Figs.Related Figs are WELCOME!
          </p>
      </div>
      <div className="signup-container-right">
        <div className="form-title">
          <strong>{props.history.location.pathname === '/signin' ? '登录' : null}</strong>
          <span>没有帐号？
              {props.history.location.pathname === '/signin' ?
              <Link to='/signup'>点此注册</Link> : null}
          </span>
        </div>
        <Form
          name="signup"
          onFinish={handleSubmit}
        >
          <Item
            name="email"
            rules={[
              { required: true, message: 'please input your email' }
            ]}
          >
            <Input placeholder="Email" />
          </Item>
          <Item
            name="password"
            rules={[
              { required: true, message: 'password must input' },
              {
                min: 6,
                message: "Make sure it's at least 6 characters OR at least 8 characters including a number and a lowercase letter."
              }
            ]}
          >
            <Input.Password placeholder="Password" />
          </Item>
          <Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: '100%', backgroundColor: '#FE7300' }}
              size="large"
            >
              <strong>Sign In</strong>
            </Button>
          </Item>
        </Form>
      </div>
    </div>

  )
}
export default connect(
  state => ({
    user: state.user
  }),
  { asyncLogin }
)(Login)