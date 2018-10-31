import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cssModules from 'react-css-modules'
import styles from './BangumiTLHeader.module.scss'
import Week from './Week'

function BangumiTLHeader({ x, week, onArrowClick }) {
  return (
    <div styleName="bgm-header">
      {x !== 0 ? (
        <div
          styleName="arrow-left"
          onClick={() => onArrowClick('left')}
        />
      ) : null}
      <Week x={x * 280} week={week} />
      {x !== -3 ? (
        <div
          styleName="arrow-right"
          onClick={() => onArrowClick('right')}
        />
      ) : null}
    </div>
  )
}

BangumiTLHeader.propTypes = {
  x: PropTypes.number.isRequired,
  week: PropTypes.array.isRequired,
  onArrowClick: PropTypes.func.isRequired
}

export default cssModules(BangumiTLHeader, styles)
