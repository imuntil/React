import React, { PureComponent } from 'react'
import Radio from '@/components/Form/AdrRadio'
import './PaySheet.scss'

export default class PaySheet extends PureComponent {
  handleBGClick = e => {
    if (e.target.className.indexOf('sheet-wrapper-w0jk3') > -1) {
      this.props.onClose()
    }
  }

  render() {
    const { onClose } = this.props
    return (
      <div className="sheet-wrapper-w0jk3" onClick={this.handleBGClick}>
        <div className="pay-sheet-w0jk3">
          <div className="content-w0jk3">
            <p className="title">
              <i onClick={onClose} className="iconfont">
                &#xe60a;
              </i>
              <span className="pay">支付</span>
              <i />
            </p>
            <p>支付方式</p>
            <div className="pay-methods-w0jk3">
              <p>
                <Radio />
                <img src={require('@/assets/alip.jpg')} width="113" alt="" />
              </p>
              <p>
                <Radio />
                <img src={require('@/assets/wxp.jpg')} width="130" alt="" />
              </p>
            </div>
            <p className="code">
              <span>优惠码</span>
              <input type="text" />
              <span>优惠码</span>
            </p>
            <p className="pay">
              支付<span className="color--red">￥110.00</span>
            </p>
            <p className="form-btn-box">
              <a href="javascript:;" className="form-btn">
                去支付
              </a>
            </p>
          </div>
        </div>
      </div>
    )
  }
}
