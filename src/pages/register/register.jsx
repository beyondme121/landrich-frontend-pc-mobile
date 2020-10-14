import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { Form, Input, Button, message } from 'antd';
import { reqRegister } from '../../api'
import './register.less'
const { Item } = Form

function Register(props) {
  const { user } = props

  const handleSubmit = async values => {
    const res = await reqRegister(values)
    if (res.code === -1) {
      message.error(res.msg)
    } else {
      message.success(`注册成功`)
      props.history.replace('/login')
    }
  };

  if (user.isLogin) {
    return <Redirect to='/' />
  } else {
    return (
      <div className="register">
        <div className="register-left">
          <h1>NMEFC&nbsp;FCST&nbsp;Portal</h1>
          <p className="info">
            This UNOFFICIAL Web shows some FCST Figs.Related Figs are WELCOME!
          </p>
        </div>
        <div className="register-right">
          <div className="form-title">
            <strong>{props.history.location.pathname === '/register' ? '注册' : null}</strong>
            <span>已有帐号？
                {props.history.location.pathname === '/register' ?
                <Link to='/login'>点此登录</Link> : null}
            </span>
          </div>
          <Form
            name="signup"
            onFinish={handleSubmit}
          >
            <Item
              name="username"
              rules={[
                { required: true, message: 'please input your nickname' }
              ]}
            >
              <Input placeholder="Nickname" />
            </Item>
            <Item
              name="email"
              rules={[
                { type: 'email', message: 'The input is not valid E-mail!' },
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
            <Item
              name="re_password"
              dependencies={['password']}
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject('The two passwords that you entered do not match!');
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Re-Password" />
            </Item>
            <Item
              name="company"
              rules={[
                { required: true, message: 'company must input' },
              ]}
            >
              <Input placeholder="company" />
            </Item>
            <Item>
              <Button
                type="primary"
                htmlType="submit"
                className="submitBtn"
                size="large"
              >
                <strong>Sign Up</strong>
              </Button>
            </Item>
          </Form>
        </div>
      </div>
    )
  }

}

export default connect(
  state => ({
    user: state.user
  })
)(Register)