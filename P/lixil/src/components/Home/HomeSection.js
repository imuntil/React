import React from 'react'
import {Col, Row} from 'antd'
import './HomeSection.css'

function HomeSection({title, body, border}) {
  return (
    <div className='common-section home-section'>
      <Row>
        <Col xs={24} className={`section-title ${border ? 'border-bottom' : ''}`}>
          {title}
        </Col>
        {body}
      </Row>
    </div>
  )
}
export default HomeSection