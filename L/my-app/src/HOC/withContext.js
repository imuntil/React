import React, { Component } from 'react'
import { UserContext } from '@/context/user-context'
import { getDisplayName } from './utils'

const cm = {
  user: UserContext
}

export default (WrappedConponent, context = 'user') => {
  return class extends Component {
    static contextType = cm[context]
    static displayName = `WithContext(${getDisplayName(WrappedConponent)})`
    render() {
      return <WrappedConponent {...this.props} user={this.context} />
    }
  }
}
