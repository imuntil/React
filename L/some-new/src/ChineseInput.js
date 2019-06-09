import React, { Component } from 'react'

export default class ChineseInput extends Component {
  inputAble = true
  handleCS = e => {
    this.inputAble = false
    console.log('composition-start:', e.target.value)
  }
  handleCU = e => {
    this.inputAble = false
    console.log('composition-update:', e.target.value)
  }
  handleCE = e => {
    this.inputAble = true
    console.log('composition-end:', e.target.value)
  }
  handleInput = e => {
    this.inputAble && console.log('input:', e.target.value)
  }
  render() {
    return (
      <div>
        <input
          type="text"
          onCompositionStart={this.handleCS}
          onCompositionEnd={this.handleCE}
          onCompositionUpdate={this.handleCU}
          onInput={this.handleInput}
        />
      </div>
    )
  }
}
