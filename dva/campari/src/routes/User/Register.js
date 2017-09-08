import React from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'
import styles from './Register.css'

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      phone: '',
      code: ''
    }
  }
  handleInputChange = (type, e) => {
    this.setState({
      [type]: e.target.value.trim()
    })
  }
  render() {
    const { phone, code } = this.state
    return (
      <div className={styles.normal}>
        <div className={styles.reg_box}>
          <p className={styles.group}>
            <label htmlFor="phone">手机号:</label>
            <input
              type="tel" value={phone}
              onChange={this.handleInputChange.bind(this, 'phone')}
            />
          </p>
          <div className={styles.group2}>
            <p>
              <label htmlFor="code">验证码:</label>
              <input
                type="number" value={code}
                onChange={this.handleInputChange.bind(this, 'code')}
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
