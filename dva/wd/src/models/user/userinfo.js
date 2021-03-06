import { zStorage } from '../../services/ct'
import { USER_INFO_KEY } from '../../constant'

export default {
  namespace: 'user-info',
  state: {
    avatar: '',
    nick: '',
    openid: '',
    phone: '',
    uid: '',
    rank: '',
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
          avatar: '',
          nick: '',
          openid: '',
          phone: '',
          uid: '',
          rank: '',
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
