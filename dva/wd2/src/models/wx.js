import { fetchOpenID } from '@/services/wx-auth'

export default {
  namespace: 'wx',

  state: {
    openID: '123'
  },

  effects: {
    *fetch({ payload }, { select, call, put }) {
      const key = 'ks20slsid820-dslru4w-erjh'
      const json = window.localStorage.getItem(key)
      let openID = json ? JSON.parse(json) : ''
      if (!openID) {
        openID = yield call(fetchOpenID)
      }
      yield put({ type: 'setLocal', openID })
      return openID
    }
  },

  reducers: {
    setLocal(state, { openID = '123' }) {
      return { openID }
    }
  },

  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'fetch' })
    }
  }
}
