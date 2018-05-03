import { fetchCoupons } from '../services'
export default {
  namespace: 'coupon',

  state: {
    unUseList: [],
    usedList: [],
    expired: [1, 1]
  },

  effects: {
    *fetchCoupons({ status }, { call, put, select }) {

      const { expired } = yield select(state => state.coupon)
      if (!expired[status]) {
        // 存在未过期的数据
        return
      }
      const { userID, phone } = yield select(state => state.user)
      const { data, fail } = yield call(fetchCoupons, { userID, phone, status })
      if (!data) {
        throw new Error((fail && fail.msg) || '出错了，请稍后重试')
      }
      yield put({ type: 'setCoupons', result: data.result, status })
    }
  },

  reducers: {
    setCoupons(state, { result, status }) {
      const [x, y] = [...state.expired]
      const expired = status ? [x, 0] : [0, y]
      return { ...state, [status ? 'usedList' : 'unUseList']: result, expired }
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
