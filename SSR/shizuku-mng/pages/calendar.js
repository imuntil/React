import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styles from './calendar.module.scss'
import cssModules from 'react-css-modules'
import DndBoardCt from '../containers/DndBoardCt'

class Calendar extends Component {
  static propTypes = {
    // prop: PropTypes
  }

  render() {
    return <DndBoardCt />
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Calendar)
