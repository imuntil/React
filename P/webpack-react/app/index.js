/**
 * Created by 斌 on 2017/6/16.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import App from './app'

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('app')
  )
}
render(App)

if (module.hot) {
  module.hot.accept('./', () => {
    render(App)
  })
}