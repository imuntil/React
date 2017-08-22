
export default {
  namespace: 'page',
  state: {
    current: 0
  },
  reducers: {
    next (state, { payload: current }) {
      return { ...state, current}
    }
  },
  effects: {},
  subscriptions: {},
};
