import { fetchLiList } from '@/request'

export const REQUEST_LI_POSTS = 'REQUEST_LI_POSTS'
const requestLiPosts = pager => ({
  type: REQUEST_LI_POSTS,
  pager
})

export const RECEIVE_LI_POST = 'RECEIVE_LI_POST'
const receiveLiPost = data => ({
  type: RECEIVE_LI_POST,
  data,
  receivedAt: Date.now()
})

export function fetchLiPosts(pager) {
  return async function (dispatch) {
    dispatch(requestLiPosts(pager))
    const { res, fail } = await fetchLiList(pager)
    res && dispatch(receiveLiPost(res.data))
    console.log(fail)
  }
}