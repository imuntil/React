import React from 'react'
import { Link } from 'react-router-dom'
import routes from '../../routerConfig'

interface Props {}

const Navigation = (props: Props) => {
  return (
    <ul>
      {routes
        .filter((v) => v.path !== '/')
        .map((v, ix) => (
          <li key={ix}>
            <Link to={v.staticPath || v.path}>{v.name}</Link>
          </li>
        ))}
    </ul>
  )
}

export default Navigation
