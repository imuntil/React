import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cssModules from 'react-css-modules'
import styles from './BangumiTLBody.module.scss'
import BangumiTimeline from '../components/bangumi/BangumiTimeline'

class BangumiTLBody extends Component {
  static propTypes = {
    // prop: PropTypes
  }

  render() {
    const week = [1, 2, 3, 4, 5, 6, 7]
    return (
      <div styleName="tl-wrapper">
        <div styleName="tl-body">
          {week.map(v => (
            <BangumiTimeline key={v} />
          ))}
        </div>
      </div>
    )
  }
}

export default cssModules(BangumiTLBody, styles)
