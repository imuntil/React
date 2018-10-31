
import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Button extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired
  }

  render() {
    return (
      <div>
        <button>{this.props.text}</button>
      </div>
    )
  }
}
