import React from 'react'
import PropTypes from 'prop-types'
import cssModules from 'react-css-modules'
import styles from './Day.module.scss'

function Day({ date, week, isToday }) {
  return (
    <div styleName="head">
      <div styleName={isToday ? 'today' : 'day'}>
        <div styleName="day-of-week" />
        <div styleName="g">
          <span styleName="date">{date}</span>
          <span styleName="week">{week}</span>
        </div>
      </div>
    </div>
  )
}

Day.propTypes = {
  date: PropTypes.string.isRequired,
  week: PropTypes.string.isRequired,
  isToday: PropTypes.bool.isRequired
}

export default cssModules(Day, styles)
