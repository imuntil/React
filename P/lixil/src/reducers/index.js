import { combineReducers } from 'redux'
import news from './news'
import anchor from './anchor'
import products from './products'

//news selector
export function getNewsDetail(state) {
  return state.news.detail
}
export function getNewsList(state) {
  return state.news.list
}

//anchor selector
export function getAnchorIndex(state) {
  return state.anchor.index
}
export function getAnchorScrollStatus(state) {
  return state.anchor.scrolling
}

//root reducer
const root = combineReducers({
  news,
  anchor,
  products
})

export default root