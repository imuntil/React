import React, {PureComponent} from 'react'
import {connect} from 'dva'
import QueueAnim from 'rc-queue-anim'
import ImgHolder from '@/components/Common/ImgHolder'
import './PointProsPage.scss'

const PPC = ({onClick}) => {
  return (
    <div className="ppc-12d9f" onClick={onClick}>
      <div className="content">
        <div className="box">
          <p className="name">积分产品名</p>
          <p>产品详细产品详细产品详细产品详细产品详细产品详细产品详细产品详细产品详细产品详细产品详细产品详细</p>
          <p className="points">
            <span>1200</span>
            <i className="iconfont">&#xe66b;</i>
          </p>
        </div>
        <div className="img-box">
          <ImgHolder size={300} text='Pro' src={''}/>
        </div>
      </div>
    </div>
  )
}

@connect()
export default class PointPros extends PureComponent {
  render() {
    const list = Array(10)
      .fill('')
      .map(v => ({
        price: '0',
        en: '积分礼品',
        cn: '',
        src: '',
        id: Math.floor(Math.random() * 100 + 200)
      }))
    const {history} = this.props
    return (
      <div className="pp-12d9f">
        <h3>积分兑换
          <i className="iconfont">&#xe66b;</i>
        </h3>
        <QueueAnim className="content-12d9f">
          {list.map((v, i) => (<PPC
            key={i}
            onClick={() => {
            history.push(`/pro/point/${v.id}`)
          }}/>))}
        </QueueAnim>
      </div>
    )
  }
}