import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Link
} from 'react-router-dom'

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)
const About = () => (
  <div>
    <h2>About</h2>
  </div>
)
const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)
const Topics = ({ match }) => (
  <div>
    <h2>Topic</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. state
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic} />
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )} />
  </div>
)

const BasicExample = () => (
  <Router basename="/basic/">
    <div style={{position: 'absolute'}}>
      <ul>
        <li><NavLink exact activeClassName="xxxx" to="/">Home</NavLink></li>
        <li><NavLink activeClassName="xxxx" to="/about">About</NavLink></li>
        <li><Link to="/topics">Topics</Link></li>
      </ul>
      <hr/>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/topics" component={Topics} />
    </div>
  </Router>
)

export default BasicExample