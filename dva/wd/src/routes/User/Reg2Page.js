import React from 'react'
import { connect } from 'dva'
import ZInput from '../../components/Form/ZInput.js'
import { regexp } from '../../services/ct.js'
import { Toast } from 'antd-mobile'
import routeLoading from '../../components/HighComponent/routeLoading'
import { register } from '../../services/user'
import styles from './Reg2Page.css'

class Reg2Page extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nick: { v: '', valid: false },
      password: { v: '', valid: false },
      pw2: { v: '', valid: false },
      submit: false
    }
  }
  componentWillMount () {
    const { phone } = this.props
    if (!phone) {
      this.props.history.go(-1)
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
    this.setState({
      [status]: {
        v: error ? '' : v,
        valid: !error
      }
    })
  }
  handleCompleteClick = async () => {
    const { nick, password, pw2, submit } = this.state
    const { dispatch, history } = this.props
    if (submit) return false
    this.setSubmit()
    if (nick.valid && password.valid && pw2.v === password.v) {
      const { err, data } = await register({ nick: nick.v, password: password.v, phone: this.props.phone })
      if (err) {
        Toast.fail('出错了，请稍后重试', 1)
        return false
      }
      dispatch({
        type: 'user-info/save',
        payload: { ...data.data }
      })
      history.replace('/user')
    }
  }
  render() {
    const { submit, nick, password, pw2 } = this.state
    return (
      <div className={styles.normal}>
        <div className={styles.reg2_box}>
          <p className={styles.group}>
            <label htmlFor="nick">昵&nbsp;&nbsp;称:</label>
            <ZInput
              name={'昵称'} maxL={20} minL={2} required shake={submit && !nick.valid}
              onZInputChange={this.handleInputChange.bind(this, 'nick')}
              type={'text'} placeholder={'金巴厘会员'}
            />
          </p>
          <p className={styles.group}>
            <label htmlFor="password">登录密码:</label>
            <ZInput
              name={'登录密码'} onZInputChange={this.handleInputChange.bind(this, 'password')}
              minL={6} maxL={20} required shake={submit && !password.valid}
              reg={regexp.password.str} type={'password'} placeholder={'6-20位字母、数字'}
            />
          </p>
          <p className={styles.group}>
            <label htmlFor="pw2">确认密码:</label>
            <ZInput
              shake={submit && password.v !== pw2.v}
              name={'确认密码'} onZInputChange={this.handleInputChange.bind(this, 'pw2')}
              required placeholder={'再次填写密码'} type={'password'}
            />
          </p>
          <a href="javascript:;" onClick={this.handleCompleteClick} className="common-btn">完成</a>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const phone = state['user-info'].phone
  return { phone }
}

export default connect(mapStateToProps)(routeLoading(Reg2Page))
