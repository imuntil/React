import React from 'react'
import './Header.css'
import {Link, withRouter} from 'react-router-dom'
import {Popover, Icon} from 'antd'

class Header extends React.Component {
  route2Index = {
    '/': 0,
    '/about': 1,
    '/contact': 5,
    '/join': 4,
    '/products/eco': 2,
    '/products/eco/case': 3,
    '/products/ext': 2,
    '/products/ext/case': 3,
    '/products/wd': 2,
    '/products/wd/case': 3
  }
  ele = null
  rememberStyle = null
  constructor (props) {
    super(props)
    this.state = {
      show: false,
      style: {},
      fixedStyle: {}
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
    this.handleClickRoute = this.handleClickRoute.bind(this)
    this.handleMouseEnterPopover = this.handleMouseEnterPopover.bind(this)
    this.handleMouseLeavePopover = this.handleMouseLeavePopover.bind(this)
    this.handleClickSubRoute = this.handleClickSubRoute.bind(this)
  }
  handleClick () {
    let {show} = this.state
    this.setState({
      show: !show
    })
  }
  handleMouseEnter (e) {
    const el = e.currentTarget
    const react = el.getBoundingClientRect()
    this._setStyle(react)
  }
  handleMouseLeave () {
    const {fixedStyle} = this.state
    this.setState({style: {...fixedStyle}})
  }
  handleMouseEnterPopover () {
    this.setState({
      style: {...this.rememberStyle}
    })
  }
  handleMouseLeavePopover () {
    this.handleMouseLeave()
  }
  handleClickRoute (e) {
    // const el = e.currentTarget
    // const react = el.getBoundingClientRect()
    // this._setStyle(react, true)
  }
  handleClickSubRoute () {
    this.setState({
      style: {...this.rememberStyle},
      fixedStyle: {...this.rememberStyle}
    })
  }
  _setStyle (react, fixed = false) {
    const style = {}
    for (let key in react) {
      style[key] = react[key] + 'px'
    }
    this.rememberStyle = style
    if (!fixed) {
      this.setState({style: {...style}})
    } else {
      this.setState({style: {...style}, fixedStyle: {...style}})
    }
  }
  _setEnteredLocation (index) {
    const ele = this.ele.querySelectorAll('li').item(index)
    const react = ele.getBoundingClientRect()
    this._setStyle(react, true)
  }
  _matchRoute (pathname) {
    let index = this.route2Index[pathname]
    index === undefined && (index = 2)
    if (index !== undefined) {
      return this._setEnteredLocation(index)
    }
    const reg = /eco|ext|wd/
    return this._setEnteredLocation(pathname.match(reg)[0])
  }
  _generatePopover (path = '') {
    return (
      <div className="sub-route"
           onMouseEnter={this.handleMouseEnterPopover}
           onClick={this.handleClickSubRoute}
           onMouseLeave={this.handleMouseLeavePopover}>
        <p><Link to={`/products/ext${path}`}>铝合金门窗 <em>❯</em></Link></p>
        <p><Link to={`/products/eco${path}`}>伊康家 <em>❯</em></Link></p>
        <p><Link to={`/products/ext${path}`}>庭院产品 <em>❯</em></Link></p>
      </div>
    )
  }
  componentWillMount () {
    // const {pathname} = this.props.location
  }
  // shouldComponentUpdate () {
  //   console.log('shouldComponentUpdate');
  //   return true
  // }
  // componentWillUpdate () {
  //   console.log('componentWillUpdate');
  // }
  componentWillReceiveProps (nextProps) {
    const {pathname} = this.props.location
    const {pathname: next} = nextProps.location
    if (next !== pathname) {
      this._matchRoute(next)
    }
  }
  componentDidMount () {
    const {pathname} = this.props.location
    this._matchRoute(pathname)
  }
  render () {
    const ul = (
      <ul>
        <li className="nav">
          <a href="javascript:void(0);"><span>首页</span></a>
        </li>
        <li className="nav">
          <a href="javascript:void(0);"><span>关于我们</span></a>
        </li>
        <li className="nav">
          <a href="javascript:void(0);"><span>产品展示</span></a>
        </li>
        <li className="nav">
          <a href="javascript:void(0);"><span>案例展示</span></a>
        </li>
        <li className="nav">
          <a href="javascript:void(0);"><span>合作加盟</span></a>
        </li>
        <li className="nav">
          <a href="javascript:void(0);"><span>联系我们</span></a>
        </li>
      </ul>
    )
    const {show, style} = this.state
    return (
      <header className="j-header">
        <div className="nav-container">
          <div className="nav-box">
            <Link to="/" className="logo">
              <img width="100" src={require('../assets/logo.png')} alt=""/>
            </Link>
            <div className="nav-bar">
              <div className="ani-box" style={style} />
              <ul ref={ele => this.ele = ele}>
                <li className="nav" onMouseEnter={this.handleMouseEnter}
                    onClick={this.handleClickRoute}
                    onMouseLeave={this.handleMouseLeave}>
                  <Link to="/"><span>首页</span></Link>
                </li>
                <li className="nav" onMouseEnter={this.handleMouseEnter}
                    onClick={this.handleClickRoute}
                    onMouseLeave={this.handleMouseLeave}>
                  <Link to="/about"><span>关于我们</span></Link>
                </li>
                <li className="nav" onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleMouseLeave}>
                  <Popover placement="bottom" content={this._generatePopover()} trigger="hover">
                    <a href="javascript:void(0);"><span>产品展示</span></a>
                  </Popover>
                </li>
                <li className="nav" onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleMouseLeave}>
                  <Popover placement="bottom" content={this._generatePopover('/case')} trigger="hover">
                    <a href="javascript:void(0);"><span>案例展示</span></a>
                  </Popover>
                </li>
                <li className="nav" onMouseEnter={this.handleMouseEnter}
                    onClick={this.handleClickRoute}
                    onMouseLeave={this.handleMouseLeave}>
                  <a href="javascript:void(0);"><span>合作加盟</span></a>
                </li>
                <li className="nav" onMouseEnter={this.handleMouseEnter}
                    onClick={this.handleClickRoute}
                    onMouseLeave={this.handleMouseLeave}>
                  <Link to="/contact"><span>联系我们</span></Link>
                </li>
              </ul>
            </div>
            <button className="nav-btn m-nav" onClick={this.handleClick}>
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
        {
          show
            ? <div className="m-nav-container m-nav">{ul}</div>
            : null
        }
      </header>
    )
  }
}
export default Header
// export default withRouter(Header)