import { normalize, schema } from 'normalizr'
import { fetchAllOrders } from '../services/user'

export default {
  namespace: 'orders',
  state: {
    all: [],
    toPay: [],
    toReceive: [],
    expired: true
  },
  reducers: {
    saveOrders(state, action) {
      return {
        ...action.payload
      }
    },
    toExpire(state, action) {
      return {
        ...state,
        expired: true
      }
    }
  },
  effects: {
    *fetchOrderList({ payload }, { select, call, put }) {
      const { usersid } = yield select(state => state['user-info'])
      if (!usersid) {
        yield put({ type: 'error/userNotLogin' })
        return false
      }
      const { expired } = yield select(state => state.orders)
      if (!expired) return false
      const { data = {}, err } = yield call(fetchAllOrders, { userid: usersid })
      if (err || +data.resultcode !== 1) {
        yield put({
          type: 'error/fetchDataError',
          payload: { msg: '获取订单失败了-,-', code: data.resultcode || -10 }
        })
        return false
      }
      const all = data.result
      const toPay = all.filter(({ orderstatus }) => +orderstatus === 0)
      const toReceive = all.filter(({ orderstatus }) => +orderstatus === 3)
      yield put({
        type: 'saveOrders',
        payload: { all, toPay, toReceive, expired: false }
      })
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(() => {
        dispatch({ type: 'fetchOrderList' })
      })
    }
  },
};
