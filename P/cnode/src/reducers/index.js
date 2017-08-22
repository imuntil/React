import {
  RECEIVE_TOPICS
} from '../actions'
const initialState = {

}
function topics(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_TOPICS:
      return {
        ...state,
        ...action.topics
      }
    default:
      return state
  }
}

export default topics