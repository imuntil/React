import React, { Component } from 'react'
import reactDom from 'react-dom'

class List extends Component {
  render() {
    return <div>this is list</div>
  }
}
reactDom.render(<List />, document.querySelector('#root'))
