import React from 'react'
import { Router, Route, Switch } from 'dva/router'
import IndexPage from './routes/IndexPage'

import AboutPage from './routes/AboutPage.js'

import News from './routes/News.js'

import Login from './routes/Login.js'

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/news" component={News} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  )
}

export default RouterConfig
