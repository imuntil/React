export default {
  namespace: 'co',
  state: {
    //  all || toPay || toReceive
    status: '',
    idList: [],
    cls: [],
    page: null,
    total: null,
    hasMore: true
  },
  reducers: {
    setStatus(state, action) {
      return {
        ...action.payload
      }
    },
    updateCLs(state, action) {
      const { hasMore, idList, total } = state
      const { page } = action.payload
      if (!hasMore) return state
      return {
        ...state,
        page,
        cls: idList.slice(0, (page + 1) * 8),
        hasMore: total - 1 > page
      }
    }
  },
  effects: {
    *resetStatus({ payload }, { call, select, put }) {
      const { [payload.status]: idList } = yield select(state => state['order-store'])
      const cls = idList.slice(0, 8)
      const total = Math.ceil(idList.length / 8)
      yield put({
        type: 'setStatus',
        payload: {
          status: payload.status,
          idList,
          cls,
          page: 0,
          total,
          hasMore: total - 1 > 0
        }
      })
    }
  },
  subscriptions: {}
}
