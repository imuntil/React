import React from 'react'
import { connect } from 'dva'
import styles from './Reg2Page.css'

class Reg2Page extends React.Component {
  render() {
    return (
      <div className={styles.normal}>
        <div className={styles.reg2_box}>
          <p className={styles.group}>
            <label htmlFor="nick">昵&nbsp;&nbsp;称:</label>
            <input type="text" placeholder="金巴厘会员" />
          </p>
          <p className={styles.group}>
            <label htmlFor="password">登录密码:</label>
            <input type="password" placeholder="6-20位字母、数字组合" />
          </p>
          <p className={styles.group}>
            <label htmlFor="pw2">确认密码:</label>
            <input type="password" placeholder="再次填写密码" />
          </p>
          <a href="javascript:;" className="common-btn">完成</a>
        </div>
      </div>
    )
  }
}

function mapStateToProps() {
  return {}
}

export default connect(mapStateToProps)(Reg2Page)
