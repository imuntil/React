import { adrList } from '../../services/user'
import { normalizes } from '../../services/tools-fun'

export default {
  namespace: 'adr',
  state: {
    list: null,
    idList: null
  },
  reducers: {
    saveList(state, action) {
      const { payload } = action
      return {
        list: { ...payload.list },
        idList: [...payload.idList]
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
      yield put({ type: 'saveList', payload: { idList, list } })
    },
    // *modify({ payload }, { call, put, select }) {
    //   const { id } = payload
    // }
  }
}
