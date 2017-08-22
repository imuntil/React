import React from 'react'
import Slider from 'react-slick'
import './Carousel.less'

function JCarousel() {
  const settings = {
    dots: true,
    className: 'banner-slick',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <a className='custom-slick-prev' href="javascript:;"><img src={require('../assets/banner-arrow-next.png')} alt=""/></a>,
    prevArrow: <a className='custom-slick-next' href="javascript:;"><img src={require('../assets/banner-arrow-prev.png')} alt=""/></a>
  }
  return (
    <Slider {...settings}>
      <div className="slide" key="1">
        <img src={require('../assets/banner.jpg')} alt=""/>
      </div>
      <div className="slide" key="2">
        <img src={require('../assets/banner-2.jpg')} alt=""/>
      </div>
      <div className="slide" key="3">
        <img src={require('../assets/banner-3.jpg')} alt=""/>
      </div>
      <div className="slide" key="4">
        <img src={require('../assets/banner2.jpg')} alt=""/>
      </div>
    </Slider>
  )
}
export default JCarousel