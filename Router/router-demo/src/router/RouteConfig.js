import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

// const Main = () => <h3>Main</h3>
const Sandwiches = () => <h3>Sandwiches</h3>

const Tacos = ({ routes }) => (
  <div>
    <h2>Tacos</h2>
    <ul>
      <li><Link to="/tacos/bus">Bus</Link></li>
      <li><Link to="/tacos/cart">Cart</Link></li>
    </ul>
    {
      routes.map((route, i) => (
        <RouteWithSubRoutes key={i} {...route} />
      ))
    }
  </div>
)

const Bus = () => <h3>Bus</h3>
const Cart = () => <h3>Cart</h3>

const routes = [
  {
    path: '/sandwiches',
    component: Sandwiches
  },
  {
    path: '/tacos',
    component: Tacos,
    routes: [
      {
        path: '/tacos/bus',
        component: Bus
      },
      {
        path: '/tacos/cart',
        component: Cart
      }
    ]
  }
]

// const RouteWithSubRoutes = route => (
//   <Route path={route.path} render={props => (
//     <route.component {...props} routes={route.routes} />
//   )} />
// )
const RouteWithSubRoutes = ({component: Component, path, routes}) => (
  <Route path={path} render={props => (
    <Component {...props} routes={routes} />
  )} />
)

const RouteConfig  = ({match}) => (
  <Router basename={match.url}>
    <div style={{position: 'absolute', width:'100%', height: '200px'}}>
      <ul>
        <li><Link to="/tacos">Tacos</Link></li>
        <li><Link to="/sandwiches">Sandwiches</Link></li>
      </ul>
      {
        routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))
      }
    </div>
  </Router>
)

export default RouteConfig