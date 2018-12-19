import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styles from './calendar.module.scss'
import cssModules from 'react-css-modules'

export class Calendar extends Component {
  static propTypes = {
    // prop: PropTypes
  }

  render() {
    return <div styleName="test">Calendar</div>
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(cssModules(Calendar, styles))
