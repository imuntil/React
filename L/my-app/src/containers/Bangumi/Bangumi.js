import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cssModules from 'react-css-modules'
import styles from './Bangumi.module.scss'
import BangumiTLHeader from '@/components/Bangumi/BangumiTLHeader'
import BangumiTLBody from './BangumiTLBody'
import { getDays } from '@/utils'

class Bangumi extends Component {
  static propTypes = {}
  state = {
    x: -2,
    week: [],
    duration: 450
  }
  constructor(props) {
    super(props)
    this.state.week = getDays()
  }
  handleArrowClick = direction => {
    this.setState(state => {
      const x = direction === 'right' ? -3 : 0
      return {
        x,
        duration: Math.abs(x - state.x) * 300
      }
    })
  }
  render() {
    return (
      <div styleName="main-bangumi">
        <div styleName="bangumi-inner">
          <BangumiTLHeader
            {...this.state}
            onArrowClick={this.handleArrowClick}
          />
          <BangumiTLBody {...this.state} />
        </div>
      </div>
    )
  }
}

export default cssModules(Bangumi, styles)
