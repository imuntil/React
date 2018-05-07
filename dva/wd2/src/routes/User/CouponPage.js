import React, { Component } from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'
import QueueAnim from 'rc-queue-anim'
import './CouponPage.scss'
// import { currency } from '../../utils/cts'

const Tab = ({ onTabClick, status, nums }) => {
  return (
    <div className="tab-108je">
      <p className={status ? '' : 'active'}>
        <a href="javascript:;" onClick={() => onTabClick(0)}>
          未使用
          {nums !== undefined ? <i>{nums}</i> : null}
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

const Coupon = ({ onCheck, cp = {}, checked, viewLink }) => {
  const { cpiEnd, cpiStart, scene, couponInfo = {} } = cp
  const { cpiCategory, cpiFaceVal, cpiName } = couponInfo
  const end = new Date(cpiEnd)
  /* 即将过期？ */
  const rest = (end - new Date()) / 1000 / 60 / 60
  return (
    <section
      className="coupon-109je"
      onClick={() => {
        onCheck(cp.conpId)
      }}
    >
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
            获得方式: <i className="from">{scene}</i>
          </span>
          {viewLink ? (
            <Link onClick={e => e.stopPropagation()} to="/pro">
              立即使用
            </Link>
          ) : (
            <a href="javascript:;">立即使用</a>
          )}
        </p>
      </div>
      {rest < 24 * 2 ? <i className="iconfont">&#xe602;</i> : null}
      {checked ? <i className="iconfont checked">&#xe672;</i> : null}
    </section>
  )
}

const mapStateToProps = state => {
  return state.coupon
}
@connect(mapStateToProps)
export default class CouponPage extends Component {
  state = { status: 0 }
  get modeCheck() {
    return this.props.match.params.mode === 'check'
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    const { status } = nextState
    const { expired } = nextProps
    if (expired[status]) return false
    return true
  }

  handleTabClick = status => {
    this.props.dispatch({ type: 'coupon/fetchCoupons', status })
    this.setState({ status })
  }

  handleChoose = id => {
    if (!this.modeCheck) return
    console.log(id)
    this.props.dispatch({ type: 'order/setCoupon', coupon: id })    
  }

  render() {
    const { status } = this.state
    const { usedList, unUseList, expired } = this.props
    const cps = status ? usedList : unUseList
    console.log('render')
    return (
      <div className="container coupon-page-109je">
        <Tab
          status={status}
          onTabClick={this.handleTabClick}
          nums={unUseList.length}
        />
        <div className="content-109je">
          <QueueAnim>
            {cps.map(v => (
              <Coupon
                key={v.conpId}
                cp={v}
                onCheck={this.handleChoose}
                viewLink={!this.modeCheck}
              />
            ))}
          </QueueAnim>
          {
            !expired[status] ? <p className="no-data">╮(╯▽╰)╭，什么也没有</p> : null
          }
        </div>
      </div>
    )
  }
}
