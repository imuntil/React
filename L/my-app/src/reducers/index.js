import { combineReducers } from 'redux'
import li from './li-reducers'
import loading from './loading-reducers'

export default combineReducers({
  li,
  loading
})