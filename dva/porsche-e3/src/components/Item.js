import React from 'react'
import RA from './RotateArrow'
import './Item.scss'

const Item = ({ reverse = false, children }) => {
  return (
    <div className={reverse ? 'reverse item-section' : 'item-section'}>
      <img
        src={require('../assets/item-bg-1.png')}
        alt=""
        className="bg"
        width="100%"
      />
      <div className="wrapper">
        <p className="img">
          {children[0]}
          <img
            src={require('../assets/item-decorator.png')}
            alt=""
            className="decorator"
            width="50"
          />
        </p>
        <ul className="words">
          <li>{children[1]}</li>
          <li>
            <RA reverse={reverse} />
          </li>
        </ul>
      </div>
    </div>
  )
}

Item.proTypes = {}

export default Item
