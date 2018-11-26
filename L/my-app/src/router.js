import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import DefaultLayout from '@/layout/DefaultLayout'
import CustomRoute from '@/components/CustomRoute'

import HomePage from './views/HomePage'
import BangumiIndex from './views/BangumiIndex'
import LoginPage from './views/LoginPage'
import LiPage from '@/views/LiPage'
import SearchPage from '@/views/SearchPage'
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
        <CustomRoute
          path="/index"
          layout={DefaultLayout}
          component={BangumiIndex}
          lv={1}
        />
        <Route path="/login" component={LoginPage} />
        <CustomRoute
          path="/li"
          layout={DefaultLayout}
          component={LiPage}
          lv={5}
        />
        <CustomRoute
          path="/search"
          layout={DefaultLayout}
          component={SearchPage}
          lv={1}
        />
        <Route component={Page404} />
      </Switch>
    </Router>
  )
}

export default RouterConfig
