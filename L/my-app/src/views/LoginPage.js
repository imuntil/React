import React, { Component } from 'react'
import cssModules from 'react-css-modules'
import Yozora from '../components/Yozora'
import Login from '../containers/Login'
import styles from './Login.module.scss'
import { UserContext } from '../context/user-context'
import { login } from '../request'

class LoginPage extends Component {
  static contextType = UserContext
  handleLogin = async user => {
    try {
      const res = await login(user)
      if (res) {
        this.context.login(res)
        localStorage.setItem('szk_token', res.token)
        this.props.history.push('/')
      }
    } catch (error) {
      console.log(error)
    }
  }
  handleReg = () => {}
  render() {
    return (
      <Yozora>
        <div styleName="main">
          <Login onLogin={this.handleLogin} onReg={this.handleReg} />
        </div>
      </Yozora>
    )
  }
}

export default cssModules(LoginPage, styles)
