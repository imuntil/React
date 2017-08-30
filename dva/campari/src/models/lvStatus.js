// listview status
export default {
  namespace: 'lvStatus',
  state: {
    a: {
      dataBlob: {},
      sectionIDs: [],
      rowIDs: []
    },
    c: {
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
    },
    updateC(state, action) {
      return {
        ...state,
        c: {
          ...action.payload
        }
      }
    }
  },
  effects: {},
  subscriptions: {},
};
