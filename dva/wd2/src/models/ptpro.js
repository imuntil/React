import { fetchPointsPros } from '../services'
export default {
  namespace: 'ptpro',

  state: {
    list: [],
    dic: {}
  },

  effects: {
    *fetchPPList({ payload }, { call, put, select }) {
      const { list } = yield select(state => state.ptpro)
      if (list.length) return false
      const { data } = yield call(fetchPointsPros)
      if (!data) {
        return false
      }
      
    }
  }
}