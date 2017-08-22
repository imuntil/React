import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class FooterBar extends Component {
  static propTypes = {
    onToggleAll: PropTypes.func,
    onDeleteCompleted: PropTypes.func
  }
  handleToggleAll () {
    if (this.props.onToggleAll) {
      this.props.onToggleAll()
    }
  }
  handleDeleteCompleted () {
    if (this.props.onDeleteCompleted) {
      this.props.onDeleteCompleted()
    }
  }
  render () {
    return (
      <footer>
        <button onClick={this.handleToggleAll.bind(this)}>complete all</button>
        {/*<button onClick={}>show active</button>*/}
        <button onClick={this.handleDeleteCompleted.bind(this)}>delete completed</button>
      </footer>
    )
  }
}