import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Motion, spring} from 'react-motion';
import InOut from './InOut'
import TweenOne from 'rc-tween-one'
import {
  BrowserRouter as Router,
  Link,
  Route
} from 'react-router-dom'
import QueueAnim from 'rc-queue-anim'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import SubApp from './components/SubApp'
const TweenOneGroup = TweenOne.TweenOneGroup

// const RouterDemo = ({childern, location}) => (
//
// )

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Motion defaultStyle={{width: 0}} style={{width: spring(100)}}>
          {interpolatingStyle => <div style={{backgroundColor:'red', ...interpolatingStyle}}>XXXXXXX</div>}
        </Motion>
        <InOut />
        <TweenOneGroup>
          <div key="0">demo</div>
        </TweenOneGroup>
        <Router>
          <div>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/news">News</Link></li>
            </ul>
            <div>
              <Route key="111" path="/" exact render={({location}) => (
                <TweenOneGroup>
                  <div key="11">Home-{location.pathname}</div>
                </TweenOneGroup>
              )} />
              <Route key="2222" path="/about" exact render={() => (
                <TweenOneGroup>
                  <div key="12">About</div>
                </TweenOneGroup>
              )} />
              <Route key="122" path="/news" exact render={() => (
                <QueueAnim>
                  <div key="13"><i>xxxxx</i></div>
                </QueueAnim>
              )} />
            </div>
          </div>
        </Router>
        {/*<SubApp />*/}
      </div>
    )
  }
}

export default App
