
export default {
  namespace: 'comment',
  state: {
    replies: [],
    repliesCount: 0
  },
  reducers: {
    receiveReplies(state, action) {
      return {
        ...state,
        ...action.payload
      }
    }
  },
  effects: {},
  subscriptions: {},
};
