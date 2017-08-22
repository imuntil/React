import React from 'react'
import {Breadcrumb, Col, Row, Spin} from 'antd'
import {Link} from 'react-router-dom'
import {getProductDetail} from '../reducers/products'
import {fetchProDetail, clearProDetail} from '../actions'
import {URL} from '../service'
import {connect} from 'react-redux'
import './Detail.css'
const Item = Breadcrumb.Item

class Detail extends React.Component {
  constructor (props) {
    super(props)
  }
  componentWillMount () {
    const {fetchProDetail, match, detail, clearOldPro} = this.props
    const {id} = match.params
    if (!detail || detail.id !== +id) {
      clearOldPro()
      fetchProDetail(id)
    }
  }
  render () {
    const routes = {
      'eco': '伊康家',
      'ext': '庭院户外',
      'wd': '铝合金门窗'
    }
    const {match, detail} = this.props
    const name = match.params.type
    return (
      <div className="detail-page">
        <Spin spinning={!detail.id}>
          {
            detail.id
              ? <div className="detail-box">
                  <div className="breadcrumb-box common-section">
                    <Breadcrumb className="detail-breadcrumb">
                      <Item><Link to={'/'}>Home</Link></Item>
                      <Item><Link to={`/products/${name}/pros`}>{routes[name]}</Link></Item>
                      <Item>{detail.title}</Item>
                    </Breadcrumb>
                  </div>
                  <div className="common-section">
                    <Row>
                      <Col sm={12} xs={24} className="auto-img left-box">
                        <img src={URL + '/' + detail.topimage}  className="placeholder" alt=""/>
                        <div className="box">
                          <p className="product-category">
                            {detail.series} <br/>
                            <span>{detail.title}</span>
                          </p>
                          <div className="down-box">
                            <p className="product-desc">
                              {detail.textContent}
                            </p>
                            <p className="btns-group">
                              <a href="javascript:;">
                                <img src={require('../assets/icon/download-pdf.png')} alt=""/>
                                <span>PDF下载</span>
                              </a>
                              <a href="javascript:;">
                                <img src={require('../assets/icon/t-mall-basket.png')} alt=""/>
                                <span>骊住天猫旗舰店</span>
                              </a>
                            </p>
                          </div>
                        </div>
                      </Col>
                      <Col xs={24} sm={12} className={'auto-img'}>
                        <img src={URL + '/' + detail.topimage} alt=""/>
                      </Col>\
                      <Col className="rich-img" xs={24} dangerouslySetInnerHTML={{__html: detail.centerimage}}/>
                      <Col className="rich-img-full" xs={24} dangerouslySetInnerHTML={{__html: detail.content}}/>
                      {/*<div className="rich-img"*/}
                           {/*dangerouslySetInnerHTML={{__html: detail.centerimage}} />*/}
                      {/*<div className="rich-img-full"*/}
                           {/*dangerouslySetInnerHTML={{__html: detail.content}} />*/}
                    </Row>
                  </div>
                </div>
              : <div className="null" />
          }
        </Spin>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    detail: getProductDetail(state)
  }
}
function mapDispatchToProps(dispatch) {
  return {
    fetchProDetail: id => dispatch(fetchProDetail(id)),
    clearOldPro: () => dispatch(clearProDetail())
  }
}
Detail = connect(mapStateToProps, mapDispatchToProps)(Detail)
export default Detail