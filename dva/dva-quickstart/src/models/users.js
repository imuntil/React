import { hashHistory } from 'dva/router'
import { query } from '../services/users'
export default {
  namespace: 'users',
  state: {
    list: [],
    total: null,
    loading: false,
    current: null,
    currentItem: {},
    modalVisible: false,
    modalType: 'create'
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/users') {
          dispatch({
            type: 'query',
            payload: {}
          })
        }
      })
    }
  },
  effects: {
    *query ({ payload }, { select, call, put }) {
      yield put({type: 'showLoading'})
      const { data } = yield call(query)
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            total: data.page.total,
            current: data.page.current
          }
        })
      }
    },
    *create () {

    },
    *'delete' () {

    },
    *update () {

    }
  },
  reducers: {
    showLoading (state, action) {
      return {...state, loading: true}
    },
    showModal () {},
    hideModal () {},
    querySuccess (state, action) {
      const { payload: mock } = action
      return {...state, ...mock, loading: false}
    },
    createSuccess () {},
    deleteSuccess () {},
    updateSuccess () {}
  }
}
