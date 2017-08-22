import React from 'react'
import Slick from 'react-slick'
import './Carousel.css'

function HomeCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }
  return (
    <div className="banner-section">
      <Slick {...settings}>
        <div className="img-box">
          <img src={require('../../assets/carousel/carousel_1.jpg')} alt=""/>
        </div>
        <div className="img-box">
          <img src={require('../../assets/carousel/carousel_2.jpg')} alt=""/>
        </div>
        <div className="img-box">
          <img src={require('../../assets/carousel/carousel_1.jpg')} alt=""/>
        </div>
        <div className="img-box">
          <img src={require('../../assets/carousel/carousel_2.jpg')} alt=""/>
        </div>
      </Slick>
    </div>
  )
}
export default HomeCarousel