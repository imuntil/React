import { ALL_COCKTAIL_PER_PAGE } from '../constant'

export default {
  namespace: 'cocktail',
  state: {
    lists: [],
    page: null,
    // currentList
    cls: [],
    total: 1,
    hasMore: true
  },
  reducers: {
    updateCls(state, action) {
      const { list, total } = state
      const { page } = action.payload
      return {
        ...state,
        page,
        cls: list.slice(0, (page + 1) * ALL_COCKTAIL_PER_PAGE),
        hasMore: total > page
      }
    }
  },
  effects: {},
  subscriptions: {},
};
