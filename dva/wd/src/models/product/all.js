import _ from 'lodash'
import { ALL_PRO_PER_PAGE } from '../../constant'
import { delay } from '../../services/tools-fun'

export default {
  namespace: 'product-all',
  state: {
    idList: [],
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
      const { idList, total } = state
      const { page } = action.payload
      return {
        ...state,
        page,
        cls: idList.slice(0, (page + 1) * ALL_PRO_PER_PAGE),
        hasMore: total - 1 > page
      }
    }
  },
  effects: {
    *fetchAll({ payload }, { put, select }) {
      const store = yield select(state => state['list-store'])
      if (_.isEmpty(store)) {
        yield put({ type: 'list-store/fillStore', payload: { all: true } })
        return false
      }
      const lists = yield select(state => state['product-all'].idList)
      if (lists && lists.length) return true
      const keys = Object.keys(store)
      yield put({ type: 'setStateData', payload: { idList: keys } })
    },
    *setStateData({ payload: { idList } }, { put, call }) {
      yield call(delay, 50)
      yield put({
        type: 'saveList',
        payload: {
          idList,
          page: 0,
          cls: idList.slice(0, ALL_PRO_PER_PAGE),
          total: Math.ceil(idList.length / ALL_PRO_PER_PAGE) - 1,
          hasMore: true
        }
      })
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
