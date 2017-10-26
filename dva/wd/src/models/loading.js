
export default {
  namespace: 'routeLoading',
  state: {
    running: false
  },
  reducers: {
    start () {
      return { running: true }
    },
    stop () {
      return { running: false }
    }
  },
  effects: {},
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(() => {
        dispatch({ type: 'start' })
      })
    }
  },
};
