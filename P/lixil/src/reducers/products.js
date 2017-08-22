import {
  RECEIVE_PRO_DETAIL,
  RECEIVE_PROS_LIST,
  CLEAR_PRO_DETAIL
} from '../actions'
import { combineReducers } from 'redux'
import _ from 'lodash'

const initialState = {
  lists: {},
  detail: {}
}

function products(state = initialState.lists, action) {
  switch (action.type) {
    case RECEIVE_PROS_LIST:
      const {list, categoryId, chunk = 4} = action
      return {
        ...state,
        [categoryId]: _.mapValues(list, item => _.chunk(item, chunk))
      }
    default:
      return state
  }
}
function productDetail(state = initialState.detail, action) {
  switch (action.type) {
    case RECEIVE_PRO_DETAIL:
      return action.detail
    case CLEAR_PRO_DETAIL:
      return initialState.detail
    default:
      return state
  }
}

export default combineReducers({
  lists: products,
  detail: productDetail
})

export function getProsListById(state) {
  return state.products.lists
}
export function getProductDetail(state) {
  return state.products.detail
}