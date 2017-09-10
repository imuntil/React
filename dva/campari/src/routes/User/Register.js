import React from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'
import ZInput from '../../components/Form/ZInput.js'
import { regexp } from '../../services/ct.js'
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
  handleInputChange = (status, v, msg) => {
    const { error } = msg
    if (error) {
      this.setState({ [status]: { v: '', valid: false } })
    } else {
      this.setState({ [status]: { v, valid: true } })
    }
  }
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
            <a href="javascript:;">发送验证码</a>
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
