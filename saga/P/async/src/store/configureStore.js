import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'

export default function () {
  const sagaMiddleware = createSagaMiddleware()
  return {
    ...createStore(rootReducer,  composeWithDevTools(applyMiddleware(sagaMiddleware))),
    runSaga: sagaMiddleware.run
  }
}