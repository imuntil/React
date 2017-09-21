
export default {
  namespace: 'partLoading',
  state: {
    running: false
  },
  reducers: {
    startLoad(action, state) {
      return { running: true }
    },
    loadEnd(action, state) {
      return { running: false }
    }
  },
  effects: {},
  subscriptions: {},
};
