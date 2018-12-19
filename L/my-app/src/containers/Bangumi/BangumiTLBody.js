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
    duration: PropTypes.number,
    calendar: PropTypes.array.isRequired,
  }

  render() {
    const { x = 0, duration = 450, calendar = [] } = this.props
    return (
      <div styleName="tl-wrapper">
        <TweenOne
          styleName="tl-body"
          animation={{ x: x * 280, duration, ease: 'easeOutBack' }}
        >
          {calendar.map((v, i) => (
            <BangumiTimeline key={i} list={v} />
          ))}
        </TweenOne>
      </div>
    )
  }
}

export default cssModules(BangumiTLBody, styles)
