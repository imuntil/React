import { fetchCoupons } from '../services'
export default {
  namespace: 'coupon',

  state: {
    list: []
  },

  effects: {
    *fetchCoupons({ status }, { call, put, select }) {
      const { userID, phone } = yield select(state => state.user)
      console.log('x')
      const { data, fail } = yield call(fetchCoupons, { userID, phone, status })
      if (!data) {
        throw new Error((fail && fail.msg) || '出错了，请稍后重试')
      }
      yield put({ type: 'setCoupons', result: data.result })
    }
  },

  reducers: {
    setCoupons(state, { result }) {
      return { ...state, list: result }
    }
  },

  subscriptions: {
    setup({ history, dispatch }) {
      history.listen(({ pathname }) => {
        if (pathname === '/user/coupon') {
          dispatch({ type: 'fetchCoupons', status: 0 })
        }
      })
    }
  }
}
