import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'
import { delay } from '@/utils/cts'
import { getCode, isExist } from '@/services'
import { Toast } from 'antd-mobile'
import UInput from '@/components/Form/UInput'
import UCode from '@/components/Form/UCode'
import './LoginPage.scss'

@connect()
export default class Register1Page extends PureComponent {
  state = { submitted: false }
  form = { phone: {}, code: {} }
  /* phone/code input 实例 */
  phoneEle = null
  codeEle = null
  /* server 返回的 code */
  code = ''

  componentWillUnmount = () => {
    this.setState = (state, callback) => {
      return
    } 
  }

  handleChange = ({ value, name, $valid: { valid } }) => {
    this.form[name] = { value, valid }
  }

  handleSubmit = async () => {
    if (this.state.submitted) return
    this.setState({ submitted: true })
    const { phone, code } = this.form
    if (this.checkForm(phone, code)) {
      const { dispatch, history } = this.props
      dispatch({
        type: 'user/setReg',
        payload: {
          phone: phone.value,
          code: code.value
        }
      })
      history.push('/user/reg2')
    }
    await delay(1000)
    this.setState({ submitted: false })
  }

  handleCodeClick = async cb => {
    const { value, valid } = this.form.phone
    if (!valid) {
      this.phoneEle.$shake()
      return
    }
    /* if phone is exist */
    Toast.loading(null, 100)
    await delay(100)
    // const { data, fail } = await isExist(value)
    const { data, fail } = { fail: { result: 'OTUwOTEx', code: 0 } }
    if (data) {
      Toast.info('该手机号已被注册', 1.5)
      return
    }
    if (fail && +fail.code === 0) {
      /* get code from server */
      const res = await this.getCode(value)
      /* code stopwatch run */
      res && this.codeEle.run()
    }
  }

  /* 获取验证码 */
  getCode = async phone => {
    // const { data } = await getCode({ phone })
    const data = { result: 'OTUwOTEx' }
    const fail = {}
    if (fail && +fail.code === -1) {
      Toast.info('操作过于频繁', 2)
      return
    }
    if (!data) {
      Toast.info('出错了，请稍后再试', 1.5)
      return
    }
    Toast.info('验证码已发送', 1.5)
    this.code = atob(data.result)
    return true
  }

  /* 检查表单 */
  checkForm = (phone, code) => {
    if (!phone.valid || !code.valid) {
      return false
    }
    if (code.value !== this.code) {
      Toast.info('验证码有误', 1.5)
      return false
    }
    return true
  }

  render() {
    const { submitted } = this.state
    return (
      <div className="container login-82laj reg-0dmf9">
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
              ref={el => (this.phoneEle = el)}
              shake={submitted}
              required
            />
          </p>
          <div className="sp-form-item-82laj">
            <p className="form-item">
              <label htmlFor="">
                {'验证码'.split('').map(v => <i key={v}>{v}</i>)}
              </label>
              <UInput
                name="code"
                onInputChange={this.handleChange}
                type="tel"
                reg="^\d{6}$"
                shake={submitted}
                required
              />
            </p>
            <UCode
              onCodeClick={this.handleCodeClick}
              ref={el => (this.codeEle = el)}
            />
          </div>
          <a
            href="javascript:;"
            className="form-btn"
            onClick={this.handleSubmit}
          >
            下一步
          </a>
          <div className="btn-group-82laj and--center">
            <Link to="/user/login">用户登录</Link>
          </div>
        </div>
      </div>
    )
  }
}
