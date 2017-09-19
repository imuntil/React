import { ALL_COCKTAIL_PER_PAGE, cocktails } from '../constant'
import { normalizes, delay } from '../services/tools-fun'

const res = normalizes(cocktails)
// const total = Math.ceil(idList.length / ALL_COCKTAIL_PER_PAGE) - 1

export default {
  namespace: 'cocktail',
  state: {
    list: res.list,
    idList: res.idList,
    page: null,
    // currentList
    cls: [],
    total: 1,
    hasMore: true
  },
  reducers: {
    updateCLs(state, action) {
      const { idList, total } = state
      const { page } = action.payload
      return {
        ...state,
        page,
        cls: idList.slice(0, (page + 1) * ALL_COCKTAIL_PER_PAGE),
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
