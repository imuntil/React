import React, { Component } from 'react'
import { Carousel } from 'antd'
import { Link } from 'dva/router'
import './Carousel.scss'

class E3Carousel extends Component {
  // constructor(props) {
  //   super(props)
  // }
  render() {
    return <Carousel className="e3-carousel" autoplay>
        <div className="box">
          <p className="top">
            <span>课前学习</span>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="60" width="90%">
              <polygon points="0,0 300,0 0,60" style={{ fill: 'red' }} />
            </svg>
          </p>
          <Link to="/login">
            <img src={require('../assets/swper-1.jpg')} alt="" width="100%" />
          </Link>
        </div>
        <div className="box">
          <p className="top">
            <span>上是培训</span>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="60" width="90%">
              <polygon points="0,0 300,0 0,60" style={{ fill: 'rgb(64, 63, 69)' }} />
            </svg>
          </p>
          <Link to="/news">
            <img src={require('../assets/swper-2.jpg')} alt="" width="100%" />
          </Link>
        </div>
        <div className="box">
          <p className="top">
            <span>课后学习</span>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="60" width="90%">
              <polygon points="0,0 300,0 0,60" style={{ fill: 'rgb(64, 63, 69)' }} />
            </svg>
          </p>
          <Link to="/about">
            <img src={require('../assets/swper-3.jpg')} alt="" width="100%" />
          </Link>
        </div>
      </Carousel>
  }
}

export default E3Carousel
