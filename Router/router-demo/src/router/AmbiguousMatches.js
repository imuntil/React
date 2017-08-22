import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

const AmbiguousDemo = ({match}) => (
  <Router basename={match.url}>
    <div style={{position: 'absolute', width:'100%', height: '200px'}}>
      <ul>
        <li><Link to='/about'>About Us</Link></li>
        <li><Link to="/company">Company</Link></li>
        <li><Link to="/kim">Kim (dynamic) </Link></li>
        <li><Link to="/chris">Chris (dynamic) </Link></li>
      </ul>
      <hr/>
      <Switch>
        <Route path="/about" render={() => <h2>About</h2>} />
        <Route path="/company" render={() => <h3>Company</h3>} />
        <Route path="/:user" render={({match}) => (
          <div>
            <h3>User: {match.params.user}</h3>
          </div>
        )}/>
      </Switch>
    </div>
  </Router>
)
export default AmbiguousDemo