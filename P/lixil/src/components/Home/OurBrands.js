import React from 'react'
import HomeSection from './HomeSection'
import {Col, Row} from 'antd'
import './OurBrands.css'

function OurBrands() {
  const title = <img src={require('../../assets/product/ourBrands.png')} alt=""/>
  const body = (
    <div className="brands-section">
      <Row>
        <Col xs={12}>
          <p className="placeholder" />
        </Col>
      </Row>
      <Row>
        <div className="brand-box">
          <Col xs={12} sm={6} className={'auto-img'}>
            <img src={require('../../assets/icon/icon_1.png')} alt=""/>
          </Col>
          <Col xs={12} sm={6} className={'auto-img'}>
            <img src={require('../../assets/icon/icon_2.png')} alt=""/>
          </Col>
          <Col xs={12} sm={6} className={'auto-img'}>
            <img src={require('../../assets/icon/icon_3.png')} alt=""/>
          </Col>
          <Col xs={12} sm={6} className={'auto-img'}>
            <img src={require('../../assets/icon/icon_4.png')} alt=""/>
          </Col>
        </div>
      </Row>
    </div>
  )
  return (
    <HomeSection body={body} border={true} title={title} />
  )
}

export default OurBrands