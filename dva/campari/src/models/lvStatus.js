
export default {
  namespace: 'lvStatus',
  state: {
    a: {
      dataBlob: {},
      sectionIDs: [],
      rowIDs: []
    }
  },
  reducers: {
    updateA(state, action) {
      return {
        ...state,
        a: {
          ...action.payload
        }
      }
    }
  },
  effects: {},
  subscriptions: {},
};
