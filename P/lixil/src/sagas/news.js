import {
  take, put, call, fork, select, takeEvery, all, takeLatest
} from 'redux-saga/effects'
import * as actions from '../actions'
import api from '../service'

export function * getAllNews() {
  try {
    const res = yield call(api.fetchNewsList)
    yield put(actions.receiveNewsList(res.result || []))
  } catch (e) {
    console.log(e);
  }
}
export function * getNewsDetail({newsId}) {
  try {
    const res = yield call(api.fetchNewsDetail, newsId)
    if (res.resultcode !== 1)
      throw 'something wrong'
    yield put(actions.receiveNewsDetail(res.result))
  } catch (e) {
    console.log(e);
  }
}
export function * watchGetNewsList() {
  yield takeLatest(actions.REQUEST_NEWS_LIST, getAllNews)
}
export function * watchGetNewsDetail() {
  yield takeLatest(actions.REQUEST_NEWS_DETAIL, getNewsDetail)
}

// export default function * root () {
//   yield fork(watchGetNewsList)
//   yield fork(watchGetNewsDetail)
// }
