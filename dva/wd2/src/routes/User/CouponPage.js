import React, { Component } from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'
import './CouponPage.scss'

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
const Coupon = ({ onCheck, cp }) => {
  return (
    <section className="coupon-109je" onClick={onCheck}>
      <div className="box">
        ￥100
        <i>满20元可用</i>
      </div>
      <div className="info-109je">
        <p>20元抵用券</p>
        <p className="date">1029.929.9-929.299.28</p>
        <p>
          <span>来源: 射距离可达附件是大幅减少浪费了x</span>
          <Link to="/pro">立即使用</Link>
        </p>
      </div>
      {/* <i className="iconfont">&#xe602;</i> */}
      <i className="iconfont checked">&#xe672;</i>
    </section>
  )
}

@connect()
export default class CouponPage extends Component {
  state = { status: 0 }
  render() {
    const { status } = this.state
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
          {[1, 2].map(v => <Coupon key={v} />)}
        </div>
      </div>
    )
  }
}
