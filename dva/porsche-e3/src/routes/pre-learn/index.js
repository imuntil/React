import React from 'react'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import QueueAnim from 'rc-queue-anim'
import TopBanner from '@/components/TopBanner'
import BottomBar from '@/components/BottomBar'
import Item from '@/components/Item'
import alert from '@/components/Modal'
import './Index.scss'

const PreLearn = () => {
  return (
    <section className="container pre-learn">
      <div className="main-body">
        <TopBanner title={'课前学习'}>
          <img src={require('../../assets/pl-banner.jpg')} alt="" />
        </TopBanner>
        <QueueAnim
          className="wrapper"
          type={['right', 'left']}
          ease={['easeInQuart', 'easeInOutQuart']}
        >
          <Item
            key={0}
            handleClick={() => {
              alert('lala', 'xxxx', [
                {
                  text: 'ok',
                  onPress() {
                    console.log('ok')
                  }
                }
              ])
            }}
          >
            <img
              src={require('../../assets/pl-item-1.jpg')}
              alt=""
              width="100%"
            />
            <div className="max">活动一</div>
          </Item>
          <Item key={1} reverse={true}>
            <img
              src={require('../../assets/pl-item-2.jpg')}
              alt=""
              width="100%"
            />
            <div className="max">活动二</div>
          </Item>
          <Item key={2}>
            <img
              src={require('../../assets/pl-item-3.jpg')}
              alt=""
              width="100%"
            />
            <div className="max">活动三</div>
          </Item>
          <Item key={4} reverse={true}>
            <img
              src={require('../../assets/pl-item-4.jpg')}
              alt=""
              width="100%"
            />
            <div className="max">活动四</div>
          </Item>
        </QueueAnim>
      </div>
      <BottomBar mode={2} />
    </section>
  )
}

export default connect()(PreLearn)
