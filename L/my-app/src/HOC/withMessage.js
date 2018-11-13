import React, { Component } from 'react'
import { message } from 'antd'
import { getDisplayName } from './utils'
import { connect } from 'react-redux'

export default WrappedComponent => {
  class WithMessage extends Component {
    shouldComponentUpdate = (nextProps, nextState) => {
      const { error, message: msg } = nextProps.errorMsg
      error && message.error(msg)
      return false
    }

    static display = `WithMessage(${getDisplayName(WrappedComponent)})`
    render() {
      return <WrappedComponent {...this.props} />
    }
  }
  const mapStateToProps = state => {
    const { error } = state
    return { errorMsg: error }
  }

  return connect(
    mapStateToProps,
    null
  )(WithMessage)
}
