import React from 'react';
import { Router, Route } from 'dva/router';
// import {
//   HashRouter as Router,
//   Route
// } from 'react-router-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import IndexPage from './routes/IndexPage';
import P1 from './routes/P1'
import P2 from './routes/P2'
import P3 from './routes/P3'
import styles from './components/Animation/FadeInOut.less'

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      {/*<Route render={({ location, ...rest }) => {*/}
        {/*return (*/}
          {/*<ReactCSSTransitionGroup*/}
            {/*transitionName={{*/}
              {/*enter: 'animated',*/}
              {/*enterActive: 'fadeInDown',*/}
              {/*leave: 'animated',*/}
              {/*leaveActive: 'fadeOutDown',*/}
              {/*appear: 'animated',*/}
              {/*appearActive: 'fadeInDown'*/}
            {/*}}*/}
            {/*transitionEnter={true}*/}
            {/*transitionLeave={true}*/}
            {/*transitionAppear={true}*/}
            {/*transitionEnterTimeout={2000}*/}
            {/*transitionLeaveTimeout={2000}*/}
            {/*transitionAppearTimeout={2000}*/}
            {/*component="div"*/}
            {/*className={styles.normal}*/}
          {/*>*/}
            {/*<div key={location.pathname} className={styles.normal}>*/}
              {/*<Route exact path="/" component={IndexPage} />*/}
              {/*<Route path="/p1" component={P1}/>*/}
              {/*<Route path="/p2" component={P2} />*/}
            {/*</div>*/}
          {/*</ReactCSSTransitionGroup>*/}
        {/*)*/}
      {/*}} />*/}
      <Route exact path="/" component={IndexPage} />
      <Route path="/p1" component={P1}/>
      <Route path="/p2" component={P2} />
      <Route path="/p3" component={P3} />
    </Router>
  );
}

export default RouterConfig;
