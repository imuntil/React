import React from 'react'
// import QueueAnim from 'rc-queue-anim'
import Bundle from './components/Bundle'
import { Router, Route, Switch } from 'dva/router'
/* eslint-disable import/no-webpack-loader-syntax */
import MainPage from 'bundle-loader?lazy!./routes/MainPage'

import AboutPage from 'bundle-loader?lazy!./routes/AboutPage.js'

import News from 'bundle-loader?lazy!./routes/News.js'

import LoginBundle from 'bundle-loader?lazy!./routes/Login.js'
import GuidePage from 'bundle-loader?lazy!./routes/GuidePage'

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route
          path="/"
          exact
          component={props => (
            <Bundle load={MainPage}>{Cmp => <Cmp {...props} />}</Bundle>
          )}
        />
        <Route
          path="/about"
          component={props => (
            <Bundle load={AboutPage}>{Cmp => <Cmp {...props} />}</Bundle>
          )}
        />
        <Route
          path="/news"
          component={props => (
            <Bundle load={News}>{Cmp => <Cmp {...props} />}</Bundle>
          )}
        />
        <Route
          path="/login"
          component={props => (
            <Bundle load={LoginBundle}>{Cmp => <Cmp {...props} />}</Bundle>
          )}
        />
        <Route
          path="/guide"
          component={props => (
            <Bundle load={GuidePage}>{Cmp => <Cmp {...props} />}</Bundle>
          )}
        />
        
      </Switch>
    </Router>
  )
}

export default RouterConfig
