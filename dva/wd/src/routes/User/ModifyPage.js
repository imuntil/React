import React from 'react';
import { connect } from 'dva';
import { WhiteSpace, WingBlank } from 'antd-mobile'
import ZInput from '../../components/Form/ZInput.js'
import { regexp, formatPhone } from '../../services/ct'
import MissData from '../../components/Error/MissData.js'
import routeLoading from '../../components/HighComponent/routeLoading'
import styles from './ModifyPage.css';

class ModifyPage extends React.Component {
  state = {
    oldPw: { v: '', valid: false },
    newPw: { v: '', valid: false },
    newPw2: { v: '', valid: false },
    submit: false
  }
  setSubmit = () => {
    this.setState({ submit: true })
    setTimeout(() => {
      this.setState({ submit: false })
    }, 600)
  }
  handleSubmit = () => {
    const { oldPw, newPw, newPw2, submit } = this.state
    if (submit) return false
    this.setSubmit()
    if (oldPw.valid && newPw.valid && newPw.v === newPw2.v) {
      console.log('save');
    }
  }
  handleInputChange = (status, v, msg) => {
    const { error } = msg
    this.setState({
      [status]: {
        v: error ? '' : v,
        valid: !error
      }
    })
  }
  render() {
    const { oldPw, newPw, newPw2, submit } = this.state
    const { user, history } = this.props
    return (
      user.phone
        ? (
          <div className={styles.normal}>
            <WhiteSpace size="lg" />
            <div className={styles.modify_box}>
              <p className={styles.group}>
                <label htmlFor="phone">手机号</label>
                <em>{formatPhone(user.phone)}</em>
              </p>
              <p className={styles.group}>
                <label htmlFor="oldPw">登录密码</label>
                <ZInput
                  shake={submit && !oldPw.valid}
                  name={'登录密码'} required
                  type={'password'} minL={6} maxL={20}
                  onZInputChange={this.handleInputChange.bind(this, 'oldPw')}
                  reg={regexp.password.str} placeholder={'当前登录密码'}
                />
              </p>
              <p className={styles.separator}>
                请重新设置登录密码
              </p>
              <p className={styles.group}>
                <label htmlFor="newPw">设置新密码</label>
                <ZInput
                  shake={submit && !newPw.valid}
                  name={'新密码'} required
                  type={'password'} minL={6} maxL={20}
                  onZInputChange={this.handleInputChange.bind(this, 'newPw')}
                  reg={regexp.password.str} placeholder={'6-20位字母、数字组合'}
                />
              </p>
              <p className={styles.group}>
                <label htmlFor="newPw2">确认新密码</label>
                <ZInput
                  shake={submit && newPw2.v !== newPw.v}
                  required name="确认密码"
                  type={'password'} placeholder={'再次填写密码'}
                  onZInputChange={this.handleInputChange.bind(this, 'newPw2')}
                />
              </p>
            </div>
            <WhiteSpace />
            <WingBlank>
              <a
                onClick={this.handleSubmit}
                href="javascript:;" className="common-btn"
              >保存</a>
            </WingBlank>
          </div>
        )
        : <MissData redirect={() => { history.replace('/user/login') }} />
    );
  }
}

function mapStateToProps(state) {
  const user = state['user-info']
  return { user };
}

export default connect(mapStateToProps)(routeLoading(ModifyPage));
