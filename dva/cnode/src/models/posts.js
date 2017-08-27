// import { normalize, schema } from 'normalizr'
import * as postsService from '../services/api'

export default {

  namespace: 'posts',

  state: {
    list: [],
    page: null,
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({ pathname, query }) => {
        if (pathname === '/') {
          dispatch({ type: 'fetch', payload: query })
        }
      })
    },
  },

  effects: {
    *fetch({ payload: { page = 1 } }, { call, put, select }) {  // eslint-disable-line
      const { data } = yield call(postsService.queryPosts, { page })
      // const posts = new schema.Entity('posts')
      // const postsList = new schema.Array(posts)
      // const normalized = normalize(data.data, postsList)
      // yield put({
      //   type: 'save',
      //   payload: {
      //     list: normalized.posts,
      //     byID: normalized.result,
      //     page: +page,
      //   },
      // });
      const list = yield select(state => state.posts.list)
      yield put({
        type: 'save',
        payload: {
          list: [...list, ...data.data],
          page: +page,
        },
      })
    },
    *refresh({ payload }, { call, put }) {
      const { data } = yield call(postsService.queryPosts, { page: 1 })
      const list = data.data.reverse()
      // yield put({
      //   type: 'clear',
      // })
      yield put({
        type: 'save',
        payload: {
          list,
          page: 1,
        },
      })
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
