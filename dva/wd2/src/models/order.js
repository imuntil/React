import { placeOrder, deleteCartPro } from '../services'

// import __pick from 'lodash.pick'
export default {
  namespace: 'order',

  state: {
    // 产品 id 列表
    list: ['102'],
    // 来源，来自购物车或者来自立即购买
    fromCart: false,
    // 详情
    detail: {
      // 102: 1
    }
  },

  effects: {
    *placeOrder({ adr, code, express }, { call, put, select, take }) {
      const { city, address, name, phone } = adr
      const { userID, openID } = yield select(state => state.user)
      const { detail, fromCart, list } = yield select(state => state.order)
      const order = {
        userid: userID,
        prolist: Object.keys(detail).join('-'),
        pronumlist: Object.values(detail).join('-'),
        orderaddress: city + address,
        orderphone: phone,
        express,
        consognee: name,
        code,
        Openid: openID
      }
      // 下单
      const { data, fail } = yield call(placeOrder, order)
      if (!data) {
        throw new Error((fail && fail.msg) || '出错了，请稍后再试')
      }
      // 删除购物车中商品
      if (fromCart) {
        yield put({ type: 'cart/clearCart', ids: [...list] })
        // 阻塞
        yield take('cart/clearCart/@@end');
      }
      // 返回订单号
      return data.result
    }
  },

  reducers: {
    setLocal(state, { fromCart, detail }) {
      return { ...state, fromCart, detail, list: Object.keys(detail) }
    },
    updateCountLocal(state, { proID, num }) {
      return { ...state, detail: { ...state.detail, [proID]: num } }
    }
  }
}
