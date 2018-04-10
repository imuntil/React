import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Route, Switch, Redirect } from 'dva/router'
import { Toast } from 'antd-mobile'
import UInput from '@/components/Form/UInput'
import UCode from '@/components/Form/UCode'
import { delay, regs } from '@/utils/cts'
/* eslint-disable no-unused-vars */
import { getCode, isExist, modifyPwd } from '@/services'
import './ForgetPage.scss'

const phoneReg = regs.phone.reg

class Step extends PureComponent {
  state = { submitted: false }

  form = {}

  get formValid() {
    const f = Object.values(this.form)
    if (!f || !f.length) return false
    return f.every(v => v.valid)
  }

  componentWillUnmount = () => {
    this.setState = () => {
      return
    }
  }

  handleChange = ({ value, name, $valid: { valid } }) => {
    this.form[name] = { value, valid }
  }

  handleClick = async () => {
    if (this.state.submitted) return
    this.setState({ submitted: true })
    this.handle()
    await delay(1000)
    this.setState({ submitted: false })
  }

  handle = async () => {
    if (!this.formValid) return
  }
}

class Step1 extends Step {
  handle = async () => {
    if (!this.formValid) return
    const { history } = this.props
    const phone = this.form.phone.value
    const { data, fail } = await isExist(phone)
    if (fail && +fail.code === 0) {
      Toast.info('手机号码不存在', 1.5)
      return
    }
    if (data) {
      history.replace('/user/forget/2/' + phone)
      return
    }
    Toast.info('出错了，请稍后再试', 1.5)
  }

  render() {
    const { submitted } = this.state
    return (
      <div className="step1">
        <div className="step-item-57spq">
          <p className="form-item">
            <label htmlFor="">
              {'请输入绑定手机号'.split('').map(v => <i key={v}>{v}</i>)}
            </label>
            <UInput
              name="phone"
              type="tel"
              reg="phone"
              onInputChange={this.handleChange}
              shake={submitted}
              required
            />
          </p>
        </div>
        <p className="btn-box-57spq">
          <a
            href="javascript:;"
            className="form-btn"
            onClick={this.handleClick}
          >
            下一步
          </a>
        </p>
      </div>
    )
  }
}

class Step2 extends Step {
  code = null
  codeEle = null

  componentDidMount = () => {
    const { match, history } = this.props
    const { phone } = match.params
    if (!phone || !phoneReg.test(phone)) {
      history.replace('/user/forget/1')
      return
    }
    this.codeEle && this.codeEle.handleClick()
  }

  handleCodeClick = async () => {
    Toast.loading(null, 100)
    await delay(100)
    const res = await this.getCode()
    res && this.codeEle.run()
  }

  getCode = async phone => {
    // const { data } = await getCode({ phone, flag: 5 })
    const data = { result: 'OTUwOTEx' }
    if (!data) {
      Toast.info('出错了，请稍后再试', 1.5)
      return
    }
    Toast.info('验证码已发送', 1.5)
    this.code = atob(data.result)
    return true
  }

  handle = () => {
    if (!this.formValid) return
    const code = this.form.code.value
    const { history, match } = this.props
    if (code !== this.code) {
      Toast.info('验证码有误', 1.5)
      return
    }
    history.replace('/user/forget/3/' + match.params.phone)
  }

  render() {
    const { submitted } = this.state
    return (
      <div className="step2">
        <div className="step-item-57spq">
          <p className="warning">短信验证码已经发送到手机130****3937</p>
        </div>
        <div className="step-item-57spq">
          <div className="split-box-57spq">
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
              runningText="重新发送 $$"
            />
          </div>
        </div>
        <p className="btn-box-57spq">
          <a
            href="javascript:;"
            className="form-btn"
            onClick={this.handleClick}
          >
            下一步
          </a>
        </p>
      </div>
    )
  }
}

class Step3 extends Step {
  state = { submitted: false, isPwd: true, pwd: '' }

  componentDidMount = () => {
    const { match, history } = this.props
    const { phone } = match.params
    if (!phone || !phoneReg.test(phone)) {
      history.replace('/user/forget/1')
      return
    }
  }

  handleChange = ({ value, name, $valid: { valid } }) => {
    this.form[name] = { value, valid }
    name === 'password' && this.setState({ pwd: value })
  }

  handle = async () => {
    if (!this.formValid) return
    this.modifyPwd()
  }

  modifyPwd = async () => {
    const { pwd } = this.state
    const { match, history } = this.props
    // const { data } = await modifyPwd({ pwd, phone: match.params.phone })
    const data = {}
    if (data) {
      Toast.success('修改成功', 2)
      await delay(1000)
      history.replace('/user/login')
      return
    }
    Toast.info('修改失败，请稍后再试', 1.5)
  }

  render() {
    const { submitted, isPwd, pwd } = this.state
    return (
      <div className="step3">
        <div className="step-item-57spq">
          <p className="form-item">
            <label htmlFor="">
              {'设置密码'.split('').map(v => <i key={v}>{v}</i>)}
            </label>
            <UInput
              name="password"
              onInputChange={this.handleChange}
              shake={submitted}
              type={isPwd ? 'password' : 'text'}
              reg="password"
              placeholder="6-20位字母、数字"
              required
            />
          </p>
          <a
            href="javascript:;"
            className="show-pwd"
            onClick={() => {
              this.setState(({ isPwd }) => {
                return { isPwd: !isPwd }
              })
            }}
          >
            <img
              src={require('@/assets/show-password.png')}
              height="100%"
              alt=""
            />
          </a>
        </div>
        <div className="step-item-57spq">
          <p className="form-item">
            <label htmlFor="">
              {'确认密码'.split('').map(v => <i key={v}>{v}</i>)}
            </label>
            <UInput
              name="confirm"
              onInputChange={this.handleChange}
              shake={submitted}
              type="password"
              reg="password"
              placeholder="重新输入"
              confirm={pwd}
              required
            />
          </p>
        </div>
        <p className="btn-box-57spq">
          <a
            href="javascript:;"
            className="form-btn"
            onClick={this.handleClick}
          >
            确定
          </a>
        </p>
      </div>
    )
  }
}

@connect()
export default class ForgetPage extends PureComponent {
  render() {
    return (
      <div className="container forget-67spq">
        <Switch>
          <Route path="/user/forget/1" component={Step1} />
          <Route path="/user/forget/2/:phone" component={Step2} />
          <Route path="/user/forget/3/:phone" component={Step3} />
          <Redirect to="/user/forget/1" />
        </Switch>
      </div>
    )
  }
}
