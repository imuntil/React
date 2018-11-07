import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { UserContext } from '@/context/user-context'

export default class CustomRoute extends Component {
  static propTypes = {
    lv: PropTypes.oneOf([0, 1, 2, 3, 4, 5]).isRequired,
    layout: PropTypes.func,
    component: PropTypes.func
  }

  static contextType = UserContext

  render() {
    const { component: Component, layout: Layout, lv, ...rest } = this.props
    // const user = this.context && this.context.info
    const user = { auth: 6 }
    return (
      <div>
        {user && user.auth >= lv ? (
          <Route
            {...rest}
            render={props => {
              return Layout ? (
                <Layout>
                  <Component {...props} />
                </Layout>
              ) : (
                <Component {...props} />
              )
            }}
          />
        ) : (
          <p>permission deny</p>
        )}
      </div>
    )
  }
}
