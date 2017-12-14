import { normalize, schema } from 'normalizr'
import { fetchAllOrders } from '../../services/user'

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
      const { _id: uid } = yield select(state => state['user-info'])
      if (!uid) {
        yield put({ type: 'error/userNotLogin' })
        return false
      }
      const { expired } = yield select(state => state['order-store'])
      if (!expired) return false
      const { data = {}, err } = yield call(fetchAllOrders, { uid })
      if (err || +data.code !== 0) {
        yield put({
          type: 'error/fetchDataError',
          payload: { msg: '获取订单失败了-,-', code: data.code || -10 }
        })
        return false
      }
      console.log(data)
      const s = new schema.Entity('list', undefined, {
        idAttribute: v => v.orderNumber
      })
      const { result: idList, entities: { list } } = normalize(data.data, [s])
      const toPay = [], toReceive = []
      data.data.forEach(({ status, orderNumber }) => {
        if (+status === 2) {
          toReceive.push(orderNumber)
        } else if (+status === 0) {
          toPay.push(orderNumber)
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
