import { login } from '@/services'
export default {
  namespace: 'user',
  state: {
    openID: '',
    phone: '',
    nick: '',
    userID: '',
    avatar: '',
    reg: {
      phone: '',
      code: ''
    }
  },
  effects: {
    *login({ payload }, { call, put }) {
      const { data, fail, err } = yield call(login, payload)
      if (err || fail) {
        return err || fail
      }
      yield put({ type: 'setUser', payload: data.result })
      return true
    }
  },

  reducers: {
    setUser(state, { payload }) {
      const { name: nick, imgname: avatar, phone, usersid: userID } = payload
      return {
        ...state,
        nick,
        avatar,
        phone,
        userID
      }
    },
    setReg (state, { payload }) {
      return {
        ...state,
        reg: { ...payload }
      }
    }
  }
}
