// import _ from 'lodash'
import * as api from '../../services/product'
import { ALL_PRO_PER_PAGE } from '../../constant'

export default {
  namespace: 'product-all',
  state: {
    lists: [],
    page: null,
    // currentList
    cls: [],
    total: null,
    hasMore: true
  },
  reducers: {
    saveList(state, action) {
      return {
        ...state,
        ...action.payload
      }
    },
    updateCLs(state, action) {
      const { lists, total } = state
      const { page } = action.payload
      return {
        ...state,
        page,
        cls: lists.slice(0, (page + 1) * ALL_PRO_PER_PAGE),
        hasMore: total > page
      }
    }
  },
  effects: {
    *fetchAll({ payload }, { call, put, select }) {
      const lists = yield select(state => state['product-all'].lists)
      if (lists && lists.length) return true
      const { data } = yield call(api.fetchAllPros, { ...payload })
      const { resultcode, result: res } = data
      if (+resultcode !== 1) {
        yield put({
          type: 'error/fetchDataError',
          payload: {
            msg: '获取列表失败'
          }
        })
      } else {
        yield put({
          type: 'saveList',
          payload: {
            lists: res,
            page: 0,
            cls: res.slice(0, ALL_PRO_PER_PAGE),
            total: Math.ceil(res.length / ALL_PRO_PER_PAGE) - 1,
            hasMore: true
          }
        })
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/product/all') {
          dispatch({
            type: 'fetchAll',
            payload: { flag: 1, sort: 1 }
          })
        }
      })
    }
  },
};
