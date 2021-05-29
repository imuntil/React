import React from 'react'
import {
  Switch,
  NavLink,
  Route,
  useLocation,
  useParams,
} from 'react-router-dom'
import TransitionSimple from './components/use-transition-simple'
import TrailSimple from './components/use-trail-simple'
import { useTransition, animated } from 'react-spring'
import './styles.css'

interface Props {}

const ReactSpringDemo = (props: Props) => {
  const location = useLocation()
  // const params = useParams()
  // console.log(`location`, location)
  // console.log(`params`, params)
  const transitions = useTransition(location, {
    from: { opacity: 0, transform: 'translate(-20px, -20px)' },
    enter: { opacity: 1, transform: 'translate(0px, 0px)' },
    leave: { opacity: 0, transform: 'translate(20px, 20px)' },
  })
  return (
    <div>
      <div className="menu">
        <NavLink to="/react-spring/transition-simple">简单的in/out切换</NavLink>
        <br />
        <NavLink to="/react-spring/trail-simple">简单列表动画</NavLink>
      </div>
      {transitions((props) => (
        <animated.div style={props} className="spring-demo-box">
          <Switch>
            <Route
              path="/react-spring/transition-simple"
              component={TransitionSimple}
            />
            <Route path="/react-spring/trail-simple" component={TrailSimple} />
          </Switch>
        </animated.div>
      ))}
    </div>
  )
}

export default ReactSpringDemo
