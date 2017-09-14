import React from 'react'
import { connect } from 'dva'
import { WingBlank, WhiteSpace } from 'antd-mobile'
import ZInput from '../../components/Form/ZInput.js'
import someForm  from '../../components/HighComponent/someForm'
import styles from './ModifyNick.css'

function ModifyNick({ handleSubmit, handleInputChange, nick, submit }) {
  return (
    <div className={styles.normal}>
      <WhiteSpace size="lg" />
      <p className={styles.group}>
        <label htmlFor="nick">昵称</label>
        <ZInput
          name='昵称' shake={submit && !nick.valid} required
          onZInputChange={(v, msg) => { handleInputChange('nick', v, msg) }}
          type={'text'} maxL={20} minL={2} value={user.name}
        />
        <a href="javascript:;" className={styles.clear}>
          <img src={require('../../assets/ig-dir/clear-1.png')} alt=""/>
        </a>
      </p>
      <WhiteSpace size="lg" />
      <WingBlank>
        <a
          onClick={handleSubmit}
          href="javascript:;" className="common-btn"
        >保存</a>
      </WingBlank>
    </div>
  )
}
const state = {
  nick: { v: '', valid: false }
}
const initState = (state, user) => {

}
const onSubmit = () => { console.log('submit') }

ModifyNick = someForm(state, ModifyNick, onSubmit)

function mapStateToProps(state) {
  const user = state['user-info']
  return { user }
}

export default connect(mapStateToProps)(ModifyNick)
