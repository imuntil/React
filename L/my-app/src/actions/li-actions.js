import { fetchLiList } from '@/request'
// import { loadingStart, loadingEnd } from '@/actions/loading-actions'

export const REQUEST_LI_POSTS = 'REQUEST_LI_POSTS'
const requestLiPosts = pager => ({
  type: REQUEST_LI_POSTS,
  pager
})

export const RECEIVE_LI_POSTS = 'RECEIVE_LI_POSTS'
const receiveLiPost = data => ({
  type: RECEIVE_LI_POSTS,
  data,
  receivedAt: Date.now()
})

export function fetchLiPosts(pager) {
  return async function(dispatch) {
    dispatch(requestLiPosts(pager))
    // dispatch(loadingStart())
    const { res, fail } = await fetchLiList(pager)
    res && dispatch(receiveLiPost(res.data))
    console.log(fail)
  }
}
