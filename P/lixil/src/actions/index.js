export const REQUEST_NEWS_LIST = 'REQUEST_NEWS_LIST'
export const RECEIVE_NEWS_LIST = 'RECEIVE_NEWS_LIST'
export const REQUEST_NEWS_DETAIL = 'REQUEST_NEWS_DETAIL'
export const RECEIVE_NEWS_DETAIL = 'RECEIVE_NEWS_DETAIL'

//PRODUCTS
export const REQUEST_PROS_LIST = 'REQUEST_PROS_LIST'
export const RECEIVE_PROS_LIST = 'RECEIVE_PROS_LIST'
export const REQUEST_PRO_DETAIL = 'REQUEST_PRO_DETAIL'
export const RECEIVE_PRO_DETAIL = 'RECEIVE_PRO_DETAIL'
export const CLEAR_PRO_DETAIL = 'CLEAR_PRO_DETAIL'

//anchor
export const HASH_CHANGED = 'HASH_CHANGED'
export const SCROLL_END = 'SCROLL_END'
export const SCROLL_START = 'SCROLL_START'

//news actions
export function fetchNewsList() {
  return {
    type: REQUEST_NEWS_LIST
  }
}
export function receiveNewsList(list) {
  return {
    type: RECEIVE_NEWS_LIST,
    list
  }
}
export function fetchNewsDetail(newsId) {
  return {
    type: REQUEST_NEWS_DETAIL,
    newsId
  }
}
export function receiveNewsDetail(detail) {
  return {
    type: RECEIVE_NEWS_DETAIL,
    detail
  }
}

//anchor actions
export function hashChanged(index) {
  return {
    type: HASH_CHANGED,
    index
  }
}
export function scrollEnd() {
  return {
    type: SCROLL_END
  }
}
export function scrollStart() {
  return {
    type: SCROLL_START
  }
}
//products actions

export function fetchProducts(categoryId) {
  return {
    type: REQUEST_PROS_LIST,
    categoryId
  }
}
export function receiveProducts({list, categoryId}) {
  return {
    type: RECEIVE_PROS_LIST,
    list,
    categoryId
  }
}
export function fetchProDetail(proId) {
  return {
    type: REQUEST_PRO_DETAIL,
    proId
  }
}
export function receiveProDetail(detail) {
  return {
    type: RECEIVE_PRO_DETAIL,
    detail
  }
}
export function clearProDetail() {
  return {
    type: CLEAR_PRO_DETAIL
  }
}