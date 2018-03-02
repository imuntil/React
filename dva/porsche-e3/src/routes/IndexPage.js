import React from 'react'
import { connect } from 'dva'
import { Carousel } from 'antd'
import './IndexPage.scss'

function IndexPage() {
  return (
    <div className="container index-page">
      <Carousel autoplay="autoplay" className="lala">
        <div className="test">1</div>
        <div className="test">2</div>
        <div className="test">3</div>
        <div className="test">4</div>
        <div className="test">5</div>
      </Carousel>
    </div>
  )
}

IndexPage.propTypes = {}

export default connect()(IndexPage)
