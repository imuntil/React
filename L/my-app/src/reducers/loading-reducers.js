import { LOADING_START, LOADING_END } from '@/actions/loading-actions'

export default (state = {}, action) => {
  switch (action.type) {
    case LOADING_START:
      return {
        ...state,
        [action.name]: true,
        global: true
      }
    case LOADING_END:
      return {
        ...state,
        [action.name]: false,
        global: false
      }
    default:
      return state
  }
}
