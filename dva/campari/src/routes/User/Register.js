import React from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'
import { Toast } from 'antd-mobile'
import ZInput from '../../components/Form/ZInput.js'
import { regexp } from '../../services/ct.js'
import { verifyPhone, getVerifyCode } from '../../services/user'
import styles from './Register.css'

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      phone: { v: '', valid: false },
      code: { v: '', valid: false },
      submit: false
    }
  }
  vp = async (phone) => {
    const { data } = await verifyPhone({ phone })
    return +data.resultcode !== 1
  }
  gvc = async (phone) => {
    const { data: { result, resultcode } } = await getVerifyCode({ phone })
    if (+resultcode === 1) {
      this.code = result
      return true
    }
    return false
  }
  handleGetCode = async () => {
    const { phone } = this.state
    if (!phone.valid) {
      Toast.info('请输入正确的手机号码', 2)
      return false
    }
    const able = await this.vp(phone.v)
    if (!able) {
      Toast.fail('该手机号已经注册', 2)
      return false
    }
    const res = await this.gvc(phone.v)
    if (!res) {
      Toast.fail('貌似哪里出问题了, 请稍后再试', 2)
      return false
    }
    return true
   }
  handleInputChange = (status, v, msg) => {
    const { error } = msg
    if (error) {
      this.setState({ [status]: { v: '', valid: false } })
    } else {
      this.setState({ [status]: { v, valid: true } })
    }
  }
  code = null
  render() {
    const { phone, code, submit } = this.state
    return (
      <div className={styles.normal}>
        <div className={styles.reg_box}>
          <p className={styles.group}>
            <label htmlFor="phone">手机号:</label>
            <ZInput
              shake={submit && !phone.valid} length={11}
              name="手机号码" required type="tel" reg={regexp.phone.str}
              onZInputChange={this.handleInputChange.bind(this, 'phone')}
            />
          </p>
          <div className={styles.group2}>
            <p>
              <label htmlFor="code">验证码:</label>
              <ZInput
                shake={submit && !code.valide} name="验证码"
                required type="tel" reg={regexp.code.str} length={6}
                onZInputChange={this.handleInputChange.bind(this, 'code')}
              />
            </p>
            <a href="javascript:;" onClick={this.handleGetCode}>发送验证码</a>
          </div>
          <a href="Javascript:;" className="common-btn" style={{ marginTop: '.8rem' }}>下一步</a>
          <p className={styles.plane_btn}>
            <Link to="/user/login">用户登录</Link>
          </p>
        </div>
      </div>
    )
  }
}

function mapStateToProps() {
  return {}
}

export default connect(mapStateToProps)(Register)
