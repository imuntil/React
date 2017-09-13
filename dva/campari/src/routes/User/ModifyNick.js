import React from 'react'
import { connect } from 'dva'
import { WingBlank, WhiteSpace } from 'antd-mobile'

function ModifyNick() {
  return (
    <div className="normal">
      <WhiteSpace size="lg" />
      <p className="group">
        <label htmlFor="nick">昵称</label>

      </p>
      <WhiteSpace size="lg" />
      <WingBlank>
        <a href="javascript:;" className="common-btn">保存</a>
      </WingBlank>
    </div>
  )
}

function mapStateToProps(state) {
  const { user } = state['user-info']
  return { user }
}

export default connect(mapStateToProps)(ModifyNick)
