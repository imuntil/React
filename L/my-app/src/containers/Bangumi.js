import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cssModules from 'react-css-modules'
import styles from './Bangumi.module.scss'
import BangumiTLHeader from '../components/bangumi/BangumiTLHeader'
import BangumiTLBody from './BangumiTLBody'
import { getDays } from '../utils'

class Bangumi extends Component {
  static propTypes = {}
  state = {
    x: -2,
    week: []
  }
  constructor(props) {
    super(props)
    this.state.week = getDays()
  }
  handleArrowClick = direction => {
    this.setState({
      x: direction === 'right' ? -3 : 0
    })
  }
  render() {
    const { x, week } = this.state
    return (
      <div>
        <BangumiTLHeader
          x={x}
          week={week}
          onArrowClick={this.handleArrowClick}
        />
        <BangumiTLBody />
      </div>
    )
  }
}

export default cssModules(Bangumi, styles)
