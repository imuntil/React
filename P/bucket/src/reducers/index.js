import userReducer from './user'
import bookReducer from './book'
import { combineReducers } from 'redux'

export default combineReducers({
  userReducer,
  bookReducer
})