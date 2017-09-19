import { adrList, setDefaultAdr, deleteAdr } from '../../services/user'
import { normalizes } from '../../services/tools-fun'

export default {
  namespace: 'adr',
  state: {
    list: null,
    idList: null,
    statusList: null
  },
  reducers: {
    saveList(state, action) {
      const { payload } = action
      return {
        list: { ...payload.list },
        idList: [...payload.idList],
        statusList: [...payload.statusList]
      }
    },
    modifyAdr(state, action) {
      const { payload: { id } } = action
      const { list } = state
    },
    changeDefault(state, action) {
      const { statusList } = action.payload
      return {
        ...state,
        statusList
      }
    }
  },
  effects: {
    *fetchList({ payload }, { call, put, select }) {
      const { idList: ids } = yield select(state => state.adr)
      if (ids && ids.length) return true
      const { data, err } = yield call(adrList, payload)
      if (err || +data.resultcode !== 1) {
        yield put({
          type: 'error/fetchDataError',
          payload: { msg: '获取地址失败' }
        })
        return false
      }
      const { idList, list } = normalizes(data.result)
      const statusList = idList.map(id => list[id].status)
      yield put({ type: 'saveList', payload: { idList, list, statusList } })
    },
    *changeDefaultAdr({ payload }, { call, put, select }) {
      const { usersid } = yield select(state => state['user-info'])
      const { err, data = {} } = yield call(setDefaultAdr, { userid: usersid, id: payload.id })
      if (err || +data.resultcode !== 1) {
        yield put({
          type: 'error/dataOperationError',
          payload: { msg: '修改未成功-。-', code: data.resultcode }
        })
        return false
      }
      const { statusList, idList } = yield select(state => state.adr)
      const index = idList.indexOf(payload.id)
      const sl = statusList.map((v, i) => {
        return +(i === index)
      })
      yield  put({
        type: 'changeDefault',
        payload: { statusList: sl }
      })
    },
    *deleteAdr({ payload }, { call, put, select }) {
      const { id } = payload
      const { list, statusList, idList } = yield select(state => state.adr)
      const index = idList.indexOf(id)
      if (index < 0) {
        throw new Error(`找不到id为${id}对应的地址`)
      }
      // const { err, data = {} } = yield call(deleteAdr, { id })
      // if (err || +data.resultcode !== 1) {
      //   yield put({
      //     type: 'error/dataOperationError',
      //     payload: { msg: '操作未成功-。-', code: data.resultcode }
      //   })
      //   return false
      // }
      const il = [...idList.slice(0, index), ...idList.slice(index + 1)]
      const sl = [...statusList.slice(0, index), ...statusList.slice(index + 1)]
      const l = { ...list }
      delete l[id]
      yield put({
        type: 'saveList',
        payload: { idList: il, statusList: sl, list: l }
      })
    }
  }
}
