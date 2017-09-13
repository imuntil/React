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
    password: ''
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
    *saveToLocal({ payload }, { put, call }) {
      yield call(zStorage.putValue, USER_INFO_KEY, payload)
      yield put({
        type: 'save',
        payload
      })
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
