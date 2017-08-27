import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';
import SelectPage from './routes/Select'
import DemoPage from './routes/TestList'
import PostPage from "./routes/PostPage.js";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} />
      <Route path={'/test'} components={DemoPage} />
      <Route path={'/select'} components={SelectPage} />
      <Route path="/post/:id" component={PostPage} />
    </Router>
  );
}

export default RouterConfig;
