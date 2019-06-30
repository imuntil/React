import React, { Component } from 'react'
import reactDom from 'react-dom'
import _ from 'lodash'

class App extends Component {
  render() {
    return <div>{_.join(['this', 'is', 'home'], ' ')}</div>
  }
}

reactDom.render(<App/>, document.querySelector('#root'))
