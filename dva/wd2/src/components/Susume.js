import React from 'react'
import Slider from 'react-slick'
import './Susume.scss'

const Susume = () => {
  function handleClick(index) {
    console.log(index)
  }
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  }
  return (
    <Slider {...settings} className="susume-76dy">
      <div className="item" onClick={() => handleClick(0)}>
        <img src={require('../assets/swiper/s4.jpg')} alt="" />
        <p>
          <span className="en">SKYY Martini</span> <br />
          <span className="cn">深蓝马天尼鸡尾酒套餐</span>
        </p>
      </div>
      <div className="item" onClick={() => handleClick(1)}>
        <img src={require('../assets/swiper/s3.jpg')} alt="" />
        <p>
          <span className="en">SKYY Pineapple Pleasure</span> <br />
          <span className="cn">趣怪菠萝鸡尾酒套餐</span>
        </p>
      </div>
      <div className="item" onClick={() => handleClick(2)}>
        <img src={require('../assets/swiper/s2-2.jpg')} alt="" />
        <p>
          <span className="en">Aperol Spritz</span> <br />
          <span className="cn">阿佩罗橙色气泡鸡尾酒套餐</span>
        </p>
      </div>
      <div className="item" onClick={() => handleClick(3)}>
        <img src={require('../assets/swiper/s2.jpg')} alt="" />
        <p>
          <span className="en">SKYY Mule</span> <br />
          <span className="cn">蓝色骡子鸡尾酒套餐</span>
        </p>
      </div>
    </Slider>
  )
}

export default Susume
