import React from 'react'
import { connect } from 'dva'
import QueueAnim from 'rc-queue-anim'
import TopBanner from '@/components/TopBanner'
import Item from '@/components/Item'
import './ActIndex.scss'

const ActIndex = ({ history }) => {
  return (
    <section className="container act-index-k28hn">
      <div className="main-body flex">
        <TopBanner title="活动信息">
          <img src={require('../../../assets/tr/app-title.jpg')} alt="" />
        </TopBanner>
        <QueueAnim
          className="content-area"
          type={['right', 'left']}
          ease={['easeInQuart', 'easeInOutQuart']}
        >
          <Item key={0}>
            <img
              width="100%"
              src={require('../../../assets/tr/ac-item-1.jpg')}
              alt=""
            />
            <div className="max">场地地图</div>
          </Item>
          <Item key={1} reverse>
            <img
              width="100%"
              src={require('../../../assets/tr/ac-item-2.jpg')}
              alt=""
            />
            <div className="max">班车表</div>
          </Item>
          <Item
            key={2}
            handleClick={() => {
              history.push('/tr/act/notice')
            }}
          >
            <img
              width="100%"
              src={require('../../../assets/tr/ac-item-3.jpg')}
              alt=""
            />
            <div className="max">
              活动现场<br />注意事项
            </div>
          </Item>
        </QueueAnim>
      </div>
    </section>
  )
}

export default connect()(ActIndex)
