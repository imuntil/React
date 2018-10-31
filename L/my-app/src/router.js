import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HomePage from './views/HomePage'
import LoginPage from './views/LoginPage'

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" component={LoginPage} />
      </Switch>
    </Router>
  )
}

export default RouterConfig
