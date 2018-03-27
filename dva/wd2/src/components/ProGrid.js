import React from 'react'
import './ProGrid.scss'

const ProGrid = ({ className, ...props }) => {
  return (
    <div className={`${className} pro-grid-ay29k`}>
      <div className="img">
        <img src={require('../assets/home-sellings-2.jpg')} alt=""/>
        <span className="hot">
          <img src={require('../assets/hot-1.png')} alt=""/>
        </span>
      </div>
      <div className="infos">
        <p>Glen Grant Single Whiskey Major Reserve</p>
        <p>格兰冠单一麦芽苏格兰威士忌</p>
        <p className="last">
          <span>700ml</span>
          <span className="color--red">800</span>
        </p>
      </div>
    </div>
  )
}

export default ProGrid
