import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cssModules from 'react-css-modules'
import { Link } from 'react-router-dom'
import styles from './BangumiTLHeader.module.scss'
import Week from './Week'

function BangumiTLHeader({ x, week, onArrowClick, duration }) {
  return (
    <div styleName="bgm-header">
      <div className="__blue" styleName="more">
        <Link to="/index">
          番剧索引 <i className="iconfont icon-go" styleName="icon" />
        </Link>
      </div>
      <div styleName="main">
        {x !== 0 ? (
          <div styleName="arrow-left" onClick={() => onArrowClick('left')} />
        ) : null}
        <Week x={x} week={week} duration={duration} />
        {x !== -3 ? (
          <div styleName="arrow-right" onClick={() => onArrowClick('right')} />
        ) : null}
      </div>
    </div>
  )
}

BangumiTLHeader.propTypes = {
  x: PropTypes.number.isRequired,
  week: PropTypes.array.isRequired,
  duration: PropTypes.number.isRequired,
  onArrowClick: PropTypes.func.isRequired
}

export default cssModules(BangumiTLHeader, styles)
