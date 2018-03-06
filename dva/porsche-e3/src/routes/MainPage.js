import React from 'react'
import { connect } from 'dva'
import QueueAnim from 'rc-queue-anim'
import './MainPage.scss'
import E3Carousel from '../components/Carousel'
import Item from '../components/Item'
import BottomBar from '../components/BottomBar'

function Title() {
  const text = ' 全新 Cayenne — 齐心并驰'.split('')
  return (
    <div className="title-wrapper">
      <QueueAnim className="title">
        {text.map((v, i) => <span key={i}>{v}</span>)}
      </QueueAnim>
    </div>
  )
}

function MainPage({ history }) {
  return (
    <div className="container index-page">
      <div className="main-body">
        <Title />
        <p className="separator-line animated bounceInLeft"></p>
        <E3Carousel />
        <QueueAnim
          className="wrapper"
          type={['right', 'left']}
          ease={['easeOutQuart', 'easeInOutQuart']}
        >
          <Item key={0} handleClick={() => history.push('/guide')}>
            <img
              src={require('../assets/main-item-1.jpg')}
              alt=""
              width="100%"
            />
            <div>
              <p className="big">指南</p>
              <p className="small">使用指引</p>
            </div>
          </Item>
          <Item key={1} reverse={true}>
            <img
              src={require('../assets/main-item-2.jpg')}
              alt=""
              width="100%"
            />
            <div>
              <p className="big">荣誉</p>
              <p className="small">奖励规则</p>
            </div>
          </Item>
          <Item key={2}>
            <img
              src={require('../assets/main-item-3.jpg')}
              alt=""
              width="100%"
            />
            <div>
              <p className="big">活动</p>
              <p className="small">详细介绍</p>
            </div>
          </Item>
          <Item key={3} reverse={true}>
            <img
              src={require('../assets/main-item-4.jpg')}
              alt=""
              width="100%"
            />
            <div>
              <p className="big">公告</p>
              <p className="small">暂未开启</p>
            </div>
          </Item>
        </QueueAnim>
      </div>
      <BottomBar />
    </div>
  )
}

MainPage.propTypes = {}

export default connect()(MainPage)
