import { ALL_COCKTAIL_PER_PAGE, cocktails } from '../constant'

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export default {
  namespace: 'cocktail',
  state: {
    lists: cocktails,
    page: null,
    // currentList
    cls: [],
    total: 1,
    hasMore: true
  },
  reducers: {
    updateCLs(state, action) {
      const { lists, total } = state
      const { page } = action.payload
      return {
        ...state,
        page,
        cls: lists.slice(0, (page + 1) * ALL_COCKTAIL_PER_PAGE),
        hasMore: total > page
      }
    }
  },
  effects: {
    *init({ payload }, { call, put, select }) {
      const cls = yield select(state => state.cocktail.cls)
      if (cls && cls.length) return true
      yield call(delay, 100)
      yield put({
        type: 'updateCLs',
        payload: {
          page: 0,
        }
      })
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/cocktail') {
          dispatch({
            type: 'init'
          })
        }
      })
    }
  },
};
