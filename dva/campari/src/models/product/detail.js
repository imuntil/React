import _ from 'lodash'
import * as api from '../../services/product'

export default {
  namespace: 'detail',
  state: {

  },
  reducers: {
    save(state, action) {
      return {
        ...action.payload
      }
    }
  },
  effects: {
    *fetchDetail({ payload: { id } }, { call, put, select }) {
      const store = yield select(state => state['list-store'])
      const detail = store[id]
      if (detail) {
        yield put({
          type: 'save',
          payload: { ...detail }
        })
      } else {
        const { data } = yield call(api.fetchProDetail, { id })
        const { resultcode, result: res } = data
        if (+resultcode !== 1) {
          yield put({
            type: 'error/fetchDataError',
            payload: {
              msg: '获取产品信息失败'
            }
          })
        } else {
          yield put({
            type: 'save',
            payload: {
              ...res
            }
          })
        }
      }
    }
  },
  subscriptions: {
  }
}
