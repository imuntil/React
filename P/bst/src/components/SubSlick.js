import React from 'react'
import Slick from 'react-slick'
import styles from './SubSlick.less'
import PropTypes from 'prop-types'

class SubSlick extends React.Component {
  render () {
    const settings = {
      infinite: false,
      slidesToShow: 4,
      slidesToScroll: 1,
      prevArrow: <button className="slick-prev slick-arrow">❯</button>,
      nextArrow: <button className="slick-next slick-arrow">❯</button>,
      adaptiveHeight: false,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        }
      ]
    }
    const {source} = this.props
    return (
      <div className="row">
        <div className="col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1 col-xs-10 col-xs-offset-1">
          <Slick {...settings}>
            {
              source.map((item, index) => (
                <div key={index}>
                  <img className={styles.img} src={item.img} alt=""/>
                  <span className={styles.span}>{item.name}</span>
                </div>
              ))
            }
          </Slick>
        </div>
      </div>
    )
  }
}

SubSlick.propTypes = {
  source: PropTypes.array.isRequired
}

export default SubSlick