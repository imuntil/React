import { delay } from '@/utils'

export const SET_ERROR = 'SET_ERROR'
export const setError = message => ({
  type: SET_ERROR,
  message
})

export const RESET_ERROR = 'RESET_ERROR'
export const resetError = () => ({
  type: RESET_ERROR
})

export const errorOccurred = message => async dispatch => {
  dispatch(setError(message))
  await delay(1500)
  dispatch(resetError())
}