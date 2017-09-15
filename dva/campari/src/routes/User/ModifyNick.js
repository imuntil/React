import React from 'react'
import { connect } from 'dva'
import { WingBlank, WhiteSpace, Toast } from 'antd-mobile'
import MissData from '../../components/Error/MissData.js'
import { modifyNick } from '../../services/user'
import { delay } from '../../services/tools-fun'
import ZInput from '../../components/Form/ZInput.js'
import styles from './ModifyNick.css'

class ModifyNick extends React.Component {
  constructor(props) {
    super(props)
    const { user } = this.props
    this.state = this.initState(user)
  }
  setSubmit = () => {
    this.setState({ submit: true })
    setTimeout(() => {
      this.setState({ submit: false })
    }, 600)
  }
  initState = (user) => {
    return user.phone
      ? { nick: { v: user.name, valid: true }, submit: false }
      : { nick: { v: '', valid: false }, submit: false }
  }
  handleSubmit = async () => {
    const { submit, nick } = this.state
    const { user: { phone }, history, dispatch } = this.props
    if (submit) return false
    this.setSubmit()
    if (nick.valid) {
      const { data} = await modifyNick({ phone, nickname: nick.v })
      const { resultcode } = data
      if (+resultcode === 1) {
        dispatch({ type: 'user-info/saveToLocal', payload: { name: nick.v }})
        Toast.success('修改昵称成功', 2)
        await delay(1500)
        history.go(-1)
      }
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
  handleClearClick = () => {
    this.setState({
      nick: { v: false, valid: false }
    })
  }
  render() {
    const { submit, nick } = this.state
    const { user, history } = this.props
    return (
     user.phone
       ? (
         <div className={styles.normal}>
           <WhiteSpace size="lg" />
           <p className={styles.group}>
             <label htmlFor="nick">昵称</label>
             <ZInput
               name="昵称" shake={submit && !nick.valid} required
               onZInputChange={(v, msg) => { this.handleInputChange('nick', v, msg) }}
               type={'text'} maxL={20} minL={2} value={nick.v}
             />
             <a href="javascript:;" onClick={this.handleClearClick} className={styles.clear}>
               <img src={require('../../assets/ig-dir/clear-1.png')} alt="" />
             </a>
           </p>
           <WhiteSpace size="lg" />
           <WingBlank>
             <a
               onClick={this.handleSubmit}
               href="javascript:;" className="common-btn"
             >保存</a>
           </WingBlank>
         </div>
       )
       : <MissData redirect={() => { history.replace('/user/login') }} />
    )
  }
}

function mapStateToProps(state) {
  const user = state['user-info']
  return { user }
}

export default connect(mapStateToProps)(ModifyNick)
