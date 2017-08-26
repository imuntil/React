import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';
import SelectPage from './routes/Select'
import DemoPage from './routes/TestList'

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} />
      <Route path={'/test'} components={DemoPage} />
      <Route path={'/select'} components={SelectPage} />
    </Router>
  );
}

export default RouterConfig;
