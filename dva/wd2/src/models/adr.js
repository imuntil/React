import {
  fetchAdrList,
  toggleDefaultAdr,
  delAdr,
  addAdr,
  updateAdr
} from '@/services'
import { delay } from '@/utils/cts'

function sort(arr) {
  return arr.sort((a, b) => b.status - a.status || b.id - a.id)
}

export default {
  namespace: 'adr',

  state: {
    // 所有地址 id 数组
    list: [],
    // 以 id 为 key 的地址列表
    dic: {},
    // default adr id
    defaultID: null,
    // 是否过期
    expired: false,
    // 是否需要重新排序
    reSort: false
  },

  effects: {
    *fetchList({ payload }, { call, put, select }) {
      const { list, expired, reSort } = yield select(state => state.adr)
      const { userID } = yield select(state => state.user)
      if (list && list.length && !expired) {
        reSort && (yield put({ type: 'reSort' }))
        return
      }
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
      // const { data } = yield call(delAdr, id)
      // if (!data) {
      //   throw new Error('删除失败了，请稍后再试')
      // }
      yield call(delay, 500)
      yield put({ type: 'delAdr', ...payload })
    },
    *editAdr(
      {
        payload: { id, ...payload }
      },
      { call, put, select }
    ) {
      const { userID } = yield select(state => state.user)
      let res
      if (+id === -1) {
        res = yield call(addAdr, { ...payload, userid: userID })
      } else {
        res = yield call(updateAdr, { ...payload, id, userid: userID })
      }
      if (!res.data) {
        return false
      }
      yield put({ type: 'expiredStore' })
      return true
    }
  },

  reducers: {
    reSort(state) {
      const { dic } = state
      const list = sort(Object.values(dic)).map(v => v.id)
      return { ...state, list, reSort: false }
    },
    setState(state, { res }) {
      const dic = {}
      let defaultID = res[0].id
      // 排序。 默认，时间降序
      sort(res).forEach(v => {
        dic[v.id] = v
        v.status && (defaultID = v.id)
      })
      return {
        dic,
        list: res.map(v => v.id),
        defaultID,
        expired: false,
        reSort: false
      }
    },
    setDefault(state, { id }) {
      const { defaultID, dic } = state
      const newDefault = { ...dic[id], status: 1 }
      let oldDefault
      if (+id !== +defaultID) {
        oldDefault = { ...dic[defaultID], status: 0 }
      }
      const newDic = oldDefault
        ? {
            ...dic,
            [id]: newDefault,
            [defaultID]: oldDefault
          }
        : {
            ...dic,
            [id]: newDefault
          }
      // const list = sort(Object.values(newDic)).map(v => v.id)
      // 需要重新排序
      return {
        ...state,
        defaultID: id,
        dic: newDic,
        expired: false,
        reSort: true
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
      return { ...state, defaultID: newDefaultID, list: newList, dic: newDic }
    },
    expiredStore(state) {
      return { ...state, expired: true }
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (/^\/(adr|order)\/?$/.test(pathname)) {
          dispatch({ type: 'fetchList' })
        }
      })
    }
  }
}
