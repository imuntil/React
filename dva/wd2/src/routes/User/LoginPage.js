import React from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'
import { Toast } from 'antd-mobile'
import UInput from '@/components/Form/UInput'
import InputItem from '@/components/Form/InputItem'
import Form from '@/components/Common/Form'
import './LoginPage.scss'

@connect()
class LoginPage extends Form {
  handle = () => {
    if (!this.formValid) return
    const { dispatch, history, location } = this.props
    const { phone, password } = this.form
    dispatch({
      type: 'user/login',
      payload: { phone: phone.value, password: password.value }
    }).then(v => {
      if (v === true) {
        Toast.success('登录成功', 1.5)
        history.replace((location.state && location.state.from) || '/user')
        return
      }
      Toast.info(v.msg || '出错了-。-、请稍后再试', 1.5)
    })
  }
  render() {
    const { submitted } = this.state
    return (
      <div className="container login-82laj">
        <div className="box-82laj">
          <InputItem label="手机号" useWrap={false} customClass="lp-item">
            <UInput
              name="phone"
              onInputChange={this.handleChange}
              type="tel"
              reg="phone"
              shake={submitted}
              required
            />
          </InputItem>
          <InputItem label="密码" useWrap={false} customClass="lp-item">
            <UInput
              name="password"
              onInputChange={this.handleChange}
              type="password"
              reg="password"
              shake={submitted}
              required
            />
          </InputItem>
          <a
            href="javascript:;"
            className="form-btn"
            onClick={this.handleClick}
          >
            登录
          </a>
          <div className="btn-group-82laj">
            <Link to="/user/reg1">用户注册</Link>
            <Link to="/user/forget/1">忘记密码</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginPage
