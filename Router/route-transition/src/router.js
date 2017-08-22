import { RouteTransition } from 'react-router-transition'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import React from 'react'

const style = {
  position: 'absolute',
  width: '10%',
  backgroundColor: '#ddd',
  height: '200px',
  left: '40%'
}
const Home = () => (<div style={style}>Home</div>)
const About = () => <div style={style}>About</div>

const AnimRouter = () => {
  return (
    <Router>
      <div>
        <Route render={({location}) => {
          return (
            <RouteTransition
              pathname={location.pathname}
              atEnter={{ translateX: 100 }}
              atLeave={{ translateX: -100 }}
              atActive={{ translateX: 0 }}
              mapStyles={styles => ({ transform: `translateX(${styles.translateX}%)` })}
            >
              <Switch key={location.key} location={location}>
                <Route exact path="/" component={Home} />
                <Route exact path="/about/" component={About}/>
              </Switch>
            </RouteTransition>
          )
        }} />
      </div>
    </Router>
  )
}
export default AnimRouter