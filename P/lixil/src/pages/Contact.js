import React from 'react'
import {Col, Row} from 'antd'
import './Contact.css'
// import BMap from 'BMap'

class ContactPage extends React.Component {
  componentDidMount () {
    // console.log(BMap);
    this._mapInit()
  }
  _mapInit () {
    // const map = new BMap.Map('map')
    // const point = new BMap.Point(121.28308, 31.021516)
    // map.centerAndZoom(point, 16)
    // let mk = new BMap.Marker(point)
    // let label = new BMap.Label('骊住建材上海有限公司', {
    //   position: point,
    //   offset: new BMap.Size(-60, -70)
    // })
    // label.setStyle({
    //   fontSize: '12px',
    //   lineHeight: '20px',
    //   fontFamily: '微软雅黑',
    //   maxWidth: 'none',
    //   padding: '10px',
    //   border: 'none',
    //   boxShadow: 'rgba(0, 0, 0, 0.12) 0px 2px 6px, rgba(0, 0, 0, 0.24) 0px 1px 2px'
    // })
    // map.addOverlay(mk)
    // map.addOverlay(label)
    // map.enableScrollWheelZoom(true)
  }
  render () {
    return (
      <div className="contact-page">
        <img className="banner-img" src={require('../assets/carousel/contact-banner.jpg')} alt=""/>
        <div className="common-section">
          <p className="title">
            <span className="first">联系我们</span>
          </p>
          <Row>
            <Col xs={24} sm={12}>
              <div id="map"></div>
            </Col>
            <Col xs={24} sm={12} className={'contact-methods'}>
              <p>骊住建材（上海）有限公司 </p>
              <p>上海市松江区华加路99号华滨工业园14号楼</p>
              <p>电话：021-67747198</p>
              <p>传真：021-67740665</p>
              <p>网址：htpp://www.lixilhousing.cn</p>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}
export default ContactPage