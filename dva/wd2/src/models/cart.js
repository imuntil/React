import {
  fetchUserC,
  deleteCartPro,
  updateCartNum,
  addToCart
} from '../services'
import { delay } from '@/utils/cts'

/**
 *  两种情况
 *  a: 在cart page 修改cart数据
 *  b: 在其他页面修改cart数据
 *  a情况直接修改redux，针对b情况
 *  可以分为b-1: 已经获取过cart，b-2：还没有获取过cart数据（即没有打开过cart页面，直接在其他页面添加购物车）
 *  针对b-1：
 *    只修改expired，其他数据不变。当进入cart page时，统一从服务器拉取新数据
 *  针对b-2：
 *    因为没有cart 数据，所以什么都不做。 待进入cart page时，统一从服务器拉取全部数据
 *
 *  同时，b情况下，为保证chosen不被重置，所以讲chosen单独提出, chooseStatus
 */

export default {
  namespace: 'cart',

  state: {
    // id list
    list: [],
    // id key dic
    dic: {},
    // 是否过期
    expired: true
  },

  effects: {
    *fetch({ payload }, { call, put, select }) {
      const { expired } = yield select(state => state.cart)
      if (!expired) return
      const { userID } = yield select(state => state.user)
      const { fail, data } = yield call(fetchUserC, { userID, flag: 1 })
      if (fail && fail.msg === '该用户购物车为空！') {
        yield put({ type: 'setCart', res: [] })
        return
      }
      if (!data) {
        throw new Error((fail && fail.msg) || '出错了，请稍后重试')
      }
      yield put({ type: 'setCart', res: data.result })
    },
    *delCartPro({ payload }, { call, put, select }) {
      const { index, cid } = payload
      // const { data, fail } = yield call(deleteCartPro, { cid })
      // if (!data) {
      //   throw new Error((fail && fail.msg) || '出错了，请稍后重试')
      // }
      yield put({ type: 'delPro', index })
      return true
    },
    /* 修改商品数量 */
    *modifyCartNum({ payload }, { call, select, put }) {
      const { proID, value } = payload
      const { cid, pronum } = yield select(state => state.cart.dic[proID])
      if (+pronum === +value) return
      yield put({ type: 'updateNum', proID, value })
      yield put({ type: 'updateServerNum', cid, value })
    },
    updateServerNum: [
      function*({ cid, value }, { call, select, put }) {
        yield call(delay, 1000)
        yield call(updateCartNum, { cid, num: value })
      },
      { type: 'takeLatest' }
    ],
    /* 添加商品 */
    *addToCart({ proID }, { call, select, put }) {
      const { userID } = yield select(state => state.user)
      const { data, fail } = yield call(addToCart, { proID, userID })
      if (data || (fail && fail.msg === '添加失败!或者改商品已经在购物车。')) {
        yield put({ type: 'setLocalExpired' })
        return true
      }
      throw new Error((fail && fail.msg) || '出错了，请稍后再试')
    }
  },

  reducers: {
    setCart(state, { res }) {
      const preDic = state.dic
      const dic = {}
      const list = res.map(({ cid, proid, pronum }) => {
        const p = preDic[proid] || {}
        dic[proid] = { cid, pronum, checked: p.checked || false }
        return proid
      })
      return { ...state, dic, list, expired: false }
    },
    delPro(state, { index }) {
      const { list, dic } = state
      const id = list[index]
      const newDic = { ...dic }
      delete newDic[id]
      return {
        ...state,
        list: [...list.slice(0, index), ...list.slice(index + 1)],
        dic: newDic
      }
    },
    toggleSelected(state, { id, checked }) {
      const dic = state.dic
      const pro = dic[id]
      return {
        ...state,
        dic: {
          ...dic,
          [id]: { ...pro, checked }
        }
      }
    },
    toggleSelectedAll(state, { checked }) {
      const { list, dic } = state
      const newDic = {}
      list.forEach(v => {
        newDic[v] = { ...dic[v], checked }
      })
      return { ...state, dic: newDic }
    },
    updateNum(state, { proID, value }) {
      const dic = state.dic
      const pro = { ...dic[proID], pronum: value }
      return {
        ...state,
        dic: { ...dic, [proID]: pro }
      }
    },
    setLocalExpired(state) {
      return {
        ...state,
        expired: true
      }
    }
  }
}
