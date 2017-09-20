import _ from 'lodash'
import { fetchCollectionList, addOrDelCollection } from '../services/user'
import { normalizes, delay } from '../services/tools-fun'

/**
 * state为用户收藏产品的id数组，当用户处于登录状态时，
 * 在《产品详情页》以及《我的收藏页》会直接获取用户的收藏列表，
 * 而不是针对单个产品的查询
 */
export default {
  namespace: 'collection',
  state: [],
  reducers: {
    setCollection(state, action) {
      return [...action.payload]
    },
    add2Col(state, action) {
      const { id } = action.payload
      if (state.indexOf(id) > -1) return state
      return state.concat(+id)
    },
    delFromCol(state, action) {
      const { id } = action.payload
      const index = state.indexOf(+id)
      if (index === -1) return state
      return [...state.slice(0, index), ...state.slice(index + 1)]
    }
  },
  effects: {
    *fetchCollectionList({ payload }, { call, put, select }) {
      const cl = yield select(state => state.collection)
      if (cl && cl.length) return false
      const { usersid } = yield select(state => state['user-info'])
      if (!usersid) {
        return false
      }
      const { data = {}, err } = yield call(fetchCollectionList, { userid: usersid })
      if (err || !_.isArray(data.result)) {
        yield put({
          type: 'error/fetchDataError',
          payload: { msg: '获取收藏信息失败-。-' }
        })
        return false
      }
      const res = data.result
      let idList = ['null']
      if (res.length) {
        idList = normalizes(data.result).idList
      }
      yield put({
        type: 'setCollection',
        payload: [...idList]
      })
    },
    toggleLike: [
      function* ({ payload }, { call, select, put }) {
        const { id, currentStatus } = payload
        const { usersid: userid } = yield select(state => state['user-info'])
        const { data = {}, err } =
          yield call(addOrDelCollection, { userid, id, type: currentStatus ? 'del' : 'add' })
        if (err || +data.resultcode !== 1) {
          yield put({
            type: 'error/dataOperationError',
            payload: { msg: '添加或删除收藏失败-、-', code: data.resultcode || -10 }
          })
        } else {
          const type = currentStatus ? 'delFromCol' : 'add2Col'
          yield put({
            type, payload: { id }
          })
        }
      },
      { type: 'throttle', ms: 1000 }
    ]
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(() => {
        dispatch({ type: 'fetchCollectionList' })
      })
    }
  },
};
