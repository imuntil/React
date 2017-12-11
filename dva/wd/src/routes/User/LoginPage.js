import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router'
import { Toast } from 'antd-mobile'
import { login } from '../../services/user'
import ZInput from '../../components/Form/ZInput.js'
import { delay } from '../../services/tools-fun'
import styles from './LoginPage.css';
import routeLoading from '../../components/HighComponent/routeLoading'
import { afterLogin } from "../../services/bus";

class LoginPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      phone: { v: '', valid: false },
      password: { v: '', valid: false },
      submit: false
    }
  }
  setSubmit = () => {
    this.setState({ submit: true })
    setTimeout(() => {
      this.setState({ submit: false })
    }, 600)
  }
  handleInputChange = (status, v, msg) => {
    const { error } = msg
    if (error) {
      this.setState({ [status]: { v: '', valid: false } })
    } else {
      this.setState({ [status]: { v, valid: true } })
    }
  }
  handleLogin = async () => {
    const { phone, password, submit } = this.state
    const { history, dispatch } = this.props
    if (submit) return false
    this.setSubmit()
    if (password.valid && phone.valid) {
      const { data, err } = await login({ phone: phone.v, password: password.v })
      if (err) {
        Toast.fail('未知错误，请稍后重试', 1)
      } else {
        const { code, message, data: res } = data
        if (code !== 0) {
          Toast.fail(message, 1)
        } else {
          Toast.success('登录成功', 1)
          dispatch({
            type: 'user-info/saveToLocal',
            payload: { ...res, uid: res._id }
          })
          await delay(800)
          const { path } = afterLogin
          if (typeof path === 'number') {
            return history.go(path)
          }
          history.push('/user/')
        }
      }
    }
  }
  render() {
    const { phone, password, submit } = this.state
    return (
      <div className={styles.normal}>
        <div className={styles.login_box}>
          <p className={styles.group}>
            <label htmlFor="phone">手机号:</label>
            <ZInput
              className="xxx" shake={submit && !phone.valid}
              name="手机号码" required type="tel" length={11} reg="^(1[3|4|5|7|8])[0-9]{9}$"
              onZInputChange={this.handleInputChange.bind(this, 'phone')}
            />
          </p>
          <p className={styles.group}>
            <label htmlFor="密码">密&nbsp;码:</label>
            <ZInput
              shake={submit && !password.valid}
              name="密码" required type="password" minL={6} maxL={20} reg="^[A-z0-9_]{6,20}$"
              onZInputChange={this.handleInputChange.bind(this, 'password')}
            />
          </p>
          <a
            href="javascript:;"
            className="common-btn"
            style={{ marginTop: '.8rem' }}
            onClick={this.handleLogin}
          >
            登录
          </a>
          <p className={styles.btns}>
            <Link to="/user/register">用户注册</Link>
            <a href="javascript:;">忘记密码</a>
          </p>
        </div>
      </div>
    );
  }
}


function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(routeLoading(LoginPage));
