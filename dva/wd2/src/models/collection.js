import { fetchUserC, deleteUserC, toggleLike } from '../services'
import { delay } from '../utils/cts'

export default {
  namespace: 'col',

  state: {
    // id array
    list: [],
    // 过期
    expired: true
  },

  effects: {
    *fetchCol({ payload }, { call, select, put }) {
      const { expired } = yield select(state => state.col)
      if (!expired) return
      const { userID } = yield select(state => state.user)
      const { data, fail } = yield call(fetchUserC, { userID })
      if (!data) {
        throw new Error((fail && fail.msg) || '出错了，请稍后再试')
      }
      yield put({ type: 'setCol', cols: data.result })
      return true
    },
    toggleServerLike: [
      function*({ payload }, { call, put, select }) {
        const { status, proID } = payload
        const { userID } = yield select(state => state.user)
        const { data, fail } = yield call(toggleLike, {
          proID,
          userID,
          nextStatus: !status
        })
        if (!data) {
          throw new Error((fail && fail.msg) || '出错了，请稍后再试')
        }
        yield put({
          type: 'toggleLike',
          proID,
          currentStatus: status
        })
      },
      { type: 'throttle', ms: 2000 }
    ]
  },

  reducers: {
    setCol(state, { cols }) {
      return { ...state, list: cols.map(v => v.id.toString()), expired: false }
    },
    toggleLike(state, { proID, currentStatus }) {
      const list = state.list
      if (currentStatus) {
        const index = list.indexOf(proID)
        return {
          ...state,
          list: [...list.slice(0, index), ...list.slice(index + 1)]
        }
      }
      return {
        ...state,
        list: [proID, ...list]
      }
    }
  },

  subscriptions: {
    setup({ history, dispatch }) {
      history.listen(({ pathname }) => {
        if (pathname === '/user/col' || /\/pro\/\d+/.test(pathname)) {
          dispatch({ type: 'fetchCol' })
        }
      })
    }
  }
}
