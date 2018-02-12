import React, { Component } from 'react'

class Border extends Component {
  render() {
    return <div className="lala">border, {this.props.children}</div>
  }
}
export default Border
