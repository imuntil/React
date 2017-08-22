import { take, put, call, fork, takeEvery, all } from 'redux-saga/effects'
import { api } from '../services'
import * as actions from '../actions'

export function * getPageTopics() {
  try {
    const topics = yield call(api.getPageTopics)
    yield put(actions.receiveTopics(topics))
  } catch (err) {
    console.log(err);
  }
}

export function * watchGetPageTopics() {
  yield takeEvery(actions.GET_PAGE_TOPICS, getPageTopics)
}

export default function * root () {
  yield all([
    fork(getPageTopics),
    fork(watchGetPageTopics)
  ])
}