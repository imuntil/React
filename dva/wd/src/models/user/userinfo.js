import { zStorage } from '../../services/ct'
import { USER_INFO_KEY } from '../../constant'

export default {
  namespace: 'user-info',
  state: {
    imgname: '',
    name: '',
    openid: '',
    phone: '',
    usersid: '',
    black: 0,
    rank: '',
    password: '',
    expired: false
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload
      }
    }
  },
  effects: {
    *saveToLocal({ payload }, { put, call, select }) {
      yield put({
        type: 'save',
        payload
      })
      const user = yield select(state => state['user-info'])
      yield call(zStorage.putValue, USER_INFO_KEY, user)
    },
    *getFromLocal(empty, { put, call, select }) {
      const { usersid } = yield select(state => state['user-info'])
      if (!usersid) {
        const user = yield call(zStorage.getValue, USER_INFO_KEY)
        yield put({
          type: 'save',
          payload: user
        })
      }
    },
    *logout(n, { put, call }) {
      yield put({
        type: 'save',
        payload: {
          imgname: '',
          name: '',
          openid: '',
          phone: '',
          usersid: '',
          black: 0,
          rank: '',
          password: '',
          expired: false
        }
      })
      yield call(zStorage.remove, USER_INFO_KEY)
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(() => {
        dispatch({ type: 'getFromLocal' })
      })
    }
  },
};
