import { put, call, takeEvery } from 'redux-saga/effects'

export const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export function * incrementAsync() {
  yield call(delay, 1000)
  yield put({type: 'INCREMENT'})
}
export default function * rootSaga() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}