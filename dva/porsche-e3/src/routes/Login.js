import React, { Component } from 'react'
import { connect } from 'dva'
import styles from './Login.css'

class Login extends Component {
  handleClick = () => {
    console.log('click')
  }
  render() {
    return <section className={styles.container}>
        <div className={styles.form_box}>
          <p className={styles.logo}>
            <img src={require('../assets/logo.jpg')} width="50%" alt="" />
          </p>
          <p className={styles.c_1}>
            <input type="text" className={styles.account} placeholder="PPN账号登录" />
            <img src={require('../assets/user-icon.png')} alt="" />
          </p>
          <p className={styles.c_2}>
            <a href="javascript:;" className={styles.login} onClick={this.handleClick}>
              登录
            </a>
          </p>
        </div>
        {/* <div className={styles.loading_layer}>loading...</div> */}
      </section>
  }
}

function mapStateToProps() {
  return {}
}

export default connect(mapStateToProps)(Login)
