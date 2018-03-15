import React, { Component } from 'react'
import { connect } from 'dva'
import TopBanner from '@/components/TopBanner'
import Item from '@/components/Item'
import QueueAnim from 'rc-queue-anim'
import './Index.scss'

const TrainingIndex = ({ history }) => {
  return (
    <section className="container tr-index-yd63j">
      <div className="main-body">
        <TopBanner raVisible={false}>
          <img src={require('../../assets/tr/th-title.jpg')} alt="" />
        </TopBanner>
        <QueueAnim
          className="content-area"
          type={['right', 'left']}
          ease={['easeInQuart', 'easeInOutQuart']}
        >
          <Item key={0}>
            <img
              width="100%"
              src={require('../../assets/tr/th-item-1.jpg')}
              alt=""
            />
            <div>
              <p className="big">课程安排</p>
              <p className="mini">时间表</p>
            </div>
          </Item>
          <Item
            key={1}
            reverse
            handleClick={() => {
              history.push('/tr/act')
            }}
          >
            <img
              src={require('../../assets/tr/th-item-2.jpg')}
              alt=""
              width="100%"
            />
            <div>
              <p className="big">活动信息</p>
              <p className="mini">基本信息与注意事项</p>
            </div>
          </Item>
          <Item
            key={2}
            handleClick={() => {
              history.push('/tr/models')
            }}
          >
            <img
              width="100%"
              src={require('../../assets/tr/th-item-3.jpg')}
              alt=""
            />
            <div>
              <p className="big">车型介绍</p>
              <p className="mini">
                全部 Cayenne 产品<br />主要特点
              </p>
            </div>
          </Item>
          <Item
            key={3}
            reverse
            handleClick={() => {
              history.push('/tr/cpt')
            }}
          >
            <img
              src={require('../../assets/tr/th-item-4.jpg')}
              alt=""
              width="100%"
            />
            <div>
              <p className="big">竞品对比</p>
              <p className="mini">比较竞品优势</p>
            </div>
          </Item>
          <Item key={4}>
            <img
              width="100%"
              src={require('../../assets/tr/th-item-5.jpg')}
              alt=""
            />
            <div>
              <p className="big">精彩瞬间</p>
              <p className="mini">试驾活动现场图集</p>
            </div>
          </Item>
          <Item key={5} reverse>
            <img
              src={require('../../assets/tr/th-item-6.jpg')}
              alt=""
              width="100%"
            />
            <div>
              <p className="big">试驾指南</p>
              <p className="mini">试驾指南</p>
            </div>
          </Item>
        </QueueAnim>
      </div>
    </section>
  )
}

export default connect()(TrainingIndex)
