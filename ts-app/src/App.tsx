import React from 'react'
import { Switch, Link, Route } from 'react-router-dom'
import routes from './routerConfig'
import { useTransition, animated } from 'react-spring'
import { useLocation } from 'react-router-dom'

interface Props {}

const Paths = ['/', '/demo1', '/react-spring', '/react-resize-aware']

const App = (props: Props) => {
  const location = useLocation()
  console.log(`location`, location)
  const transitions = useTransition(location, {
    from: { opacity: 0, transform: 'translate(-20px, 20px)' },
    enter: { opacity: 1, transform: 'translate(0px, 0px)' },
    leave: { opacity: 0, transform: 'translate(20px, 20px)' },
  })
  // return transitions((props, item, t, i) => {
  return transitions((props, item) => {
    const ani = Paths.indexOf(item.pathname) > -1
    return ani ? (
      <animated.div style={props}>
        <Switch location={item}>
          {routes.map((v, index) => (
            <Route key={index} {...v} />
          ))}
        </Switch>
      </animated.div>
    ) : (
      <Switch>
        {routes.map((v, index) => (
          <Route key={index} {...v} />
        ))}
      </Switch>
    )
  })
}

export default App
