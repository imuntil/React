import _ from 'lodash'
import { schema, normalize } from 'normalizr'
import { fetchCart, deleteProFromCart, updateCount, addProToCart } from "../../services/cart";
import { fetchMaybe } from "../../services/product";
import { mustLikeIds } from '../../constant'
import { delay } from "../../services/tools-fun";

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
    idList: [],
    pros: {
      //sku: {sku, cid, count, _type}
    },
    expired: true,
    maybe: {
      type: null,
      ids: [...mustLikeIds]
    },
    chooseStatus: {}
  },
  reducers: {
    save(state, action) {
      const { maybe, chooseStatus } = state
      return {
        maybe,
        chooseStatus,
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
    },
    delPro(state, action) {
      const { index, id } = action.payload
      const { idList, pros, chooseStatus } = state
      const ni = [...idList]
      ni.splice(index, 1)
      const np = { ...pros }
      delete np[id]
      const nc = { ...chooseStatus }
      delete nc[id]
      return {
        ...state,
        idList: ni,
        pros: np,
        chooseStatus: nc
      }
    },
    updateProNum(state, action) {
      return {
        ...state,
        pros: action.payload.np
      }
    },
    toggleChoose(state, action) {
      const { sku } = action.payload
      const { chooseStatus } = state
      const status = chooseStatus[sku]
      return {
        ...state,
        chooseStatus: {
          ...chooseStatus,
          [sku]: !status
        }
      }
    },
    toggleAllChoose(state, action) {
      const { all } = action.payload
      const { idList, chooseStatus } = state
      const copyCS = { ...chooseStatus }
      idList.forEach(sku => {
        copyCS[sku] = !all
      })
      return {
        ...state,
        chooseStatus: copyCS
      }
    },
    makeExpire(state) {
      return {
        ...state,
        expired: true
      }
    }
  },
  effects: {
    *changeMaybe({ payload }, { call, put, select }) {
      const type = payload.type
      const ot = yield select(state => state.cart.maybe.type)
      if (type === ot) return false
      const { data: { data: result, code }, err } = yield call(fetchMaybe, { type })
      if (err || +code !== 0) {
        yield put({ type: 'error/fetchDataError', payload: { msg: `获取'猜你喜欢'失败`, code: code || -10 } })
        return false
      }
      const ids = result.map(item => item.sku)
      yield put({ type: 'updateMaybe', payload: { type, ids } })
    },
    *fetchCart({ payload }, { call, put, select }) {
      const { expired } = yield select(state => state.cart)
      if (!expired) return false
      const { _id: uid } = yield select(state => state['user-info'])
      const listStore = yield select(state => state['list-store'])
      if (_.isEmpty(listStore)) {
        yield put({ type: 'list-store/fillStore' })
      }
      const { data: { code, data: result }, err } = yield call(fetchCart, { uid })
      if (err || (+code !== 0)) {
        yield put({
          type: 'error/fetchDataError',
          payload: { msg: '获取购物车失败', code: code || -10 }
        })
        return false
      }
      // v
      // if (+code === 0) {
      //   yield put({ type: 'save' })
      //   return false
      // }
      const store = result.products.map(item => {
        return _.pick(item, ['pid', 'cid', 'sku', 'count', 'price', '_type', 'sku'])
      })
      const ps = new schema.Entity('list', undefined, {
        idAttribute: v => v.sku
      })
      const { result: idList, entities: { list: pros } } = normalize(store, [ps])
      yield [
        put({ type: 'save', payload: { idList, pros } }),
        put({ type: 'changeMaybe', payload: { type: store[0]._type } })
      ]
    },
    *deleteProFromCart({ payload }, { call, put, select }) {
      const { cid, sku } = payload
      const { pros, idList } = yield select(state => state.cart)
      if (!pros[sku]) return false
      const { _id: uid } = yield select(state => state['user-info'])
      const { err, data } = yield call(deleteProFromCart, { cid, uid })
      console.log(err)
      console.log(data)
      if (err || (+data.code !== 0)) {
        yield put({
          type: 'error/dataOperationError',
          payload: { msg: '删除商品失败', code: data.code || -10 }
        })
        return false
      }
      const index = idList.indexOf(sku)
      yield put({ type: 'delPro', payload: { index, sku } })
    },
    *modifyProsNum({ payload }, { put, select }) {
      const { sku, add } = payload
      const { pros } = yield select(state => state.cart)
      if (!pros[sku]) return false
      // api here
      const pro = pros[sku]
      let { count } = pro
      count = parseInt(count, 10)
      if (add) {
        count += 1
      } else if (count > 1) {
        count -= 1
      }
      const np = { ...pros, [sku]: { ...pro, count } }
      const { _id: uid } = yield select(state => state['user-info'])
      yield put({ type: 'updateProNum', payload: { np } })
      yield put({ type: 'updateProNumToServer', payload: { count, cid: pros[sku].cid, uid } })
    },
    updateProNumToServer: [
      function* ({ payload }, { call }) {
        yield call(delay, 500)
        yield call(updateCount, payload)
        yield call(delay, 500)
      },
      { type: 'takeLatest' }
    ],
    *addProToCart({ payload }, { call, put, select }) {
      const { sku } = payload
      const { _id: uid } = yield select(state => state['user-info'])
      const { data = {}, err } =
        yield call(addProToCart, { sku, uid, count: 1 })
      if (err || +data.code !== 0) {
        yield put({
          type: 'error/dataOperationError',
          payload: { msg: '添加购物车失败', code: data.code || -10 }
        })
        return false
      }
      yield put({ type: 'makeExpire' })
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
