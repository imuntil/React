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
      //id: {id, cid, pronum, prolabel}
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
      const { id } = action.payload
      const { chooseStatus } = state
      const status = chooseStatus[id]
      return {
        ...state,
        chooseStatus: {
          ...chooseStatus,
          [id]: !status
        }
      }
    },
    toggleAllChoose(state, action) {
      const { all } = action.payload
      const { idList, chooseStatus } = state
      const copyCS = { ...chooseStatus }
      idList.forEach(id => {
        copyCS[id] = !all
      })
      return {
        ...state,
        chooseStatus: copyCS
      }
    },
    makeExpire(state, action) {
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
      const { data: { result, resultcode }, err } = yield call(fetchMaybe, { type })
      if (err || +resultcode !== 1) {
        yield put({ type: 'error/fetchDataError', payload: { msg: `获取'猜你喜欢'失败`, code: resultcode || -10 } })
        return false
      }
      const ids = result.map(item => item.id)
      yield put({ type: 'updateMaybe', payload: { type, ids } })
    },
    *fetchCart({ payload }, { call, put, select }) {
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
      const chooseStatus = {}
      const store = result.map(item => {
        chooseStatus[item.id] = false
        return _.pick(item, ['id', 'cid', 'pronum', 'prolabel'])
      })
      const ps = new schema.Entity('pros')
      const prosSchema = [ps]
      const { result: idList, entities: { pros } } = normalize(store, prosSchema)
      yield [
        put({ type: 'save', payload: { idList, pros, chooseStatus } }),
        put({ type: 'changeMaybe', payload: { type: store[0].prolabel } })
      ]
    },
    *deleteProFromCart({ payload }, { call, put, select }) {
      const { cid, id } = payload
      const { pros, idList } = yield select(state => state.cart)
      if (!pros[id]) return false
      const { err, data } = yield call(deleteProFromCart, { cid })
      if (err || (+data.resultcode !== 1)) {
        yield put({
          type: 'error/dataOperationError',
          payload: { msg: '删除商品失败', code: data.resultcode || -10 }
        })
        return false
      }
      const index = idList.indexOf(id)
      yield put({ type: 'delPro', payload: { index, id } })
    },
    *modifyProsNum({ payload }, { put, select }) {
      const { id, add } = payload
      const { pros } = yield select(state => state.cart)
      if (!pros[id]) return false
      // api here
      const pro = pros[id]
      let { pronum } = pro
      pronum = parseInt(pronum, 10)
      if (add) {
        pronum += 1
      } else if (pronum > 1) {
        pronum -= 1
      }
      const np = { ...pros, [id]: { ...pro, pronum } }
      yield put({ type: 'updateProNum', payload: { np } })
      yield put({ type: 'updateProNumToServer', payload: { pronum, cid: pros[id].cid } })
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
      const { id } = payload
      const { usersid: userid } = yield select(state => state['user-info'])
      const { data = {}, err } =
        yield call(addProToCart, { id, userid, pronum: 1 })
      if (err || +data.resultcode !== 1) {
        yield put({
          type: 'error/dataOperationError',
          payload: { msg: '添加购物车失败', code: data.resultcode || -10 }
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
