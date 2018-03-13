import React from 'react'
// import QueueAnim from 'rc-queue-anim'
import Bundle from './components/Bundle'
import { Router, Route, Switch, IndexRoute } from 'dva/router'
/* eslint-disable import/no-webpack-loader-syntax */
import MainPage from 'bundle-loader?lazy!./routes/MainPage'
import LoginBundle from 'bundle-loader?lazy!./routes/Login.js'
import GuidePage from 'bundle-loader?lazy!./routes/GuidePage'
import RulePage from 'bundle-loader?lazy!./routes/RulePage'
/* pre-learn */
import PreLearn from 'bundle-loader?lazy!./routes/pre-learn/index'
import PreTest from 'bundle-loader?lazy!./routes/pre-learn/Test'

const PRE = () => {
  return (
    <Switch>
      <Route
        path="/pre/"
        exact
        component={props => (
          <Bundle load={PreLearn}>{Cmp => <Cmp {...props} />}</Bundle>
        )}
      />
      <Route
        path="/pre/test/:type?"
        component={props => (
          <Bundle load={PreTest}>{Cmp => <Cmp {...props} />}</Bundle>
        )}
      />
    </Switch>
  )
}

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
        <Route
          path="/rule/:rule"
          component={props => (
            <Bundle load={RulePage}>{Cmp => <Cmp {...props} />}</Bundle>
          )}
        />
        <Route
          path="/pre"
          component={PRE}
        />
      </Switch>
    </Router>
  )
}

export default RouterConfig
