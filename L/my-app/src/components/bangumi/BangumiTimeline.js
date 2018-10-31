import React from 'react'
import PropTypes from 'prop-types'
import cssModules from 'react-css-modules'
import styles from './BangumiTimeline.module.scss'
import BangumiCard from './BangumiCard'

function BangumiTimeline({ list = [1, 2, 3, 4] }) {
  return (
    <div styleName="timeline">
      {list.map(v => (
        <BangumiCard key={v} follow={ v % 2 === 0 } />
      ))}
    </div>
  )
}

BangumiTimeline.propTypes = {
  list: PropTypes.array
}

export default cssModules(BangumiTimeline, styles)
