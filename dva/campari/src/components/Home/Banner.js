import React from 'react';
import { Carousel } from 'antd-mobile'
import styles from './Banner.css';

const swipes = [
  {
    src: 'http://api.jtuntech.com/event/2017/wd/campari/img/swiper/s5.jpg',
    en: 'Glen Grant',
    cn: '格兰冠单一麦芽格兰威士忌系列'
  },
  {
    src: 'http://api.jtuntech.com/event/2017/wd/campari/img/swiper/s6.jpg',
    en: 'Wild Turkey Bourbon Whiskey',
    cn: '威凤凰波本威士忌系列'
  },
  {
    src: 'http://api.jtuntech.com/event/2017/wd/campari/img/swiper/s3.jpg',
    en: 'SKYY Martini',
    cn: '深蓝马天尼鸡尾酒套餐'
  },
  {
    src: 'http://api.jtuntech.com/event/2017/wd/campari/img/swiper/s4.jpg',
    en: 'SKYY Pineapple Pleasure',
    cn: '趣怪菠萝鸡尾酒套餐'
  },
  {
    src: 'http://api.jtuntech.com/event/2017/wd/campari/img/swiper/s2-2.jpg',
    en: 'Aperol Spritz',
    cn: '阿佩罗橙色气泡鸡尾酒套餐'
  },
  {
    src: 'http://api.jtuntech.com/event/2017/wd/campari/img/swiper/s2.jpg',
    en: 'SKYY Mule',
    cn: '蓝色骡子鸡尾酒套餐'
  }
]

class Banner extends React.Component {
  state = {
    initialHeight: 500
  }
  render() {
    const { initialHeight: h } = this.state
    const hProp = h ? { height: h } : {}
    return (
      <div className={styles.normal}>
        <Carousel
          className="home-carousel"
          autoplay
          infinite
          seletedIndex={1}
          swipeSpeed={35}
        >
          {
            swipes.map((slide, index) => (
              <div style={hProp} className={styles.slide} key={index}>
                <img
                  src={slide.src}
                  alt=""
                  onLoad={() => {
                    window.dispatchEvent(new Event('resize'))
                    this.setState({
                      initialHeight: null
                    })
                  }}
                />
                <div className="info">
                  <p className={styles.en}>{slide.en}</p>
                  <p className={styles.cn}>{slide.cn}</p>
                </div>
              </div>
            ))
          }
        </Carousel>
      </div>
    );
  }
}

export default Banner;
