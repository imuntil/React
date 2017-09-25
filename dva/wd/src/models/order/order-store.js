import { normalize, schema } from 'normalizr'
import { fetchAllOrders } from '../../services/user'
import { normalizes } from '../../services/tools-fun'

export default {
  namespace: 'order-store',
  state: {
    list: {},
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
      const { expired } = yield select(state => state['order-store'])
      if (!expired) return false
      const { data = {}, err } = yield call(fetchAllOrders, { userid: usersid })
      if (err || +data.resultcode !== 1) {
        yield put({
          type: 'error/fetchDataError',
          payload: { msg: '获取订单失败了-,-', code: data.resultcode || -10 }
        })
        return false
      }
      const { idList, list } = normalizes(data.result)
      const toPay = [], toReceive = []
      data.result.forEach(({ orderstatus, id }) => {
        if (+orderstatus === 3) {
          toReceive.push(id)
        } else if (+orderstatus === 0) {
          toPay.push(id)
        }
      })
      yield put({
        type: 'saveOrders',
        payload: { list, all: idList, toPay, toReceive, expired: false }
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
