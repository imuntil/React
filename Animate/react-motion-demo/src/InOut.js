import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const divStyle = {
  position: 'absolute',
  width: 100,
  height: 100,
  backgroundColor: 'red'
}
export default class InOut extends Component {
  state = {
    show: true
  }
  handleToggleDiv () {
    const { show } = this.state
    this.setState({
      show: !show
    })
  }
  render () {
    const { show } = this.state
    return (
      <div>
        <button onClick={this.handleToggleDiv.bind(this)}>toggle</button>
        {/*<ReactCSSTransitionGroup*/}
          {/*transitionName="example"*/}
          {/*transitionEnterTimeout={500}*/}
          {/*transitionLeaveTimeout={300}>*/}
          {/*{*/}
            {/*show ? <div style={divStyle} /> : ''*/}
          {/*}*/}
        {/*</ReactCSSTransitionGroup>*/}
        <ReactCSSTransitionGroup
          transitionName={{
            enter: 'animated',
            enterActive: 'fadeInDown',
            leave: 'animated',
            leaveActive: 'fadeOutDown'
          }}
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={1000}
        >
          {
            show ? <div style={divStyle} /> : ''
          }
        </ReactCSSTransitionGroup>
        <ReactCSSTransitionGroup
          transitionName={{
            enter: 'animated',
            enterActive: 'fadeInDown',
            leave: 'animated',
            leaveActive: 'fadeOutDown'
          }}
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={1000}
        >
          {
            !show ? <div style={{...divStyle, backgroundColor: 'blue'}} /> : ''
          }
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}