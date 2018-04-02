export default {
  namespace: 'ui',
  state: {
    bottomBar: true
  },
  reducers: {
    toggleBottomBar(state, { payload }) {
      return {
        ...state,
        bottomBar: payload
      }
    }
  }
}