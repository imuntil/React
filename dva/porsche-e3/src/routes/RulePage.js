import React from 'react'
import { connect } from 'dva'
import QueueAnim from 'rc-queue-anim'
import TopBanner from '../components/TopBanner'
import BottomBar from '../components/BottomBar'
import './RulePage.scss'

const Honor = () => {
  console.log('function')
  return (
    <QueueAnim className="rule-box" type={['right', 'left']} ease={['easeOutQuart', 'easeInOutQuart']}>
      <p key={1} data-index="1">
        本次课前学习共有四轮活动，每参与完成一轮活动即可获得等级、称号以及勋章提升，具体规则如下：
      </p>
      <p key={2} data-index="2">
        <span className="color--red">“等级”</span>提升规则：每参与完成一轮活动即可获得等级提升：1、2、3、4
      </p>
      <p key={3} data-index="3">
        <span className="color--red">“称号”</span>提升规则：每参与完成一轮活动即可获得对应称号：“新手上路”、“轻车熟路”、“老司机”以及“纽北之王”
      </p>
      <p key={4} data-index="4">
        <span className="color--red">“勋章”</span>提升规则：每参与完成一轮活动即可获得对应勋章：“Cayenne”、“Cayenne
        S”、“Cayenne Turbo”、“齐心并驰”
      </p>
      <p key={5} data-index="5">
        等级、称号以及勋章将在所有活动结束后进行统计，并将折算在最终的测试总成绩中。
      </p>
      <p key={6} data-index="6" className="small color--red">
        *最终解释权归保时捷人才学院所有
      </p>
    </QueueAnim>
  )
}

const Activity = () => {
  return (
    <QueueAnim className="rule-box" type={['right', 'left']} ease={['easeOutQuart', 'easeInOutQuart']}>
      <p key={1} data-index="1">
        本次课前学习共有四轮活动，每周随机分配，活动主题分别为：文字选择题、图形选择题、分享照片以及寄语活动。具体活动规则如下：
      </p>
      <p key={2} data-index="2">
        <span className="color--red">“文字选择题”</span> 活动规则：每周随机出现
        5 道题，全部答题正确即完成活动，并获得等级、称号以及勋章
      </p>
      <p key={3} data-index="3">
        <span className="color--red">“图形选择题”</span>活动规则：每周随机出现 5
        道题，全部答题正确即完成活动，并获得等级、称号以及勋章
      </p>
      <p key={4} data-index="4">
        <span className="color--red">“分享照片”</span>活动规则：请上传一张您与保时捷
        Cayenne 的合影，可以是您销售的第一台 Cayenne、您销售的最贵的一台
        Cayenne、您参与过的印象最深刻的 Cayenne
        活动等。成功上传即可获得等级、称号以及勋章。
      </p>
      <p key={5} data-index="5">
        <span className="color--red">“寄语”</span>活动规则：请以视频或图片形式上传一段您对于全新
        Cayenne 的寄语。视频请限制在 10 秒以内，图片上可 PS
        您最想说的一句寄语并上传。成功上传即可获得等级、称号以及勋章
      </p>
      <p key={6} data-index="6" className="small color--red">
        *所有视频或图片尽量压缩在 5M 以内
      </p>
    </QueueAnim>
  )
}

const RulePage = ({ match }) => {
  return (
    <div className="container rule-page">
      <div className="main-body">
        <TopBanner title={'活动规则'} type={true}>
          <img src={require('../assets/test-banner.jpg')} alt="" width="100%" />
        </TopBanner>
        {match.params.rule === 'honor' ? <Honor /> : <Activity />}
      </div>
      <BottomBar mode={2} />
    </div>
  )
}

export default connect()(RulePage)
