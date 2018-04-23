import { login } from '@/services'
import { reduxKey } from '@/services/config'

export default {
  namespace: 'user',
  state: {
    openID: '',
    phone: '',
    nick: '',
    userID: '',
    avatar: '',
    ran: '',
    reg: {
      phone: '',
      code: ''
    }
  },
  effects: {
    *login({ payload }, { call, put, select }) {
      const { data, fail, err } = yield call(login, payload)
      if (err || fail) {
        return err || fail
      }
      const {
        name: nick,
        imgname: avatar,
        phone,
        usersid: userID
      } = data.result
      const { openID } = yield select(state => state.wx)
      console.log(openID)
      yield put({
        type: 'setUser',
        payload: { nick, avatar, phone, userID, ran: Math.random(), openID }
      })
      return true
    }
  },

  reducers: {
    setUser(state, { payload }) {
      const newState = { ...state, ...payload }
      delete newState.reg
      window.localStorage.setItem(reduxKey, JSON.stringify(newState))
      return { ...state, ...payload }
    },
    setReg(state, { payload }) {
      return {
        ...state,
        reg: { ...payload }
      }
    }
  },

  subscriptions: {
    setup({ dispatch }) {
      const redux = window.localStorage.getItem(reduxKey)
      if (redux) {
        const user = JSON.parse(redux)
        dispatch({ type: 'setUser', payload: user })
      }
    }
  }
}
