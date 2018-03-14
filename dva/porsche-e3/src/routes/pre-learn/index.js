import React from 'react'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import QueueAnim from 'rc-queue-anim'
import TopBanner from '@/components/TopBanner'
import BottomBar from '@/components/BottomBar'
import Item from '@/components/Item'
import alert from '@/components/Modal'
import './Index.scss'

const PreLearn = ({ history }) => {
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
              alert(
                '信息',
                '活动一',
                true,
                [
                  {
                    text: '确定',
                    onPress() {
                      history.push('/pre/test/word')
                    }
                  }
                ],
                true,
                undefined,
                function() {
                  history.push('/rule/activity')
                }
              )
            }}
          >
            <img
              src={require('../../assets/pl-item-1.jpg')}
              alt=""
              width="100%"
            />
            <div className="max">活动一</div>
          </Item>
          <Item
            key={1}
            reverse={true}
            handleClick={() => {
              alert(
                '信息',
                '活动二',
                true,
                [
                  {
                    text: '确定',
                    onPress() {
                      history.push('/pre/test/pic')
                    }
                  }
                ],
                true,
                undefined,
                function () {
                  history.push('/rule/activity')
                }
              )
            }}
          >
            <img
              src={require('../../assets/pl-item-2.jpg')}
              alt=""
              width="100%"
            />
            <div className="max">活动二</div>
          </Item>
          <Item
            key={2}
            handleClick={() => {
              alert(
                '信息',
                '活动三',
                true,
                [
                  {
                    text: '确定',
                    onPress() {
                      console.log('活动三')
                    }
                  }
                ],
                true
              )
            }}
          >
            <img
              src={require('../../assets/pl-item-3.jpg')}
              alt=""
              width="100%"
            />
            <div className="max">活动三</div>
          </Item>
          <Item
            key={4}
            reverse={true}
            handleClick={() => {
              alert(
                '信息',
                '活动私',
                true,
                [
                  {
                    text: '确定',
                    onPress() {
                      console.log('活动四')
                    }
                  }
                ],
                true
              )
            }}
          >
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
