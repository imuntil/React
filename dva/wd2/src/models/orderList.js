import __pick from 'lodash.pick'
import { fetchOrderList } from '../services'

export default {
  namespace: 'orderList',

  state: {
    list: [],
    dic: {},
    expired: true
  },

  effects: {
    *fetch({ payload }, { call, select, put }) {
      const { expired } = yield select(state => state.orderList)
      if (!expired) return
      const { userID } = yield select(state => state.user)
      const { data, fail } = yield call(fetchOrderList, { userID })
      if (!data) {
        throw new Error((fail && fail.msg) || '出错了,请稍后再试')
      }
      yield put({ type: 'setOrder', res: data.result })
    }
  },

  reducers: {
    setOrder(state, { res }) {
      const dic = {}
      const list = res.map(({ products = [], ...v }) => {
        const p = products.map(({ proprice, discountprice, ...x }) => {
          const newX = __pick(x, [
            'cid',
            'coupon',
            'englishname',
            'id',
            'image1',
            'num',
            'postagefree',
            'price',
            'procontent',
            'proname',
            'proweight'
          ])
          let [wasSale, realPrice] = [false, proprice]
          if (discountprice && discountprice < proprice) {
            wasSale = true
            realPrice = discountprice
          }
          return { ...newX, wasSale, realPrice }
        })
        dic[v.ordernum] = { ...v, products: p }
        return v.ordernum
      })
      return { ...state, list, dic, expired: false }
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (/^\/order\/[019]/.test(pathname)) {
          dispatch({ type: 'fetch' })
        }
      })
    }
  }
}
