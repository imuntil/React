import { fetchUserC, deleteCartPro } from '../services'

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
    },
    *delCartPro({ payload }, { call, put, select }) {
      const { index, cid } = payload
      // const { data, fail } = yield call(deleteCartPro, { cid })
      // if (!data) {
      //   throw new Error((fail && fail.msg) || '出错了，请稍后重试')
      // }
      yield put({ type: 'delPro', index })
      return true
    }
  },

  reducers: {
    setCart(state, { res }) {
      const dic = {}
      const list = res.map(v => {
        dic[v.proid] = { ...v, checked: false }
        return v.proid
      })
      return { ...state, dic, list, expired: false }
    },
    delPro(state, { index }) {
      const { list, dic } = state
      const id = list[index]
      const newDic = { ...dic }
      delete newDic[id]
      return {
        ...state,
        list: [...list.slice(0, index), ...list.slice(index + 1)],
        dic: newDic
      }
    },
    toggleSelected(state, { id, checked }) {
      const dic = state.dic
      const pro = dic[id]
      return {
        ...state,
        dic: {
          ...dic,
          [id]: { ...pro, checked }
        }
      }
    }
  }
}
