import _ from 'lodash'
import * as api from '../../services/product'
import { ALL_PRO_PER_PAGE } from '../../constant'

export default {
  namespace: 'product-filter',
  state: {
    lists: [],
    page: null,
    // currentList
    cls: [],
    total: null,
    hasMore: true,
    params: {}
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
    *fetchFilter({ payload: { params } }, { call, put, select }) {
      const preParams = yield select(state => state['product-filter'].params)
      // 如果查询条件没有变，则不请求服务器
      if (_.isEqual(preParams, params)) return true
      // 查询条件变化，重置lvState b
      const { data } = yield call(api.fetchFilerPros, { ...params })
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
            hasMore: true,
            params
          }
        })
      }
    }
  },
  subscriptions: {
  },
};
