import React, { Component } from 'react'
import { getDisplayName } from './utils'

export default WrappedComponent => {
  return class WithCopy extends Component {
    constructor(props) {
      super(props)
      this.copyInput = React.createRef()
    }

    static display = `WithMessage(${getDisplayName(WrappedComponent)})`

    copy = str => {
      if (window.clipboardData) {
        window.clipboardData.setData('Text', str)
        return
      }
      this.copyInput.current.value = str
      this.copyInput.current.select()
      document.execCommand('copy')
    }

    render() {
      return (
        <div>
          <input
            type="text"
            ref={this.copyInput}
            style={{
              position: 'absolute',
              zIndex: -1,
              opacity: 0,
            }}
          />
          <WrappedComponent {...this.props} execCopy={this.copy} />
        </div>
      )
    }
  }
}
