import _ from 'lodash'
import * as api from '../../services/product'
import { ALL_PRO_PER_PAGE } from '../../constant'
import { normalizes } from '../../services/tools-fun'

export default {
  namespace: 'product-filter',
  state: {
    idList: [],
    page: null,
    // currentList
    cls: [],
    total: null,
    hasMore: true,
    fetching: true
  },
  reducers: {
    saveList(state, action) {
      const { idList, cls, page, total, hasMore } = action.payload
      return {
        ...state,
        idList: [...idList] ,
        cls: [...cls] ,
        page,
        total,
        hasMore
      }
    },
    updateCLs(state, action) {
      const { idList, total } = state
      const { page } = action.payload
      return {
        ...state,
        oth: {
          page,
          cls: idList.slice(0, (page + 1) * ALL_PRO_PER_PAGE),
          hasMore: total > page
        }
      }
    },
    toggleFetching(state, action) {
      return {
        ...state,
        fetching: action.payload
      }
    }
  },
  effects: {
    *fetchFilter({ payload: { params } }, { call, put }) {
      yield put({
        type: 'toggleFetching',
        payload: true
      })
      console.log('xxxxxxxxxxxx');
      // 查询条件变化，重置lvState b
      // 更新filter-params
      yield put({
        type: 'filter-params/update',
        payload: {
          ...params
        }
      })
      // 请求服务器获取新的数据
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
        const { idList, list } = normalizes(res)
        yield [
          put({
            type: 'saveList',
            payload: {
              idList,
              page: 0,
              cls: idList.slice(0, ALL_PRO_PER_PAGE),
              total: Math.ceil(idList.length / ALL_PRO_PER_PAGE) - 1,
              hasMore: true
            }
          }),
          put({
            type: 'list-store/add',
            payload: {
              ...list
            }
          })
        ]
        yield put({
          type: 'toggleFetching',
          payload: false
        })
      }
    }
  },
  subscriptions: {
  },
};

