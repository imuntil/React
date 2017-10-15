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
    *fillStore({ payload = {} }, { call, put }) {
      const { data } = yield call(fetchAllPros, {})
      const { resultcode, result: res } = data
      if (+resultcode !== 1) {
        yield put({
          type: 'error/fetchDataError',
          payload: {
            msg: '获取列表失败'
          }
        })
      } else {
        const { list, idList } = normalizes(res)
        yield put({
          type: 'add',
          payload: {
            ...list
          }
        })
        const { ids, all, filter } = payload
        if (ids) {
          yield put({
            type: 'detail/setCurrentAndMust',
            payload: {
              ids
            }
          })
        } else if (all) {
          yield put({
            type: 'product-all/setStateData',
            payload: {
              idList
            }
          })
        }
      }
    }
  },
  subscriptions: {},
};
