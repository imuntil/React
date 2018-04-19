import __pick from 'lodash.pick'
export default {
  namespace: 'order',

  state: {
    // 产品 id 列表
    list: ['102'],
    // 来源，来自购物车或者来自立即购买
    fromCart: false,
    // 详情
    detail: {
      102: 1
    }
  },

  effects: {
    // *setOrder({ formCart, list }, { select, put }) {
    //   const { dic } = yield select(state => state.product)
    //   const detail = {}
    //   list.forEach(id => {
    //     detail[id] = { _num: 1 }
    //   })
    //   yield put({ type: 'setLocal', formCart, list, detail })
    // }
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
