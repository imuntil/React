import React from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Carousel } from 'antd-mobile'
import TopBanner from '../components/TopBanner'
import BottomBar from '../components/BottomBar'
import './GuidePage.scss'
const GuidePage = () => {
  console.log('guide:')
  return (
    <div className="container guide-page">
      <div className="main-body">
        <TopBanner title={'指南'} type={true}>
          <img src={require('../assets/test-banner.jpg')} alt="" width="100%" />
        </TopBanner>
        <div className="carousel-box">
          <Carousel dotActiveStyle={{ backgroundColor: '#ff0000' }} infinite>
            <div className="slider">
              <img src={require('../assets/guide-1.jpg')} alt="" width="100%"/>
            </div>
            <div className="slider">
              <img src={require('../assets/guide-2.jpg')} alt="" width="100%"/>
            </div>
            <div className="slider">
              <img src={require('../assets/guide-3.jpg')} alt="" width="100%"/>
            </div>
            <div className="slider">
              <img src={require('../assets/guide-4.jpg')} alt="" width="100%"/>
            </div>
            <div className="slider">
              <img src={require('../assets/guide-5.jpg')} alt="" width="100%"/>
            </div>
            <div className="slider">
              <img src={require('../assets/guide-6.jpg')} alt="" width="100%"/>
            </div>
          </Carousel>
        </div>
      </div>
      <BottomBar mode={2} />
    </div>
  )
}

export default connect()(GuidePage)
