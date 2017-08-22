import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import Example from './router'
import AuthExample from './router/Auth'
import CustomLinkDemo from './router/CustomLink'
import PreventingTransitionsDemo from './router/PreventTransitions'
import NoMatchDemo from './router/NoMatch'
import SidebarDemo from './router/Sidebar'
import AnimatedTransitionsDemo from './router/AnimatedTransitions'
import AmbiguousMatchesDemo from './router/AmbiguousMatches'
import RouteConfigDemo from './router/RouteConfig'
import ModalSwitchDemo from './router/ModalSwitch'
import { RouteTransition } from 'react-router-transition'

import {
  BrowserRouter as Router,
  Link,
  Route,
  Redirect
} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <Router>
          <div>
            <Route render={({location}) => {
              return (
                <RouteTransition
                  pathname={location.pathname}
                  atEnter={{ opacity: 0 }}
                  atLeave={{ opacity: 0 }}
                  atActive={{ opacity: 1 }}
                >
                  <Route key="0" path="/" exact render={() => (
                    <ul style={{position: 'absolute', width:'100%', height: '200px'}}>
                      <li><Link to="/basic">Basic Demo</Link></li>
                      <li><Link to="/auth">Auth Demo</Link></li>
                      <li><Link to="/custom">Custom Link Demo</Link></li>
                      <li><Link to="/prevent-transition">Preventing Transitions Demo</Link></li>
                      <li><Link to="/no-match">No Matches Demo</Link></li>
                      <li><Link to="/sidebar">Sidebar Demo</Link></li>
                      <li><Link to="/animate">Animated Transitions Demo</Link></li>
                      <li><Link to="/ambiguous">Ambiguous Matches Demo</Link></li>
                      <li><Link to="/route-config">Route Config Demo</Link></li>
                      <li><Link to="/modal">Modal Gallery Demo</Link></li>
                    </ul>
                  )}/>
                  <Route key="1" path="/basic" component={Example} />
                  <Route key="2" path="/auth" component={AuthExample} />
                  <Route key="3" path="/custom" component={CustomLinkDemo} />
                  <Route key="4" path="/prevent-transition" component={PreventingTransitionsDemo} />
                  <Route key="5" path="/no-match" component={NoMatchDemo} />
                  <Route key="6" path="/sidebar" component={SidebarDemo} />
                  <Route key="7" path="/animate" component={AnimatedTransitionsDemo} />
                  <Route key="8" path="/ambiguous" component={AmbiguousMatchesDemo} />
                  <Route key="9" path="/route-config" component={RouteConfigDemo} />
                  <Route key="10" path="/modal" component={ModalSwitchDemo} />
                </RouteTransition>
              )
            }} />
          </div>
        </Router>
      </div>
    )
  }
}

export default App
