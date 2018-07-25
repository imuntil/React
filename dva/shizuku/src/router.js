import React from 'react';
import {Router, Route, Switch} from 'dva/router';
import AuthRoute from './components/AuthRoute/AuthRoute'
import IndexPage from './routes/IndexPage';
import LoginPage from './routes/LoginPage'

function RouterConfig({history}) {
  return (
    <Router history={history}>
      <Switch>
        <AuthRoute path="/" exact component={IndexPage}/>
        <Route path="/login" component={LoginPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
