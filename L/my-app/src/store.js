import { compose, createStore, applyMiddleware } from 'redux'
import { loading } from './middleware'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware, loading))
)

export default store
