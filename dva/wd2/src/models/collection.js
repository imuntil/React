import { fetchUserC, deleteUserC } from '../services'
import { delay } from '../utils/cts'

export default {
  namespace: 'col',

  state: {
    // id array
    list: [],
    // id 为 key 的列表
    dic: {},
    // 过期
    expired: true
  },

  effects: {
    *fetchCol({ payload }, { call, select, put }) {
      const { expired } = yield select(state => state.col)
      if (!expired) return
      const { userID } = yield select(state => state.user)
      const { data, fail } = yield call(fetchUserC, { userID })
      if (!data) {
        throw new Error((fail && fail.msg) || '出错了，请稍后再试')
      }
      yield put({ type: 'setCol', cols: data.result })
      return true
    },
    *deleteServerCol ({ payload }, { call, select, put }) {
      console.table(payload)
      const { index } = payload
      const { userID } = yield select(state => state.user)
      const proID = yield select(state => state.col.list[index])
      // const { data, fail } = yield call(deleteUserC, { proID, userID })
      // if (!data) {
      //   throw new Error((fail && fail.msg) || '出错了，请稍后再试')
      // }
      yield call(delay, 250)
      yield put({ type: 'deleteCol', index, proID })
      return true
    }
  },

  reducers: {
    setCol(state, { cols }) {
      const dic = {}
      cols.forEach(v => {
        dic[v.proid] = v
      })
      return { ...state, dic, list: Object.keys(dic), expired: false }
    },
    deleteCol(state, { index, proID }) {
      const list = state.list
      const dic = { ...state.dic }
      delete dic[proID]
      return {
        ...state,
        dic,
        list: [...list.slice(0, index), ...list.slice(index + 1)]
      }
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {
      if (history.location.pathname === '/user/col') {
        dispatch({ type: 'fetchCol' })
      }
    }
  }
}
