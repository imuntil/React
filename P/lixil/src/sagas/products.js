import {
  take, put, call, fork, takeLatest
} from 'redux-saga/effects'
import * as actions from '../actions'
import api from '../service'
import _ from 'lodash'

export function * getProsList({categoryId}) {
  try {
    const res = yield call(api.fetchProductsById, categoryId)
    if (res.resultcode !== 1) {
      throw 'error'
    }
    yield put(actions.receiveProducts({list: _.omit(res, 'resultcode'), categoryId}))
  } catch (e) {
    console.log(e);
  }
}
export function * getProDetail({proId}) {
  try {
    const res = yield call(api.fetchProductDetail, proId)
    if (res.resultcode !== 1) {
      throw 'something wrong'
    }
    yield put(actions.receiveProDetail(res.result))
  } catch (e) {
    console.log(e);
  }
}
export function * watchGetProsList() {
  yield takeLatest(actions.REQUEST_PROS_LIST, getProsList)
}
export function * watchGetProDetail() {
  yield takeLatest(actions.REQUEST_PRO_DETAIL, getProDetail)
}