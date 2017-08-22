import {
  INCREMENT_ASYNC,
  INCREMENT_IF_ODD,
  INCREMENT,
  DECREMENT,
  CANCEL_INCREMENT_ASYNC,
  COUNTDOWN_TERMINATED
} from '../actionTypes'

export function countdown(state = 0, action) {
  console.log('countdown', action);
  switch (action.type) {
    case INCREMENT_ASYNC:
      return action.value
    case COUNTDOWN_TERMINATED:
    case CANCEL_INCREMENT_ASYNC:
      return 0
    default:
      return state
  }
}

export function counter(state = 0, action) {
  console.log('counter', action);
  switch (action.type) {
    case INCREMENT:
      return state + 1
    case DECREMENT:
      return state - 1
    case INCREMENT_IF_ODD:
      return state % 2 === 0 ? state : state + 1
    default:
      return state
  }
}