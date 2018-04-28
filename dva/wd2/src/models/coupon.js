import { fetchCoupons } from '../services'
export default {
  namespace: 'coupon',

  state: {},

  effects: {
    *fetchCoupons({ status }, { call, put, select }) {
      const { userID, phone } = yield select(state => state.user)
      console.log('x')
      const res = yield call(fetchCoupons, { userID, phone, status })
      console.log(res)
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
