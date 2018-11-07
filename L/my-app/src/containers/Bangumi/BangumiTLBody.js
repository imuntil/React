import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TweenOne from 'rc-tween-one'
import cssModules from 'react-css-modules'
import styles from './BangumiTLBody.module.scss'
import BangumiTimeline from '@/components/Bangumi/BangumiTimeline'

class BangumiTLBody extends Component {
  static propTypes = {
    // prop: PropTypes
    week: PropTypes.array.isRequired,
    x: PropTypes.number,
    duration: PropTypes.number
  }

  render() {
    const { week = [], x = 0, duration = 450 } = this.props
    return (
      <div styleName="tl-wrapper">
        <TweenOne
          styleName="tl-body"
          animation={{ x: x * 280, duration, ease: 'easeOutBack' }}
        >
          {week.map(v => (
            <BangumiTimeline key={v.date} />
          ))}
        </TweenOne>
      </div>
    )
  }
}

export default cssModules(BangumiTLBody, styles)
