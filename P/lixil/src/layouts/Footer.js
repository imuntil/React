import React from 'react'
import './Footer.css'
import { Row, Col } from 'antd'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {hashChanged, scrollEnd} from '../actions'

function Footer({history, location, changeHash, scrollEnd}) {
  function handleClick(index) {
    scrollEnd()
    changeHash(index > 3 ? 3 : index)
    if (location.pathname === '/about') return
    history.push('/about')
  }
  return (
    <footer>
      <div className="upper-section">
        <div className="common-section">
          <Row>
            <Col xs={24} sm={6}>
              <Link to={'/'} className="foot-logo">
                <img src={require('../assets/logo.png')} alt=""/>
              </Link>
            </Col>
            <Col xs={24} sm={6}>
              <ul>
                <li className="title">产品介绍</li>
                <li><Link to={'/products/ext'}>庭院产品</Link></li>
                <li><Link to={'/products/eco'}>会呼吸的健康壁材・伊康家</Link></li>
                <li>铝合金系统门窗</li>
              </ul>
            </Col>
            <Col xs={24} sm={4}>
              <ul>
                <li className="title">关于我们</li>
                {
                  ['集团简介', '企业理念', '历史沿革', '企业宣传片', '公司信息']
                    .map((title, index) => (
                      <li onClick={() => handleClick(index)} key={index}>{title}</li>
                    ))
                }
              </ul>
            </Col>
            <Col xs={24} sm={4}>
              <ul>
                <li className="title">联系我们</li>
                <li>区域经销分支</li>
                <li>客服中心</li>
                <li>天猫商城</li>
              </ul>
            </Col>
            <Col xs={24} sm={4}>
              <ul className="last">
                <li>
                  <img src={require('../assets/icon/t-mall.jpg')} alt=""/>
                </li>
                <li>
                  <img src={require('../assets/icon/weixin.jpg')} alt=""/>
                </li>
              </ul>
            </Col>
          </Row>
        </div>
      </div>
      <div className="down-section">
        <span>版权所有：骊住建材(上海)有限公司</span>  <span>沪ICP备：00000000号</span>
      </div>
    </footer>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    changeHash: index => dispatch(hashChanged(index)),
    scrollEnd: () => dispatch(scrollEnd())
  }
}
Footer = connect(null, mapDispatchToProps)(Footer)
export default Footer