import { fetchBgmDaily } from '@/request/bgm'

export const REQUEST_CALENDAR = 'REQUEST_CALENDAR'
export const requestCalendar = () => ({
  type: REQUEST_CALENDAR
})

export const RECEIVE_CALENDAR = 'RECEIVE_CALENDAR'
export const receiveCalendar = payload => ({
  type: RECEIVE_CALENDAR,
  payload
})

export const fetchCalendar = () => async (dispatch, getState) => {
  dispatch(requestCalendar())
  const res = await fetchBgmDaily()
  console.log(res)
  dispatch(receiveCalendar(res))
}
