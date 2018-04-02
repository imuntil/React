import React from 'react'
import { Router, Route, Switch } from 'dva/router'
import NavBar from './components/NavBar'
import IndexPage from './routes/IndexPage'
/* eslint-disable no-unused-vars */
import CocktailPage from './routes/CocktailPage'
import ProIndexPage from './routes/Product/ProIndexPage'
import ProListPage from './routes/Product/ProListPage'
import ProDetailPage from './routes/Product/ProDetailPage'

const Pro = () => {
  return (
    <Switch>
      <Route path="/pro/" exact component={ProIndexPage} />
      <Route path="/pro/list" component={ProListPage} />
      <Route path="/pro/:id" component={ProDetailPage} />
    </Switch>
  )
}

function isVisible({ pathname }) {
  return ['/', '/pro', '/cocktail'].indexOf(pathname) > -1
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
            </Switch>
            {isVisible(location) ? <NavBar /> : null}
          </div>
        )}
      />
    </Router>
  )
}

export default RouterConfig
