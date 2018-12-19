import { RECEIVE_CALENDAR } from '@/actions/calendar-actions'

export const calendar = (state = [], action) => {
  if (action.type === RECEIVE_CALENDAR) {
    return action.payload.map(v => v.items)
  }
  return state
}
