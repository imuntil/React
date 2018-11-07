import React from 'react'
import cssModules from 'react-css-modules'
import styles from './404.module.scss'

function Page404() {
  return (
    <div>
      <h1>404</h1>
    </div>
  )
}

export default cssModules(Page404, styles)