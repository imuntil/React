import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import DefaultLayout from '@/layout/DefaultLayout'
import CustomRoute from '@/components/CustomRoute'

import HomePage from './views/HomePage'
import LoginPage from './views/LoginPage'
import LiPage from '@/views/LiPage'
import Page404 from '@/views/404'

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <CustomRoute
          path="/"
          exact
          layout={DefaultLayout}
          component={HomePage}
          lv={1}
        />
        <Route path="/login" component={LoginPage} />
        <CustomRoute
          path="/li"
          layout={DefaultLayout}
          component={LiPage}
          lv={5}
        />
        <Route component={Page404}></Route>
      </Switch>
    </Router>
  )
}

export default RouterConfig
