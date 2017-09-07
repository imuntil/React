import React from 'react';
import { connect } from 'dva';
import styles from './LoginPage.css';

class LoginPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      phone: '',
      password: ''
    }
  }
  handleInputChange = (status, e) => {
    const v = e.target.value.trim()
    this.setState({
      [status]: v
    })
  }
  render() {
    const { phone, password } = this.state
    return (
      <div className={styles.normal}>
        <div className={styles.login_box}>
          <p className={styles.group}>
            <label htmlFor="phone">手机号:</label>
            <input type="tel" value={phone} onChange={this.handleInputChange.bind(this, 'phone')} />
          </p>
          <p className={styles.group}>
            <label htmlFor="密码">密&nbsp;码:</label>
            <input type="password" value={password} onChange={this.handleInputChange.bind(this, 'password')} />
          </p>
          <a href="javascript:;" className="common-btn" style={{ marginTop: '.6rem' }}>登录</a>
          <p className={styles.btns}>
            <a href="javascript:;">用户注册</a>
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

export default connect(mapStateToProps)(LoginPage);
