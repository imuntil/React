import React, { Component } from 'react'

// sync or Async setState
export default class SASS extends Component {
  state = {
    name: 'zhin',
    set: false,
    x: 'x'
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate')
    if (!this.state.set) {
      this.setState({
        set: true,
        name: 'hahaha'
      })
      console.log('this.state', this.state)
    }
  }

  handleClick = () => {
    console.log('click')
    setTimeout(() => {
      console.log('timeout start')
      this.setState({ x: 'y' })
      console.log('timeout this.state', this.state)
    }, 0)
  }

  render() {
    console.log('render')
    return (
      <div>
        {this.state.name}
        <div>
          <button onClick={this.handleClick}>click</button>
        </div>
      </div>
    )
  }
}
