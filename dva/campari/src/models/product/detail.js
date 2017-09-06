import _ from 'lodash'
import * as api from '../../services/product'
import { delay } from '../../services/tools-fun'

function copy(obj) {
  return { ...obj }
}
export default {
  namespace: 'detail',
  state: {
    current: {},
    maybe: [],
    must: []
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload
      }
    }
  },
  effects: {
    *fetchMaybe({ payload: { type } }, { call, put, select }) {
      const { data } = yield call(api.fetchMaybe, { type })
      const { resultcode, result: res } = data
      if (+resultcode !== 1) {
        yield put({
          type: 'error/fetchDataError',
          payload: {
            msg: `获取'猜你喜欢'失败`
          }
        })
      } else {
        yield put({
          type: 'save',
          payload: {
            maybe: res
          }
        })
      }
    },
    *fetchDetail({ payload }, { put, select, call }) {
      const store = yield select(state => state['list-store'])
      const able = payload.every(item => store[item])
      if (able) {
        yield call(delay, 100)
        const [i, j, k] = payload
        yield put({
          type: 'save',
          payload: {
            current: copy(store[i]),
            must: [copy(store[j]), copy(store[k])]
          }
        })
      } else {
        yield put({
          type: 'list-store/fillStore',
          payload: {
            ids: payload
          }
        })
      }
    },
    *setCurrentAndMust({ payload: { ids } }, { put, select }) {
      const store = yield select(state => state['list-store'])
      const [i, j, k] = ids
      const current = copy(store[i])
      yield put({
        type: 'save',
        payload: {
          current,
          must: [copy(store[j]), copy(store[k])]
        }
      })
      yield put({
        type: 'fetchMaybe',
        payload: {
          type: current.prolabel
        }
      })
    }
  },
  subscriptions: {}
}
