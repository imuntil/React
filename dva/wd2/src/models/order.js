import { fetchOrderList } from '../services'

export default {
  namespace: 'order',

  state: {
    list: [],
    dic: {},
    expired: true
  },

  effects: {
    *fetch({ payload }, { call, select, put }) {
      const { expired } = yield select(state => state.order)
      if (!expired) return
      const { userID } = yield select(state => state.user)
      const { data, fail } = yield call(fetchOrderList, { userID })
      if (!data) {
        throw new Error((fail && fail.msg) || '出错了,请稍后再试')
      }
      yield put({ type: 'setOrder', res: data.result })
    }
  },

  reducers: {
    setOrder(state, { res }) {
      const dic = {}
      const list = res.map(v => {
        dic[v.ordernum] = v
        return v.ordernum
      })
      return { ...state, list, dic, expired: false }
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (/^\/order\/[019]/.test(pathname)) {
          dispatch({ type: 'fetch' })
        }
      })
    }
  }
}
