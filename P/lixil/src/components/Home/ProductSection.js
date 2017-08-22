import React from 'react'
import {Col, Row} from 'antd'
import HomeSection from './HomeSection'
import './ProductSection.css'

function ProductSection() {
  const title = <img src={require('../../assets/product/product.png')} alt=""/>
  const body = (
    <div className="product-section">
      <Row>
        <Col xs={24} sm={10} className="infos">
          <p className="titles">SASH <br/>铝合金系统门窗</p>
          <p>骊住高性能门窗为您提供<br/>系统化、高品质、人性化<br/>高端门窗</p>
          <p>
            <a href="##">查看详情 > </a>
          </p>
        </Col>
        <Col xs={24} sm={14} className="auto-img">
          <img src={require('../../assets/product/sash.png')} alt=""/>
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={14} className="auto-img">
          <img src={require('../../assets/product/ecocarat.png')} alt=""/>
        </Col>
        <Col xs={24} sm={10} className='infos'>
          <p className="titles">ECOCARAT <br/>
            会呼吸的健康壁材・伊康家</p>
          <p>一种具有调节室内湿度，<br/>
            吸附甲醛，祛除异味等功能的 <br/>
            新式健康型室内背景墙砖，产自誉有 <br/>
            日本六大古窑之一的「常滑」。</p>
          <p>
            <a href="##">查看详情 > </a>
          </p>
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={10} className="infos">
          <p className="titles">EXTERIOR <br/>庭园产品</p>
          <p>日本高端庭园装饰产品 <br/>
            阳光房、自动遮阳蓬、庭院门、 <br/>
            围栏、车棚、自动车库门等</p>
          <p>
            <a href="##">查看详情 > </a>
          </p>
        </Col>
        <Col xs={24} sm={14} className='auto-img'>
          <img src={require('../../assets/product/exterior.png')} alt=""/>
        </Col>
      </Row>
    </div>
)

return (
  <HomeSection title={title} body={body} />
)
}
export default ProductSection