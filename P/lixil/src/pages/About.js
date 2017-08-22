import React from 'react'
import './About.css'
import { Col, Row } from 'antd'
import LeftNav from '../components/About/LeftNav'
import {connect} from 'react-redux'
import {getAnchorIndex, getAnchorScrollStatus} from '../reducers'
import {hashChanged, scrollEnd, scrollStart} from '../actions'
import Velocity from 'velocity-animate'
import _ from 'lodash'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class AboutPage extends React.Component {
  ln = []
  offsets = []
  body = null
  throttled = null
  scrolling = false
  constructor (props) {
    super(props)
    this.state = {
      currentIndex: -1
    }
    this.handleHashChange = this.handleHashChange.bind(this)
    this._handleScroll = this._handleScroll.bind(this)
  }
  componentDidMount () {
    this.body = document.querySelector('body')
    window.addEventListener('scroll',
      this.throttled = _.throttle(this._handleScroll, 100), false)
    _.delay(() => this._jump(this.props.index), 500)
  }
  componentWillUnmount () {
    window.removeEventListener('scroll', this.throttled, false)
    this.throttled.cancel()
    this.props.scrollEnd()
  }
  _jump (index) {
    if (this.props.scrolling) return
    this.offsets = this.ln.map(p => p.offsetTop)
    if (!this.ln.length || index < 0) return
    this.scrolling = true
    Velocity(this.body, 'scroll', {
      duration: 300,
      offset: this.offsets[index],
      complete: () => {
        _.delay(() => {
          this.scrolling = false
        }, 250)
      }
    })
  }
  _handleScroll () {
    if (this.scrolling) return
    let scrolled = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
    let current = -1
    if (!this.offsets || !this.offsets.length) return
    if (scrolled < this.offsets[0]) {
      current = -1
    } else if (scrolled < this.offsets[1]) {
      current = 0
    } else if (scrolled < this.offsets[2]) {
      current = 1
    } else if (scrolled < this.offsets[3]) {
      current = 2
    } else {
      current = 3
    }
    this.props.scrollStart()
    this.setState({
      currentIndex: current
    })
  }
  _renderLeftNav (index) {
    const {currentIndex} = this.state
    const {scrolling} = this.props
    if ((scrolling && currentIndex < 0) || (!scrolling && index < 0)) return null
    return <LeftNav index={scrolling ? currentIndex : index} onHashChange={this.handleHashChange} />
  }
  handleHashChange (index) {
    this.props.scrollEnd()
    this.props.changeHash(index)
  }
  render () {
    const {index} = this.props
    this._jump(index)
    return (
      <div className="about-page">
        <ReactCSSTransitionGroup
          transitionName={{
            enter: 'animated',
            enterActive: 'bounceInLeft',
            leave: 'animated',
            leaveActive: 'bounceOutLeft'
          }}
          transitionEnter={true}
          transitionLeave={true}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
          component="div"
        >
          {
            this._renderLeftNav(index)
          }
        </ReactCSSTransitionGroup>
        <img className="banner-img" src={require('../assets/carousel/about-banner.jpg')} alt=""/>
        <div className="common-section">
          <div className="section-tittle">
            <p className="as-title" id="anchor-1" ref={p => this.ln[0] = p}>
              <img src={require('../assets/icon/about-title-icon.jpg')} alt=""/>
              关于骊住
            </p>
          </div>
          <Row className={'box'}>
            <Col xs={24} sm={8}>
              <img src={require('../assets/about-us-company.jpg')} alt=""/>
            </Col>
            <Col xs={24} sm={16}>
              <p>
                LIXIL（骊住）是建材・建筑设备领域的全球性综合制造商。我们提供从独栋住宅・公寓到办公空间・商业设施等建筑多领域被广泛使用的多品类建材・建筑设备的设计、生产、供应及相关服务。
              </p>
              <p>
                我们始终坚持以人为中心的创新,以提高人们的生活空间质量为制造的原点。从门窗、入户玄关门、庭院系统、瓷砖等建筑外观材料，到收纳系统、室内门、地板、卫生洁具、浴室和系统橱柜 、软装布艺等室内装饰材料，以及大规模的大厦铝合金幕墙制品，LIXIL始终保持业界第一的丰富产品力及专业性的产品服务。利用全球性的销售网络以及凝聚多年来日本国内积累的专业知识与技术能力LIXIL(骊住)持续为全球用户提供设计优良，经久耐用，可信赖的高品质商品。
              </p>
              <p>
                LIXIL集团的中枢核心事业公司---株式会社LIXIL，由2011年4月整合的日本建材和住宅设备领域的5大制造品牌TOSTEM（门窗幕墙，室内建材）、INAX（伊奈瓷砖与洁具）、新日轻（门窗幕墙）、SUNWAVE（日波橱柜）、TOEX（庭院系统）组建而成。从此迈入了新的征程，并先后将American Standard （美标卫浴）、GROHE（德国高仪）、Permasteelisa Group（意大利帕马斯幕墙）、 GARTNER（德国嘉特纳幕墙）等海外国际品牌纳入旗下。
              </p>
              <p>
                目前，集团以 <span>LIXIL Water Technology水科技公司、LIXIL Housing Technology住宅科技公司、LIXIL Building Technology大厦科技公司、LIXIL Kitchen Technology橱房科技公司</span>，等4个主要事业为核心，同时以日本国内业务为主的LIXIL日本公司也在开展着其他广泛领域的事业。集团旗下还包括有大型家居中心（建材超市）、货物流通渠道、零售事业和住宅订制运营等为住宅生活相关提供综合性解决服务的事业公司。
                LIXIL集团旗下在全球的员工数约80,000人，2015年销售额1兆8.451亿日元。我们始终坚持以生活居住者的视点为商品的原点，推进创新的商品及服务。以为全世界的人们带来丰富舒适的生活创造价值为企业事业目标。
              </p>
            </Col>
          </Row>
          <div className="section-title">
            <p className="as-title" id="anchor-2" ref={p => this.ln[1] = p}>
              <img src={require('../assets/icon/about-title-icon.jpg')} alt=""/>
              企业理念
            </p>
          </div>
          <Row className={'box'}>
            <Col xs={24} sm={12}>
              <div className="enterprise-idea">
                <img src={require('../assets/about-enterprise-idea.jpg')} alt=""/>
              </div>
            </Col>
            <Col xs={24} sm={12}>
              <div className="enterprise-idea-desc">
                <p className="g-1">
                  骊住”的英文标示“LIXIL” <br/>
                  取用 <span>“居住=LIVING”</span>与 <span>“生活=LIFE”</span> <br/>
                  两词中的“LI”寓意着“美好居家生活”
                </p>
                <p className="g-2">
                  LIXIL，日本最大住居及生活环境相关的综合建材制造企业，我们的产品倡导对地球环境的节能绿色，以使用者居住者的视点将想象力，创造力，开发力，制造力融合凝聚于骊住制造。为创造更多居住人群的舒适住居生活提供优质的产品及服务。
                </p>
              </div>
            </Col>
          </Row>
          <div className="section-title">
            <p className="as-title" id="anchor-3" ref={p => this.ln[2] = p}>
              <img src={require('../assets/icon/about-title-icon.jpg')} alt=""/>
              历史沿革
            </p>
          </div>
          <Row className="box">
            <img src={require('../assets/about-history.jpg')} width='100%' alt=""/>
          </Row>
          <div className="section-title">
            <p className="as-title" id="anchor-4" ref={p => this.ln[3] = p}>
              <img src={require('../assets/icon/about-title-icon.jpg')} alt=""/>
              公司信息
            </p>
          </div>
          <Row className="box last-box">
            <Col xs={24} sm={14} className='left-box'>
              <Row>
                <Col xs={8} sm={6}><span>公司名：</span></Col>
                <Col xs={16} sm={18}><span>骊住建材（上海）有限公司</span></Col>
              </Row>
              <Row>
                <Col xs={8} sm={6}><span>公司地址：</span></Col>
                <Col xs={16} sm={18}>上海市松江区华加路99号华滨工业园14号楼</Col>
              </Row>
              <Row>
                <Col xs={8} sm={6}><span>电话：</span></Col>
                <Col xs={16} sm={18}>021-67747198</Col>
              </Row>
              <Row>
                <Col xs={8} sm={6}><span>传真：</span></Col>
                <Col xs={16} sm={18}>021-67740665</Col>
              </Row>
              <Row>
                <Col xs={8} sm={6}><span>网址：</span></Col>
                <Col xs={16} sm={18}>htpp://www.lixilhousing.cn</Col>
              </Row>
            </Col>
            <Col xs={24} sm={10}>
              <div className="about-video">
                <img src={require('../assets/about-video.jpg')} width='100%' alt=""/>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    index: getAnchorIndex(state),
    scrolling: getAnchorScrollStatus(state)
  }
}
function mapDispatchToProps(dispatch) {
  return {
    changeHash: index => dispatch(hashChanged(index)),
    scrollStart: () => dispatch(scrollStart()),
    scrollEnd: () => dispatch(scrollEnd())
  }
}
AboutPage = connect(mapStateToProps, mapDispatchToProps)(AboutPage)
export default AboutPage