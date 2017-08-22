import {
  HASH_CHANGED,
  SCROLL_START,
  SCROLL_END
} from '../actions'

const initialState = {
  index: -1,
  scrolling: false
}
function anchor(state = initialState, action) {
  switch (action.type) {
    case HASH_CHANGED:
      return {
        ...state,
        index: action.index
      }
    case SCROLL_END:
      return {
        ...state,
        scrolling: false
      }
    case SCROLL_START:
      return {
        ...state,
        scrolling: true
      }
    default:
      return state
  }
}
export default anchor