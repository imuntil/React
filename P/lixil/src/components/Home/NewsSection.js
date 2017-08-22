import React from 'react'
import HomeSection from './HomeSection'
import {Col, Row} from 'antd'
import PropTypes from 'prop-types'
import './NewsSection.css'
import { Link } from 'react-router-dom'

function NewsSection({news}) {
  const body = (
    <div className="news-section">
      <Row>
        <Col xs={24}>
          <div className="news-box">
            {
              news.map(item => (
                <p key={item.id}>
                  <Link to={`news/${item.id}`}>
                    <span>[{item.newsLabel}]{item.title}</span>
                    <span>{item.createTime}</span>
                  </Link>
                </p>
              ))
            }
          </div>
        </Col>
      </Row>
    </div>
  )
  const title = <img src={require('../../assets/product/hotNews.png')} alt=""/>
  return (
    <HomeSection body={body} title={title} border={true} />
  )
}
NewsSection.propTypes = {
  news: PropTypes.array.isRequired
}

export default NewsSection