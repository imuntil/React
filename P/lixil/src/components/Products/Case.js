import React from 'react'
import PropTypes from 'prop-types'
import Slick from 'react-slick'
import './Case.css'
import {Spin} from 'antd'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class ProductsCase extends React.Component {
  constructor () {
    super()
    this.state = {
      delay: false,
      slickShow: false
    }
  }
  componentWillMount () {
    setTimeout(() => {
      this.setState({delay: true})
    }, 250)
  }
  render () {
    const {
      base,
      cases,
      thumbs,
      hdLoading,
      onGroupChange,
      onSlickChange,
      groupIndex,
      HDImg,
      onHdLoaded
    } = this.props
    const {delay, slickShow} = this.state
    const settings = {
      infinite: false,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1
    }
    return (
      <div className="small-common-section">
        <div className="left-group">
          <ul>
            {
              cases.map((item, index) => (
                <li key={index}>
                  <a className={groupIndex === index ? 'current' : ''}
                     onClick={() => onGroupChange(index)}
                     href="javascript:;">{item}</a>
                </li>
              ))
            }
          </ul>
        </div>
        <Spin spinning={hdLoading}>
          <div className="main-view">
            <div className="show-box">
              <img width='100%' src={base + HDImg} onLoad={onHdLoaded} alt=""/>
            </div>
            {/*<div className="slick-container" onMouseEnter={() => this.setState({slickShow: true})}>*/}
              {/**/}
            {/*</div>*/}
            <ReactCSSTransitionGroup
              transitionName={{
                enter: 'animated',
                enterActive: 'fadeInUp',
                leave: 'animated',
                leaveActive: 'fadeOutDown'
              }}
              transitionEnter={true}
              transitionLeave={true}
              transitionEnterTimeout={1000}
              transitionLeaveTimeout={1000}
              component="div"
              className="slick-container"
              onMouseLeave={() => this.setState({slickShow: false})}
              onMouseEnter={() => this.setState({slickShow: true})}
            >
              {
                slickShow
                  ? <div className="slick-box">
                  {
                    delay
                      ? <Slick {...settings}>
                      {
                        thumbs.map((img, index) => (
                          <div className="slide auto-img"
                               key={index}>
                            <img src={base + img} onClick={() => {
                              onSlickChange(index)
                            }} alt=""/>
                          </div>
                        ))
                      }
                    </Slick>
                      : null
                  }
                </div>
                  : null
              }
            </ReactCSSTransitionGroup>
          </div>
        </Spin>
      </div>
    )
  }
}
ProductsCase.propTypes = {
  cases: PropTypes.array.isRequired
}
export default ProductsCase