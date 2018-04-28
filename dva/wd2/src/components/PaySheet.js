import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Radio from '@/components/Form/AdrRadio'
import { currency } from '@/utils/cts.ts'
import './PaySheet.scss'

export default class PaySheet extends PureComponent {
  static defaultProps = { money: 0, couponAble: true }

  static propTypes = {
    onClose: PropTypes.func.isRequired,
    money: PropTypes.number.isRequired,
    onPay: PropTypes.func.isRequired,
    couponAble: PropTypes.bool
  }

  state = {
    /* 支付方式 0：ali；1：wx */
    payMethod: 0
  }

  /* 点击背景关闭浮层 */
  handleBGClick = e => {
    if (e.target.className.indexOf('sheet-wrapper-w0jk3') > -1) {
      this.props.onClose()
    }
  }

  render() {
    const { onClose, money, couponAble, onPay } = this.props
    const { payMethod } = this.state
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
                <Radio
                  checked={payMethod === 0}
                  cancelAble={false}
                  onChange={() => this.setState({ payMethod: 0 })}
                  name="0"
                />
                <img src={require('@/assets/alip.jpg')} width="113" alt="" />
              </p>
              <p>
                <Radio
                  checked={payMethod !== 0}
                  cancelAble={false}
                  onChange={() => this.setState({ payMethod: 1 })}
                  name="1"
                />
                <img src={require('@/assets/wxp.jpg')} width="130" alt="" />
              </p>
            </div>
            {couponAble ? (
              <p className="code">
                <span>优惠码</span>
                <input type="text" />
                <span>优惠码</span>
              </p>
            ) : null}
            <p className="pay">
              支付<span className="color--red">{currency(money)}</span>
            </p>
            <p className="form-btn-box">
              <a
                href="javascript:;"
                onClick={() => onPay(payMethod)}
                className="form-btn"
              >
                去支付
              </a>
            </p>
          </div>
        </div>
      </div>
    )
  }
}
