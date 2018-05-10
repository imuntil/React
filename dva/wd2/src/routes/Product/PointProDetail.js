import React, {PureComponent} from 'react'
import {connect} from 'dva'
import ImgHolder from '@/components/Common/ImgHolder'
import QueueAnim from 'rc-queue-anim'
import './PointProDetail.scss'

@connect()
export default class PointProDetail extends PureComponent {
  render() {
    return (
      <div className="ppd-s09w2">
        <p className="banner">
          <ImgHolder text="Point Pro" size={750}></ImgHolder>
        </p>
        <QueueAnim className="content-s09w2">
          <div key="0" className="top">
            <span>积分产品名称</span>
            <span>
              <i className="iconfont">&#xe66b;</i>
              1200
              <i>积分</i>
            </span>
          </div>
          <p key="1" className="detail">
            详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细详细
          </p>
          <div key="2" className="bottom">
            <span>当前积分：12345</span>
            <a href="javascript:;" className="charge">积分兑换</a>
          </div>
        </QueueAnim>
      </div>
    )
  }
}