import {
  watchGetNewsDetail,
  watchGetNewsList
} from './news'
import {
  watchGetProDetail,
  watchGetProsList
} from './products'
import {fork} from 'redux-saga/effects'

export default function * root () {
  yield fork(watchGetProsList)
  yield fork(watchGetProDetail)
  yield fork(watchGetNewsList)
  yield fork(watchGetNewsDetail)
}