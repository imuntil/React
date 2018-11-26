import {
  REQUEST_LIS,
  RECEIVE_LIS,
  FAIL_LI_POST
} from '../actions/li-actions'

const initialState = {
  pager: { page: 1, size: 20, total: 1 },
  list: []
}

function li(state = initialState, action) {
  switch (action.type) {
    case REQUEST_LIS:
      return state
    case RECEIVE_LIS:
      const { page, total, size } = action.pager
      return {
        list: action.data,
        pager: { page, total, size }
      }
    case FAIL_LI_POST:
    default:
      return state
  }
}

export default li
