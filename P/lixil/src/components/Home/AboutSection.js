import React from 'react'
import HomeSection from './HomeSection'
import {Row, Col} from 'antd'
import './AboutSection.css'

function AboutSection() {
  const title = <img src={require('../../assets/product/aboutUs.png')} alt=""/>
  const body = (
    <div className="about-section">
      <Row>
        <Col xs={24}>
          <p className='p top'>
            LIXIL（骊住）是建材・建筑设备领域的全球性综合制造商。我们提供从独栋住宅・公寓到办公空间・商业设施等建筑多领域被广泛使用的多品类建材・建筑设备的设计、生产、供应及相关服务。
          </p>
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={12}>
          <img width="95%" src={require('../../assets/product/voide.png')} alt=""/>
        </Col>
        <Col xs={24} sm={12}>
          <p className="p">
            我们始终坚持以人为中心的创新,以提高人们的生活空间质量为制造的原点。从门窗、入户玄关门、庭院系统、瓷砖等建筑外观材料，到收纳系统、室内门、地板、卫生洁具、浴室和系统橱柜 、软装布艺等室内装饰材料，以及大规模的大厦铝合金幕墙制品，LIXIL始终保持业界第一的丰富产品力及专业性的产品服务。利用全球性的销售网络以及凝聚多年来日本国内积累的专业知识与技术能力LIXIL(骊住)持续为全球用户提供设计优良，经久耐用，可信赖的高品质商品。
          </p>
        </Col>
      </Row>
    </div>
  )
  return (
    <HomeSection body={body} title={title} border={true} />
  )
}
export default AboutSection