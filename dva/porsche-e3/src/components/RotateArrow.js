import React from 'react'
import './RotateArrow.scss'

const RA = ({ width = 22, reverse = false, open = true }) => {
  const delay = Math.round(Math.random() * 40) * 10 + 300
  const duration = Math.round(Math.random() * 4) * 500 + 1000
  const style = {
    'animationDelay': delay + 'ms',
    'animationDuration': duration + 'ms'
  }
  return (
    <i className={reverse ? 'r rr-wrapper' : 'rr-wrapper'} style={style}>
      {open ? (
        <img
          src={require('../assets/item-arrow.png')}
          alt=""
          className="rotate-arrow"
          width={width}
        />
      ) : (
        <img
          src={require('../assets/item-arrow-unable.png')}
          alt=""
          className="rotate-arrow"
          width={width}
        />
      )}
    </i>
  )
}

export default RA
