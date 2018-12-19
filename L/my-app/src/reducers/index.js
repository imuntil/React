import { combineReducers } from 'redux'
import li from './li-reducers'
import loading from './loading-reducers'
import error from './error-reducers'
import * as bgm from './bgm-reducers'
import * as cld from './calendar-reducers'

export default combineReducers({
  li,
  loading,
  error,
  ...bgm,
  ...cld
})