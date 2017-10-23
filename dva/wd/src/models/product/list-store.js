import _ from 'lodash'
import { fetchAllPros } from '../../services/product'
import { normalizes } from '../../services/tools-fun'

export default {
  namespace: 'list-store',
  state: {},
  reducers: {
    add(state, action) {
      return {
        ...state,
        ...action.payload
      }
    }
  },
  effects: {
    *fillStore({ payload = {} }, { call, put, select }) {
      const store = yield select(state => state['list-store'])
      if (!_.isEmpty(store)) return true
      const { err, data } = yield call(fetchAllPros, {})
      const { resultcode, result: res } = data
      if (err || +resultcode !== 1) {
        yield put({
          type: 'error/fetchDataError',
          payload: { msg: '获取列表失败', code: +resultcode || -100 }
        })
      } else {
        const { list, idList } = normalizes(res)
        yield put({ type: 'add', payload: { ...list } })
        const { ids, all } = payload
        if (ids) {
          yield put({
            type: 'detail/setCurrentAndMust',
            payload: { ids }
          })
        } else if (all) {
          yield put({
            type: 'product-all/setStateData',
            payload: { idList }
          })
        }
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/') {
          dispatch({ type: 'fillStore' })
        }
      })
    }
  },
};
