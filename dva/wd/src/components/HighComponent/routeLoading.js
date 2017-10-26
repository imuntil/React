import React from 'react'

function routeLoading (RouteComponent) {
  class Route extends React.Component {
    componentDidMount () {
      const { dispatch } = this.props
      dispatch({ type: 'routeLoading/stop' })
    }
    render () {
      return <RouteComponent {...this.props} />
    }
  }
  return Route
}

export default routeLoading
