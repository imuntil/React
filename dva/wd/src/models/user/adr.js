import { adrList, setDefaultAdr } from '../../services/user'
import { schema, normalize } from 'normalizr'

export default {
  namespace: 'adr',
  state: {
    list: null,
    idList: null,
    statusList: null,
    expired: true
  },
  reducers: {
    saveList(state, action) {
      const { payload } = action
      return {
        list: { ...payload.list },
        idList: [...payload.idList],
        statusList: [...payload.statusList],
        expired: false
      }
    },
    changeDefault(state, action) {
      const { statusList } = action.payload
      return {
        ...state,
        statusList
      }
    },
    updateList(state, action) {
      return {
        ...state,
        expired: true
      }
    }
  },
  effects: {
    *fetchList({ payload }, { call, put, select }) {
      const { expired } = yield select(state => state.adr)
      if (!expired) return true
      const { data, err } = yield call(adrList, payload)
      if (err || +data.code !== 0) {
        yield put({
          type: 'error/fetchDataError',
          payload: { msg: '获取地址失败', code: data.resultcode || -10 }
        })
        return false
      }
      console.log(data.data)
      const s = new schema.Entity('list', undefined, {
        idAttribute: value => value._id
      })
      const { result: idList, entities: { list } } = normalize(data.data, [s])
      console.log(idList)
      console.log(list)
      const statusList = idList.map(id => list[id].isDefault)
      yield put({ type: 'saveList', payload: { idList, list, statusList } })
    },
    *changeDefaultAdr({ payload }, { call, put, select }) {
      const { _id: uid } = yield select(state => state['user-info'])
      const { err, data = {} } = yield call(setDefaultAdr, { uid, aid: payload.aid })
      if (err || +data.code !== 0) {
        yield put({
          type: 'error/dataOperationError',
          payload: { msg: '修改未成功-。-', code: data.resultcode || -10 }
        })
        return false
      }
      const { statusList, idList } = yield select(state => state.adr)
      const index = idList.indexOf(payload.aid)
      const sl = statusList.map((v, i) => {
        return +(i === index)
      })
      yield put({
        type: 'changeDefault',
        payload: { statusList: sl }
      })
    },
    *deleteAdr({ payload }, { put, select }) {
      const { id } = payload
      const { list, statusList, idList } = yield select(state => state.adr)
      const index = idList.indexOf(id)
      if (index < 0) {
        throw new Error(`找不到id为${id}对应的地址`)
      }
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
