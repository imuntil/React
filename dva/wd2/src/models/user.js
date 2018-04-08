import { login } from '@/services'
export default {
  namespace: 'user',
  state: {
    openID: '',
    phone: '',
    nick: '',
    userID: '',
    avatar: ''
  },
  effects: {
    *login ({ payload }, { call, put }) {
      const { data, fail, err } = yield call(login, payload)
      if (err || fail) {
        return err || fail
      }
      yield put({ type: 'setUser', payload: data.result })
    }
  },
  
  reducers: {
    setUser (state, { payload }) {
      const { name: nick, imgname: avatar, phone, usersid: userID } = payload
      // x
    }
  }
}