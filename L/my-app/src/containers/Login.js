import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cssModuels from 'react-css-modules'
import { Button } from 'antd'
import { UserContext } from '../context/user-context'
// eslint-disable-next-line
import { TestContext } from '../context/test-context'
import styles from './Login.module.scss'

class Login extends Component {
  static propTypes = {
    onLogin: PropTypes.func.isRequired,
    onReg: PropTypes.func.isRequired
  }

  static contextType = UserContext

  state = {
    username: '',
    password: ''
  }

  handleLogin = () => {
    console.log(this.state)
    // const { login } = this.context
    // login({ username: this.state.username })
    // todo
    this.props.onLogin({
      email: this.state.username,
      password: this.state.password
    })
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value
    })
  }

  render() {
    const { username, password } = this.state
    console.log(this.context)
    return (
      <div styleName="login-box">
        <div styleName="input-group">
          <label htmlFor="username">用户名</label>
          <input
            name="username"
            value={username}
            onChange={this.handleChange}
            type="text"
          />
        </div>
        <div styleName="input-group">
          <label htmlFor="password">密码</label>
          <input
            name="password"
            password="true"
            value={password}
            onChange={this.handleChange}
            type="password"
          />
        </div>
        <div styleName="btn-group">
          <Button type="primary" onClick={this.handleLogin}>
            登录
          </Button>
          <Button>注册</Button>
        </div>
        {/* <TestContext.Consumer>
          {version => <i>{version.current}</i>}
        </TestContext.Consumer> */}
      </div>
    )
  }
}

export default cssModuels(Login, styles)
