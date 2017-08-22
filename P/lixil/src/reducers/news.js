import {
  RECEIVE_NEWS_DETAIL,
  RECEIVE_NEWS_LIST
} from '../actions'

const initialState = {
  list: [],
  detail: {}
}
function news(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_NEWS_LIST:
      return {
        ...state,
        list: action.list
      }
    case RECEIVE_NEWS_DETAIL:
      return {
        ...state,
        detail: action.detail
      }
    default:
      return state
  }
}
export default news