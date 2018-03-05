import React from 'react'
import './RotateArrow.scss'

const RA = ({ width = 22, reverse = false, open = true }) => {
  return (
    <i className={reverse ? 'r rr-wrapper' : 'rr-wrapper'}>
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
