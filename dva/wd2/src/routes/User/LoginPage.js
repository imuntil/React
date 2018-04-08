import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Toast } from 'antd-mobile'
import UInput from '@/components/Form/UInput'
import { delay } from '@/utils/cts'
import './LoginPage.scss'

@connect()
class LoginPage extends PureComponent {
  state = {
    submitted: false
  }
  form = {
    phone: '',
    password: ''
  }
  formValid = {}
  get isFormOK() {
    return Object.values(this.formValid).every(v => v)
  }
  handleChange = ({ value, name, $valid }) => {
    this.form[name] = value
    this.formValid[name] = $valid.valid
  }
  handleSubmit = async () => {
    const { submitted } = this.state
    if (submitted) return
    this.setState({ submitted: true })
    if (this.isFormOK) {
      this.handleLogin()
    }
    await delay(1500)
    this.setState({ submitted: false })
  }
  handleLogin = () => {
    this.props
      .dispatch({
        type: 'user/login',
        payload: this.form
      })
      .then(v => {
        if (v && v.msg) {
          Toast.info(v.msg, 1.5)
        }
      })
  }
  render() {
    const { submitted } = this.state
    return (
      <div className="container login-82laj">
        <div className="box-82laj">
          <p className="form-item">
            <label>
              <i>手</i>
              <i>机</i>
              <i>号</i>
            </label>
            <UInput
              name="phone"
              onInputChange={this.handleChange}
              type="tel"
              reg="phone"
              shake={submitted}
              required
            />
          </p>
          <p className="form-item">
            <label>
              <i>密</i>
              <i>码</i>
            </label>
            <UInput
              name="password"
              onInputChange={this.handleChange}
              type="password"
              reg="password"
              shake={submitted}
              required
            />
          </p>
          <a
            href="javascript:;"
            className="form-btn"
            onClick={this.handleSubmit}
          >
            登录
          </a>
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
