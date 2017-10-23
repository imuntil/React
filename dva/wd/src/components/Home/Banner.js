import React from 'react';
import { Carousel } from 'antd-mobile'
import styles from './Banner.css';
import { swipes } from "../../constant";

class Banner extends React.Component {
  state = {
    initialHeight: 500
  }
  render() {
    const { initialHeight: h } = this.state
    const hProp = h ? { height: h } : {}
    const { onBannerClick } = this.props
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
              <div
                onClick={onBannerClick.bind(null, slide.id)}
                style={hProp} className={styles.slide} key={index}
              >
                <img
                  src={slide.src}
                  alt=""
                  onLoad={() => {
                    /* eslint-disable no-undef */
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
