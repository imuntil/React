import React from 'react'
import { connect } from 'dva'
import styles from './Register.css'

class Register extends React.Component {
  render() {
    return (
      <div className={styles.normal}>
        <div className={styles.reg_box}>
          <p className={styles.group}>
            <label htmlFor="phone">手机号:</label>
            <input type="tel" />
          </p>
          <div className={styles.group2}>
            <p>
              <label htmlFor="code">验证码:</label>
              <input type="number" />
            </p>
            <a href="javascript:;">发送验证码</a>
          </div>
          <a href="Javascript:;" className="common-btn">下一步</a>
          <a href="javascript:;">用户登录</a>
        </div>
      </div>
    )
  }
}

function mapStateToProps() {
  return {}
}

export default connect(mapStateToProps)(Register)
