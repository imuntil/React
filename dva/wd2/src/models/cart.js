import { fetchUserC } from '../services'

export default {
  namespace: 'cart',

  state: {
    // id list
    list: [],
    // id key dic
    dic: {},
    // 是否过期
    expired: true
  },

  effects: {
    *fetch({ payload }, { call, put, select }) {
      const { expired } = yield select(state => state.cart)
      if (!expired) return
      const { userID } = yield select(state => state.user)
      const { fail, data } = yield call(fetchUserC, { userID, flag: 1 })
      if (!data) {
        throw new Error((fail && fail.msg) || '出错了，请稍后重试')
      }
      yield put({ type: 'setCart', res: data.result })
    }
  },

  reducers: {
    setCart(state, { res }) {
      const dic = {}
      const list = res.map(v => {
        dic[v.proid] = v
        return v.proid
      })
      return { ...state, dic, list, expired: false }
    }
  }
}
