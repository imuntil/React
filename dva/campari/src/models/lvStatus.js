import _ from 'lodash'
// listview status
export default {
  namespace: 'lvStatus',
  state: {
    a: {
      dataBlob: {},
      sectionIDs: [],
      rowIDs: []
    },
    b: {
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
        a: _.cloneDeep(action.payload)
      }
    },
    updateC(state, action) {
      return {
        ...state,
        c: _.cloneDeep(action.payload)
      }
    },
    updateB(state, action) {
      return {
        ...state,
        b: _.cloneDeep(action.payload)
      }
    },
    clearB(state, action) {
      return {
        ...state,
        b: {
          dataBlob: {},
          sectionIDs: [],
          rowIDs: []
        }
      }
    }
  },
  effects: {},
  subscriptions: {},
};
