import React, { Component } from 'react'
import { message } from 'antd'
import { getDisplayName } from './utils'
import { connect } from 'react-redux'

export default WrappedComponent => {
  class WithMessage extends Component {

    componentDidUpdate = (prevProps, prevState) => {
      const { error, message: msg } = this.props.errorMsg
      error && message.error(msg)
    }

    static display = `WithMessage(${getDisplayName(WrappedComponent)})`
    render() {
      console.log('render.........')
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
