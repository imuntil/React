import React, { Component } from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'
import QueueAnim from 'rc-queue-anim'
import './CouponPage.scss'
// import { currency } from '../../utils/cts'

const Tab = ({ onTabClick, status }) => {
  return (
    <div className="tab-108je">
      <p className={status ? '' : 'active'}>
        <a href="javascript:;" onClick={() => onTabClick(0)}>
          未使用
        </a>
      </p>
      <p className={status ? 'active' : ''}>
        <a href="javascript:;" onClick={() => onTabClick(1)}>
          使用记录
        </a>
      </p>
    </div>
  )
}

const Coupon = ({ onCheck, cp = {}, checked }) => {
  const { cpiEnd, cpiStart, scene, couponInfo = {} } = cp
  const { cpiCategory, cpiFaceVal, cpiName } = couponInfo
  const end = new Date(cpiEnd)
  const rest = (end - new Date()) / 1000 / 60 / 60
  return (
    <section className="coupon-109je" onClick={onCheck}>
      <div className="box">
        ￥{cpiFaceVal}
        <i>满{cpiFaceVal}元可用</i>
      </div>
      <div className="info-109je">
        <p>
          <i className="tag">{cpiCategory}</i>
          {cpiName}
        </p>
        <p className="date">
          {cpiStart} 至 {cpiEnd}
        </p>
        <p>
          <span>
            获得方式: <i className="tag">{scene}</i>
          </span>
          <Link to="/pro">立即使用</Link>
        </p>
      </div>
      {rest < 24 * 2 ? <i className="iconfont">&#xe602;</i> : null}
      {checked ? <i className="iconfont checked">&#xe672;</i> : null}
    </section>
  )
}

const mapStateToProps = state => {
  const { list } = state.coupon
  return { cps: list }
}
@connect(mapStateToProps)
export default class CouponPage extends Component {
  state = { status: 0 }

  render() {
    const { status } = this.state
    const { cps } = this.props
    return (
      <div className="container coupon-page-109je">
        <Tab
          status={status}
          onTabClick={status =>
            this.setState({
              status
            })
          }
        />
        <div className="content-109je">
          <QueueAnim>
            {cps.map(v => <Coupon key={v.conpId} cp={v} />)}
          </QueueAnim>
        </div>
      </div>
    )
  }
}
