
export default {
  namespace: 'list-store',
  state: {},
  reducers: {
    add(state, action) {
      return {
        ...state,
        ...action.payload
      }
    }
  },
  effects: {},
  subscriptions: {},
};
