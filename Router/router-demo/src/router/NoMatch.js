import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'

const NoMatchDemo = ({match}) => (
  <Router basename={match.url}>
    <div style={{position: 'absolute', width:'100%', height: '200px'}}>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/old-match">Old Match, to be redirected</Link></li>
        <li><Link to="/will-match">Will Match</Link></li>
        <li><Link to="/will-not-match">Will Not Match</Link></li>
        <li><Link to="/also/will/not/match">Also Will Not Match</Link></li>
      </ul>
      <hr/>
      <Switch>
        <Route path="/" exact component={Home} />
        <Redirect from="/old-match" to="/will-match" />
        <Route path="/will-match" component={WillMatch} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>
)
const WillMatch = () => <h3>Matched</h3>
const NoMatch = ({ location }) => (
  <div>
    <h3>404 Not Found</h3>
    <h3>No match for <code>{location.pathname}</code></h3>
  </div>
)
const Home = () => (
  <p>
    A <code>&lt; Switch></code> renders the
    first child <code>&lt;Route></code> that
    matches. A <code>&lt;Route></code> with
    no <code>path</code> always matches.
  </p>
)
export default NoMatchDemo