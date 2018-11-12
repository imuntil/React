import { SET_ERROR, RESET_ERROR } from '@/actions/error-actions'

export default (state = { error: false }, action) => {
  switch (action.type) {
    case SET_ERROR:
      return {
        error: true,
        message: action.message
      }
    case RESET_ERROR:
      return {
        error: false,
        message: ''
      }
    default:
      return state
  }
}
