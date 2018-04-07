import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { regs } from '@/utils/cts'
import './LoginPage.scss'

@connect()
class LoginPage extends PureComponent {
  state = {
    phone: '',
    password: '',
    submited: false,
    errors: {

    }
  }
  handleChange = e => {
    const { name, value } = e.target
    this.setState({
      [name]: value.trim()
    })
  }
  handleSubmit = () => {
    const { submited } = this.state
    if (submited) return
    this.setState({ submited: true })
  }
  validate = () => {
    const { phone, password } = this.state
    if (!phone)
  }
  render () {
    const { phone, password } = this.state
    return (
      <div className="container login-82laj">
        <div className="box-82laj">
          <p className="form-item">
            <label><i>手</i><i>机</i><i>号</i></label>
            <input name="phone" value={phone} onChange={this.handleChange} type="tel"/>
          </p>
          <p className="form-item">
            <label><i>密</i><i>码</i></label>
            <input name="password" value={password} onChange={this.handleChange} type="password"/>
          </p>
          <a href="javascript:;" className="form-btn" onClick={this.handleSubmit}>登录</a>
          <div className="btn-group-82laj">
            <a href="javascript:;">用户注册</a>
            <a href="javascript:;">忘记密码</a>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginPage
