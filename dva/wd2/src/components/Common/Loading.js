import React from 'react'
import { Icon } from 'antd-mobile'
import './Loading.scss'

const Loading = ({ text }) => {
  return (
    <div className="page-loading-29nal">
      <p className="loading-icon-box">
        <Icon type="loading" size="lg" color="rgba(255, 255, 255, .75)" />
        {text ? <span>{text}</span> : null}
      </p>
    </div>
  )
}

export default Loading
