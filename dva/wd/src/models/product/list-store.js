import _ from 'lodash'
import { fetchAllPros } from '../../services/product'
import { schema, normalize } from 'normalizr'

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
      const { code, data: res } = data
      if (err || +code !== 0) {
        yield put({
          type: 'error/fetchDataError',
          payload: { msg: '获取列表失败', code: +code || -100 }
        })
      } else {
        const s = new schema.Entity('list', undefined, {
          idAttribute: value => value.sku
        })
        const { result: idList, entities: { list } } = normalize(res, [s])
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
