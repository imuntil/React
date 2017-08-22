import { combineReducers } from 'redux'
import test from './test'
import { loadingReducer } from '../shared/loading'

const rootReducer = combineReducers({
  test,
  loading: loadingReducer
})

export default rootReducer