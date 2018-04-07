import React from 'react'
import { Router, Route, Switch } from 'dva/router'
import NavBar from './components/NavBar'
import IndexPage from './routes/IndexPage'
/* eslint-disable no-unused-vars */
import CocktailPage from './routes/CocktailPage'
import ProIndexPage from './routes/Product/ProIndexPage'
import ProListPage from './routes/Product/ProListPage'
import ProDetailPage from './routes/Product/ProDetailPage'

import LoginPage from './routes/User/LoginPage'

const Pro = () => {
  return (
    <Switch>
      <Route path="/pro/" exact component={ProIndexPage} />
      <Route path="/pro/list" component={ProListPage} />
      <Route path="/pro/:id" component={ProDetailPage} />
    </Switch>
  )
}

const User = () => {
  return (
    <Switch>
      <Route path='/user/login' component={LoginPage}/>
    </Switch>
  )
}

function isVisible({ pathname }) {
  return (
    ['/', '/pro', '/cocktail'].indexOf(pathname) > -1 ||
    pathname.indexOf('/pro/list') === 0
  )
}

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route
        path="/"
        render={({ location }) => (
          <div className="wrapper-m028h">
            <Switch>
              <Route path="/" exact component={IndexPage} />
              <Route path="/cocktail" component={CocktailPage} />
              <Route path="/pro" component={Pro} />
              <Route path='/user' component={User}/>
            </Switch>
            {isVisible(location) ? <NavBar /> : null}
          </div>
        )}
      />
    </Router>
  )
}

export default RouterConfig
