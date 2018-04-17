import { fetchProducts } from '../services'
import { delay } from '../utils/cts'

export default {
  namespace: 'product',

  state: {
    // 所有产品数组
    list: [],
    // 以 id 为 key 的产品列表
    dic: {},
    // 当前页
    currentIndex: 1,
    // 每页量
    perPage: 8,
    // 总页数
    totalPage: 0
  },

  effects: {
    *fetch({ payload }, { call, put, select }) {
      const { list } = yield select(state => state.product)
      if (list && list.length) return
      const { data, err, fail } = yield call(fetchProducts)
      if ((err, fail)) {
        // fetch failed
        return
      }
      const { result } = data
      yield put({ type: 'saveAll', payload: result })
      return
    },
    *loadMore({ payload }, { call, select, put }) {
      let { currentIndex, totalPage } = yield select(state => state.product)
      if (currentIndex >= totalPage) return
      yield call(delay, 500)
      yield put({ type: 'updateIndex', currentIndex: ++currentIndex })
    }
  },

  reducers: {
    saveAll(state, { payload }) {
      const { perPage } = state
      const data = {}
      payload.forEach(v => {
        data[v.id] = v
      })
      return {
        ...state,
        list: payload,
        dic: data,
        totalPage: Math.ceil(payload.length / perPage)
      }
    },
    updateIndex(state, { currentIndex }) {
      return {
        ...state,
        currentIndex
      }
    }
  },

  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'fetch' })
    }
  }
}
