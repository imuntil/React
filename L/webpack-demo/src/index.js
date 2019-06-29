import React, { Component } from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './Home'
import List from './List'

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/" exact component={Home} />
        <Route path="/list" component={List} />
      </BrowserRouter>
    )
  }
}

ReactDom.render(<App />, document.querySelector('#root'))
