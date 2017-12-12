import * as api from '../../services/product'
import { delay } from '../../services/tools-fun'

function copy(obj) {
  return { ...obj }
}
export default {
  namespace: 'detail',
  state: {
    current: null,
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
    *fetchMaybe({ payload: { type, sku } }, { call, put }) {
      const { err, data = {} } = yield call(api.fetchMaybe, { type, sku })
      const { code, data: res } = data
      if (err || +code !== 0) {
        yield put({
          type: 'error/fetchDataError',
          payload: { msg: `获取'猜你喜欢'失败`, code: +code || -100 }
        })
      } else {
        yield put({ type: 'save', payload: { maybe: res.map(item => item.sku) } })
      }
    },
    *fetchDetail({ payload }, { put, select, call }) {
      const store = yield select(state => state['list-store'])
      const able = payload.every(item => store[item])
      if (able) {
        yield call(delay, 100)
        const [i, j, k] = payload
        yield [
          put({
            type: 'save',
            payload: { current: i, must: [j, k] }
          }),
          put({
            type: 'fetchMaybe',
            payload: { type: store[i]._type, sku: i }
          })
        ]
      } else {
        yield put({
          type: 'list-store/fillStore',
          payload: { ids: payload }
        })
      }
    },
    *setCurrentAndMust({ payload: { ids } }, { put, select }) {
      const store = yield select(state => state['list-store'])
      const [i, j, k] = ids
      const current = copy(store[i])
      yield [
        put({
          type: 'save',
          payload: { current: i, must: [j, k] }
        }),
        put({
          type: 'fetchMaybe',
          payload: { type: current._type, sku: i }
        })
      ]
    }
  },
  subscriptions: {}
}
