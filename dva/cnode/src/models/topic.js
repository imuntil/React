import _ from 'lodash'
import { queryPost } from '../services/api'

export default {
  namespace: 'topic',
  state: {},
  reducers: {
    saveTopic(state, action) {
      return { ...state, ...action.payload.topic }
    }
  },
  effects: {
    *fetchTopic({ payload: { id } }, { call, put }) {
      const { data: { data } } = yield call(queryPost, { id })
      yield put({
        type: 'comment/receiveReplies',
        payload: {
          replies: data.replies,
          repliesCount: data.reply_count
        }
      })
      yield put({
        type: 'saveTopic',
        payload: {
          topic: _.omit(data, ['replies', 'reply_count'])
        },
      })
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        const topicReg = /\/post\/([A-z\d]+)/
        if (topicReg.test(pathname)) {
          const id = pathname.match(topicReg)[1]
          dispatch({ type: 'fetchTopic', payload: { id } })
        }
      })
    },
  },
};
