import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { delay } from '@/utils/cts'
import { register } from '@/services'
import { Toast } from 'antd-mobile'
import SweetAlert from 'sweetalert-react'
import UInput from '@/components/Form/UInput'
import './LoginPage.scss'

function mapStateToProps(state) {
  const { reg } = state.user
  return { ...reg }
}

@connect(mapStateToProps)
export default class Register2Page extends PureComponent {
  state = { submitted: false, password: '', visible: false }
  form = { nick: {}, password: {}, pw2: {} }

  constructor(props) {
    super(props)
    const { phone, code, history } = props
    if (!phone || !code) {
      Toast.info('手机号码或者验证码有误', 1)
      setTimeout(() => {
        history.go(-1)
      }, 800)
    }
  }

  componentWillUnmount = () => {
    window.removeEventListener('popstate', this.hideSWAL)
  }

  componentDidMount = () => {
    window.addEventListener('popstate', this.hideSWAL)
  }

  /* 表单是否合法 */
  get formValid() {
    return Object.values(this.form).every(v => v.valid)
  }

  handleChange = ({ value, name, $valid: { valid } }) => {
    this.form[name] = { value, valid }
    name === 'password' && this.setState({ password: value })
  }

  handleClick = async () => {
    const { submitted } = this.state
    if (submitted) return
    this.setState({ submitted: true })
    this.register()
    await delay(1000)
    this.setState({ submitted: false })
  }

  /* 注册，将信息提交server */
  register = async () => {
    if (!this.formValid) return
    const { nick, password } = this.form
    const { phone, dispatch } = this.props
    const { data, fail, err } = await register({
      nick: nick.value,
      password: password.value,
      phone: phone || '17444444444'
    })
    if (fail || err) {
      Toast.info((fail && fail.msg) || '出错了，请稍后再试', 1.5)
      return
    }
    dispatch({ type: 'user/setUser', payload: data.user })
    // 注册成功
    this.setState({ visible: true })
  }

  /* 隐藏swal */
  hideSWAL = path => {
    this.setState({ visible: false })
    typeof path === 'string' && this.props.history.replace(path)
  }

  render() {
    const { submitted, password, visible } = this.state
    return (
      <div className="container login-82laj reg-28dfh">
        <div className="box-82laj">
          <p className="form-item">
            <label htmlFor="">
              <i>昵</i>
              <i>称</i>
            </label>
            <UInput
              name="nick"
              onInputChange={this.handleChange}
              type="text"
              minL={2}
              maxL={20}
              shake={submitted}
              required
            />
          </p>
          <p className="form-item">
            <label htmlFor="">
              <i>登</i>
              <i>录</i>
              <i>密</i>
              <i>码</i>
            </label>
            <UInput
              name="password"
              onInputChange={this.handleChange}
              shake={submitted}
              type="password"
              reg="password"
              required
            />
          </p>
          <p className="form-item">
            <label htmlFor="">
              <i>确</i>
              <i>认</i>
              <i>密</i>
              <i>码</i>
            </label>
            <UInput
              name="pw2"
              onInputChange={this.handleChange}
              type="password"
              reg="password"
              shake={submitted}
              confirm={password}
              required
            />
          </p>
          <a
            href="javascript:;"
            className="form-btn"
            onClick={this.handleClick}
          >
            完成
          </a>
        </div>
        <SweetAlert
          title={``}
          show={visible}
          text="注册完成"
          showCancelButton={true}
          cancelButtonText="去 '我的'"
          confirmButtonText="去购物"
          confirmButtonColor="#e41035"
          onConfirm={() => this.hideSWAL('/cart')}
          onCancel={() => this.hideSWAL('/user/')}
          type="success"
        />
      </div>
    )
  }
}
