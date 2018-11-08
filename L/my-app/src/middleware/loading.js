import { loadingStart, loadingEnd } from '@/actions/loading-actions'
const REQUEST_ = 'REQUEST_'
const RECEIVE_ = 'RECEIVE_'

const getName = (type, pre) => `loading@${type.replace(pre, '')}`

export const loading = store => next => action => {
  const type = action.type
  type.startsWith(REQUEST_) && next(loadingStart(getName(type, REQUEST_)))
  type.startsWith(RECEIVE_) && next(loadingEnd(getName(type, RECEIVE_)))
  return next(action)
}
