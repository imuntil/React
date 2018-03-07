import React from 'react'
import { connect } from 'dva'
import TopBanner from '../components/TopBanner'
import BottomBar from '../components/BottomBar'
import './RulePage.scss'

const RulePage = () => {
  return (
    <div className="container rule-page">
      <div className="main-body">
        <TopBanner title={'活动规则'} type={true}>
          <img src={require('../assets/test-banner.jpg')} alt="" width="100%" />
        </TopBanner>
      </div>
      <BottomBar mode={2} />
    </div>
  )
}

export default connect()(RulePage)
