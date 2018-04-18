import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'
import { WhiteSpace } from 'antd-mobile'
import QueueAnim from 'rc-queue-anim'
import NumBtns from '@/components/NumBtns'
import PaySheet from '@/components/PaySheet'
import { currency } from '@/utils/cts'
import './OrderPage.scss'

const Adr = ({ adr = {} }) => {
  return (
    <section className="adr-box-sl92k">
      <div className="content">
        <p>收货人</p>
        <p>
          <span>姓&nbsp;&nbsp;名:&nbsp;{adr.name}</span>
          <span>手机号:&nbsp;{adr.phone}</span>
        </p>
        <p>
          <span>
            地&nbsp;&nbsp;址:&nbsp;{adr.city}
            {adr.address}
          </span>
        </p>
        <p>
          <Link to={`/adr${adr.id ? `?id=${adr.id}` : ''}`}>编辑></Link>
        </p>
      </div>
    </section>
  )
}

const Cell = ({ editAble }) => {
  return (
    <div className="cell-sl92k">
      <div>
        <div className="img">
          <img
            src={require('@/assets/home-sellings-4.jpg')}
            width="100%"
            alt=""
          />
        </div>
        <div className="right">
          <div className="top-sec-sl92k">
            <div className="info">
              <p>SKYY Wild Turkey Real Kentucky Straight Bourbon Whiskey</p>
              <p>蓝天阿玛尼</p>
              <p>
                <span className="color--red">{currency(100)}</span>
                <span>1000 ml</span>
              </p>
            </div>
            <div className="total">{currency(222)}</div>
          </div>
          <NumBtns className="num-btns" />
        </div>
      </div>
    </div>
  )
}

const List = () => {
  return (
    <section className="order-box-sl92k">
      <p>商品信息</p>
      <div className="main-sl92k">
        <Cell />
      </div>
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

const mapStateToProps = state => {
  const { adr, user, product } = state
  const { defaultID, dic, selectedID } = adr
  return {
    adr: (selectedID ? dic[selectedID] : dic[defaultID]) || false,
    user,
    product
  }
}
@connect(mapStateToProps)
export default class OrderPage extends PureComponent {
  state = { psVisible: false }

  handleClick = () => {
    this.setState({ psVisible: true })
  }
  render() {
    const { adr } = this.props
    const { psVisible } = this.state
    return (
      <div className={`container order-sl92k`}>
        <div className="content-sl92k">
          <Adr adr={adr || {}} />
          <List />
          <p style={{ height: 100 }} />
        </div>
        <div className="bottom-bar-sl92k">
          <a
            href="javascript:;"
            onClick={this.handleClick}
            className="form-btn"
          >
            提交订单
          </a>
        </div>
        <QueueAnim type="bottom">
          {psVisible ? (
            <PaySheet
              onClose={() => this.setState({ psVisible: false })}
              key="sheet"
            />
          ) : null}
        </QueueAnim>
      </div>
    )
  }
}
