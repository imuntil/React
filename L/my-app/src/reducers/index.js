import { combineReducers } from 'redux'
import li from './li-reducers'
import loading from './loading-reducers'
import error from './error-reducers'
import * as bgm from './bgm-reducers'

export default combineReducers({
  li,
  loading,
  error,
  ...bgm
})