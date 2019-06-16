import React, { Component } from 'react'
import fp from 'lodash/fp'

export default class FP extends Component {
  state = {
    a: {
      b: [
        {
          c: [
            {},
            {},
            {
              d: 1
            }
          ]
        }
      ]
    }
  }
  handleClick = () => {
    // this.setState(fp.update('a.b[0].c[2]', fp.set('d', 10)))
    this.setState((prevState, prevProps) => {
      return fp.update('a.b[0].c[2]', fp.set('d', 10))(prevState)
    })
  }
  render() {
    return (
      <div>
        d is {this.state.a.b[0].c[2].d}{' '}
        <button onClick={this.handleClick}>click</button>
      </div>
    )
  }
}
