import { combineReducers } from 'redux'
import {
  SELECT_REDDIT,
  REQUEST_POSTS,
  RECEIVE_POSTS
} from '../actions'

function selectedReddit(state = 'reactjs',  action) {
  switch (action.type) {
    case SELECT_REDDIT:
      return action.reddit
    default:
      return state
  }
}
const initialState = {
  isFetching: false,
  items: []
}
function posts(state = initialState, action) {
  switch (action.type) {
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_POSTS:
      return {
        ...state,
        isFetching: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      }
    default:
      return state;
  }
}

function postsByReddit(state = {}, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return {
        ...state,
        [action.reddit]: posts(state[action.reddit], action)
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  postsByReddit,
  selectedReddit
})

export const selectedRedditSelector = state => state.selectedReddit
export const postsByRedditSelector = state => state.postsByReddit

export default rootReducer