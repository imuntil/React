import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Container from './Container'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const style = {
  position: 'absolute',
  top: 300,
  width: 100,
  height: 100,
  backgroundColor: '#aaa'
}

const SubApp = () => (
  <Router>
    <Route path='/' children={() => (
      <div>
        <ul>
          <li><Link to="/1">page-1</Link></li>
          <li><Link to="/2">page-1</Link></li>
          <li><Link to="/3">page-1</Link></li>
          <li><Link to="/4">page-1</Link></li>
        </ul>
        <ReactCSSTransitionGroup
          transitionName='example'
          component='div'
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}>
          <Route key="1" path="/1" exact render={() => (<div style={style}>page-1</div>)} />
          <Route key="2" path="/2" exact render={() => (<div style={style}>page-2</div>)} />
          <Route key="3" path="/3" exact render={() => (<div style={style}>page-3</div>)} />
          <Route key="4" path="/4" exact render={() => (<div style={style}>page-4</div>)} />
        </ReactCSSTransitionGroup>
      </div>
    )} />
  </Router>
)
export default SubApp