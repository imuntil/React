import _ from 'lodash'
import { fetchCart } from "../../services/cart";
import { fetchMaybe } from "../../services/product";
import { mustLikeIds } from '../../constant'

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
    store: [
    //  {id, cid, pronum, prolabel}
    ],
    expired: true,
    maybe: {
      type: null,
      ids: [...mustLikeIds]
    },
    chooseStatus: {}
  },
  reducers: {
    save(state, action) {
      const { maybe } = state
      return {
        maybe,
        ...action.payload,
        expired: false
      }
    },
    updateMaybe(state, { payload }) {
      const maybe = state.maybe
      const ids = [...payload.ids, ...maybe.ids]
      return {
        ...state,
        maybe: {
          type: payload.type,
          ids: [...new Set(ids)]
        }
      }
    }
  },
  effects: {
    *changeMaybe({ payload }, { call, put, select }) {
      const type = payload.type
      const ot = yield select(state => state.cart.maybe.type)
      if (type === ot) return false
      const { data: { result, resultcode }, err } = yield call(fetchMaybe, { type })
      if (err || +resultcode !== 1) {
        yield put({ type: 'error/fetchDataError', payload: { msg: `获取'猜你喜欢'失败`, code: resultcode || -10 } })
        return false
      }
      const ids = result.map(item => item.id)
      yield put({ type: 'updateMaybe', payload: { type, ids } })
    },
    *fetchCart({ payload }, { call, put, select }) {
      console.log(1);
      const { expired } = yield select(state => state.cart)
      if (!expired) return false
      const { usersid } = yield select(state => state['user-info'])
      const listStore = yield select(state => state['list-store'])
      if (_.isEmpty(listStore)) {
        yield put({ type: 'list-store/fillStore' })
      }
      const { data: { resultcode, result }, err } = yield call(fetchCart, { userid: usersid })
      if (err || (+resultcode !== 1 && +resultcode !== 0)) {
        yield put({
          type: 'error/fetchDataError',
          payload: { msg: '获取购物车失败', code: resultcode || -10 }
        })
        return false
      }
      // v
      if (+resultcode === 0) {
        yield put({ type: 'save' })
        return false
      }
      console.log(2);
      const store = result.map(item => _.pick(item, ['id', 'cid', 'pronum', 'prolabel']))
      console.log(store)
      yield [
        put({ type: 'save', payload: { store } }),
        put({ type: 'changeMaybe', payload: { type: store[0].prolabel } })
      ]
      console.log(3);
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/cart') {
          dispatch({ type: 'fetchCart' })
        }
      })
    }
  }
}
