import _ from 'lodash'

export default {
  namespace: 'detail',
  state: {

  },
  reducers: {

  },
  effects: {
    *fetchDetail({ payload: { id } }, { call, put, select }) {
      const store = yield select(state => state['list-store'])
      console.log(store);
      if (store && !_.isEmpty(store)) {
        console.log('xx');
      }
    }
  },
  subscriptions: {
  }
}
