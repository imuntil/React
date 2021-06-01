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
    from: { opacity: 0, xy: [-100, -100] },
    enter: { opacity: 1, xy: [0, 0] },
    leave: { opacity: 0, xy: [100, 100] },
  })
  return (
    <div>
      <div className='menu'>
        <NavLink to='/react-spring/transition-simple'>简单的in/out切换</NavLink>
        <br />
        <NavLink to='/react-spring/trail-simple'>简单列表动画</NavLink>
      </div>
      {transitions(({ opacity, xy }, item) => (
        <animated.div
          style={{
            opacity,
            left: xy.to((x, y) => `${x}px`),
            // transform: xy.to((x, y) => `translate(${x}px, ${y}px)`),
          }}
          className='spring-demo-box'
        >
          <Switch location={item}>
            <Route
              path='/react-spring/transition-simple'
              component={TransitionSimple}
              key="a"
            />
            <Route key="b" path='/react-spring/trail-simple' component={TrailSimple} />
          </Switch>
        </animated.div>
      ))}
    </div>
  )
}

export default ReactSpringDemo
