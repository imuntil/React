import React from 'react'
import { Router, Route, Switch } from 'dva/router'
import NavBar from './components/NavBar'
import IndexPage from './routes/IndexPage'
import CocktailPage from './routes/CocktailPage'
import ProIndexPage from './routes/ProIndexPage'

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
              <Route path="/pro" component={ProIndexPage} />
            </Switch>
            <NavBar />
          </div>
        )}
      />
    </Router>
  )
}

export default RouterConfig
