import React from 'react'
import { connect } from 'dva'
import styles from './Reg2Page.css'

class Reg2Page extends React.Component {
  render() {
    return (
      <div className={styles.normal}>
        <div className={styles.reg2_box}>
          <p className={styles.group}>
            <label htmlFor="nick">昵称:</label>
            <input type="text" />
          </p>
          <p className={styles.group}>
            <label htmlFor="password">登录密码:</label>
            <input type="password" />
          </p>
          <p className={styles.group}>
            <label htmlFor="pw2">确认密码:</label>
            <input type="password" />
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
