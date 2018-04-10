import { fetchAdrList, toggleDefaultAdr, delAdr } from '@/services'
import { delay } from '@/utils/cts'

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
    *toggleDefault({ payload }, { call, put, select }) {
      const { userID } = yield select(state => state.user)
      const { data } = yield call(toggleDefaultAdr, { userID, id: payload.id })
      yield call(delay, 500)
      if (!data) {
        throw new Error('更新失败了，请稍后再试')
      }
      yield put({ type: 'setDefault', ...payload })
    },
    *delServerAdr({ payload }, { call, put, select }) {
      const { id } = payload
      const { list } = yield select(state => state.adr)
      if (list.indexOf(id) === -1) return
      const { data } = yield call(delAdr, id)
      if (!data) {
        throw new Error('删除失败了，请稍后再试')
      }
      yield call(delay, 500)
      yield put({ type: 'delAdr', ...payload })
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
    setDefault(state, { id }) {
      const { defaultID, dic } = state
      const oldDefault = { ...dic[defaultID], status: 0 }
      const newDefault = { ...dic[id], status: 1 }
      return {
        ...state,
        defaultID: id,
        dic: { ...dic, [id]: newDefault, [defaultID]: oldDefault }
      }
    },
    delAdr(state, { id }) {
      const { defaultID, list, dic } = state
      const index = list.indexOf(id)
      const newList = [...list.slice(0, index), ...list.slice(index + 1)]
      // 如果删除的地址是默认地址，将第一个设为默认
      const newDefaultID = defaultID === id ? newList[0] : defaultID
      const newDic = { ...dic }
      delete newDic[id]
      return { defaultID: newDefaultID, list: newList, dic: newDic }
    }
  }
}
