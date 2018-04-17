import React, { PureComponent } from 'react'
import { connect } from 'dva'
import './OrderPage.scss'

const Adr = ({ adr }) => {
  return (
    <section className="adr-box-sl92k">
      <div className="content">
        <p>收货人</p>
        <p>
          <span>姓&nbsp;&nbsp;名:&nbsp;lalal</span>{' '}
          <span>手机号:&nbsp;13984758478</span>
        </p>
        <p>
          <span>地&nbsp;&nbsp;址:&nbsp;ldldldldldlddldl</span>
        </p>
        <p>
          <a href="javascript:;">编辑></a>
        </p>
      </div>
    </section>
  )
}

const List = () => {
  return (
    <section className="order-box-sl92k">
      <p>商品信息</p>
      <div className="main-sl92k">x</div>
      <p>
        <span>配送方式</span>
        <i>快递</i>
      </p>
      <p>
        <span>运费</span>
        <i>￥100.00</i>
      </p>
      <p className="strong">
        <span>需要支付</span>
        <span className="color--red">￥100.00</span>
      </p>
    </section>
  )
}

@connect()
export default class OrderPage extends PureComponent {
  render() {
    return (
      <div className="container order-sl92k">
        <div className="content-sl92k">
          <Adr />
          <List />
        </div>
        <div className="bottom-bar-sl92k">
          <a href="javascript:;" className="form-btn">
            提交订单
          </a>
        </div>
      </div>
    )
  }
}
