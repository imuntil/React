import React from 'react'
import HomePage from './Home'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'

const history = createHistory()

function App() {
  return (
    <Router history={history}>
      <Route path={'/'} render={() =>(
        <div>
          <Route path="/" exact component={HomePage} />
        </div>
      )} />
    </Router>
  )
}

export default App