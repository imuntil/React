import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import Counter from './components/Counter'
import reducer from './reducers'
import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(rootSaga)

const action = type => store.dispatch({type})

function render() {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrementAsync={() => action('INCREMENT_ASYNC')}
      onIncrementIfOdd={() => action('INCREMENT_IF_ODD')}
      onDecrement={() => action('DECREMENT')}
      onIncrement={() => action('INCREMENT')}
    />,
    document.getElementById('app')
  )
}

render()
store.subscribe(render)