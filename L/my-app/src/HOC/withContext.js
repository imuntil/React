import React, { Component } from 'react'
import { UserContext } from '@/context/user-context'
import { getDisplayName } from './utils'

const cm = {
  user: UserContext
}

export default (WrappedComponent, context = 'user') => {
  return class extends Component {
    static contextType = cm[context]
    static displayName = `WithContext(${getDisplayName(WrappedComponent)})`
    render() {
      return <WrappedComponent {...this.props} user={this.context} />
    }
  }
}
