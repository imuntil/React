import { REQUEST_LI_POSTS, RECEIVE_LI_POSTS } from '../actions/li-actions'

const initialState = {
  pager: { page: 1, size: 10 },
  fetching: false,
  list: []
}

function li(state = initialState, action) {
  switch (action.type) {
    case REQUEST_LI_POSTS:
      return { ...state, fetching: true }
    case RECEIVE_LI_POSTS:
      return { fetching: false, list: action.data, pager: action.pager }
    default:
      return state
  }
}

export default li