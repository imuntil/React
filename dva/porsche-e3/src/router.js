import React from 'react'
import { Router } from 'dva/router'

const RouterConfig = ({ history, app }) => {
  const routes = [
    {
      path: '/',
      name: 'layout',
      getComponent(nextState, cb) {
        // const { layout = 'DefaultLayout' } = nextState.routes[1]
        require.ensure([], require => {
          cb(null, require(`./components/Layouts/DefaultLayout`).default)
        })
      },
      childRoutes: [
        {
          path: '',
          name: 'login',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, { component: require(`./routes/Login`).default })
            })
          }
        }
      ]
    }
  ]
  return <Router history={history} routes={routes} />
}

export default RouterConfig
