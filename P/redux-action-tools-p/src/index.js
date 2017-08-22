import React from 'react'
import ReactDOM from 'react-dom'
import List from './components/List'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import reducer from './reducers'
import loadingMiddleware from './shared/loading'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, /* preloadedState, */ composeEnhancers(
  applyMiddleware(
    loadingMiddleware,
    thunk,
    logger
  )
))

ReactDOM.render((
  <Provider store={store}>
    <List />
  </Provider>),
  document.getElementById('app'))