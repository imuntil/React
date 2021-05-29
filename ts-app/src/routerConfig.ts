// import React from 'react'
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Demo1 from './routes/Demo1'
import Navigation from './routes/Navigation'
import SpringDemo from './routes/ReactSpringDemo'
import ResizeAware from './routes/ReactResizeAware'

const routes = [
  {
    path: '/demo1',
    component: Demo1,
    exact: true,
    name: 'Demo1',
  },
  {
    path: '/',
    exact: true,
    component: Navigation,
    name: 'Navigation',
  },
  {
    path: '/react-spring/:demo?',
    staticPath: '/react-spring',
    exact: true,
    component: SpringDemo,
    name: 'React Spring demo',
  },
  {
    path: '/react-resize-aware',
    exact: true,
    component: ResizeAware,
    name: 'React resize aware demo',
  },
]

export default routes