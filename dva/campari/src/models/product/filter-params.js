
export default {
  namespace: 'filter-params',
  state: {
    flag: null,
    sort: null,
    type: null
  },
  reducers: {
    update(state, action) {
      return {
        ...state,
        ...action.payload
      }
    }
  },
  effects: {},
  subscriptions: {},
};
