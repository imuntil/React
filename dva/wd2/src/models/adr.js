import { fetchAdrList, toggleDefaultAdr } from '@/services'

export default {
  namespace: 'adr',

  state: {
    // 所有地址 id 数组
    list: [],
    // 以 id 为 key 的地址列表
    dic: {},
    // default adr id
    defaultID: null
  },

  effects: {
    *fetchList({ payload }, { call, put, select }) {
      const { list } = yield select(state => state.adr)
      const { userID } = yield select(state => state.user)
      if (list && list.length) return
      const { data, err, fail } = yield call(fetchAdrList, userID)
      if (err || fail) {
        throw new Error((fail && fail.msg) || '出做了，请稍后再试')
      }
      yield put({ type: 'setState', res: data.result })
    },
    *toggleDefault ({ payload }, { call, put, select }) {
      console.log(payload)
      const { userID } = yield select(state => state.user)
      const { data, err, fail } = yield call(toggleDefaultAdr, { userID, id: payload.id })
    }
  },

  reducers: {
    setState(state, { res }) {
      const dic = {}
      let defaultID = res[0].id
      res.forEach(v => {
        dic[v.id] = v
        v.status && (defaultID = v.id)
      })
      return { dic, list: res.map(v => v.id), defaultID }
    },
    setDefault (state, { id }) {
      const { defaultID, dic } = state
      const oldDefault = { ...dic[defaultID], status: 0 }
      const newDefault = { ...dic[id], status: 1 }
      return {
        ...state,
        defaultID: id,
        dic: { ...dic, [id]: newDefault, [defaultID]: oldDefault }
      }
    }
  }
}
