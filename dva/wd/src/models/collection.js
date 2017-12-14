import _ from 'lodash'
import { fetchCollectionList, addOrDelCollection } from '../services/user'
import { delay } from '../services/tools-fun'

/**
 * state为用户收藏产品的id数组，当用户处于登录状态时，
 * 在《产品详情页》以及《我的收藏页》会直接获取用户的收藏列表，
 * 而不是针对单个产品的查询
 */
export default {
  namespace: 'collection',
  state: [],
  reducers: {
    setCollection(state, action) {
      return [...action.payload]
    },
    add2Col(state, action) {
      const { sku } = action.payload
      if (state.indexOf(sku) > -1) return state
      return state.concat(sku)
    },
    delFromCol(state, action) {
      const { sku } = action.payload
      const index = state.indexOf(sku)
      if (index === -1) return state
      return [...state.slice(0, index), ...state.slice(index + 1)]
    }
  },
  effects: {
    *fetchCollectionList({ payload }, { call, put, select }) {
      const cl = yield select(state => state.collection)
      if (cl && cl.length) return false
      const { _id: uid } = yield select(state => state['user-info'])
      if (!uid) {
        return false
      }
      const { data = {}, err } = yield call(fetchCollectionList, { uid })
      if (err || !_.isArray(data.data)) {
        yield put({
          type: 'error/fetchDataError',
          payload: { msg: '获取收藏信息失败-。-' }
        })
        return false
      }
      const res = data.data
      let idList = []
      if (res.length) {
        idList = res.map(v => v.sku)
      }
      yield put({
        type: 'setCollection',
        payload: [...idList]
      })
    },
    toggleLike: [
      function* ({ payload }, { call, select, put }) {
        // yield put({ type: 'partLoading/startLoad' })
        const { sku, currentStatus } = payload
        const { _id: uid } = yield select(state => state['user-info'])
        const { data = {}, err } =
          yield call(addOrDelCollection, { uid, sku, type: currentStatus ? 'del' : 'add' })
        if (err || +data.code !== 0) {
          yield put({
            type: 'error/dataOperationError',
            payload: { msg: '添加或删除收藏失败-、-', code: data.code || -10 }
          })
        } else {
          const type = currentStatus ? 'delFromCol' : 'add2Col'
          yield put({
            type, payload: { sku }
          })
        }
        yield call(delay, 250)
        // yield put({ type: 'partLoading/loadEnd' })
      },
      { type: 'throttle', ms: 1000 }
    ]
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(() => {
        dispatch({ type: 'fetchCollectionList' })
      })
    }
  },
};
