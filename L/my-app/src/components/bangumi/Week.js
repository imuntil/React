import React from 'react'
import PropTypes from 'prop-types'
import cssModules from 'react-css-modules'
import TweenOne from 'rc-tween-one'
import styles from './Week.module.scss'
import Day from './Day'
import { weeks } from '@/utils'

function Week({ week, x = 0, duration = 450 }) {
  return (
    <div styleName="head-wrapper">
      <div styleName="head-list">
        <TweenOne
          animation={{
            x: x * 280,
            duration,
            delay: 200,
            ease: 'easeInOutQuint'
          }}
        >
          <div className="box">
            {week.map(v => (
              <Day key={v.date} {...v} />
            ))}
          </div>
        </TweenOne>
      </div>
    </div>
  )
}

Week.propTypes = {
  week: PropTypes.arrayOf(
    PropTypes.shape({
      isToday: PropTypes.bool,
      week: PropTypes.oneOf(weeks).isRequired,
      date: PropTypes.string.isRequired
    })
  ).isRequired,
  x: PropTypes.number,
  duration: PropTypes.number.isRequired
}

export default cssModules(Week, styles)
