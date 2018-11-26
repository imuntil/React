import { fetchLiList } from '@/request/li'

export const REQUEST_LIS = 'REQUEST_LIS'
const requestLis = () => ({
  type: REQUEST_LIS
})

export const RECEIVE_LIS = 'RECEIVE_LIS'
const receiveLis = ({ result, ...pager }) => ({
  type: RECEIVE_LIS,
  data: result,
  pager,
  receivedAt: Date.now()
})

export const FAIL_LI_POST = 'FAIL_LI_POST'
export const failLis = () => ({
  type: FAIL_LI_POST
})

export function fetchLis(pager) {
  return async function(dispatch, getState) {
    dispatch(requestLis())
    const _pager = (getState().li || {}).pager
    const params = { ..._pager, ...pager }
    delete params.total
    const res = await fetchLiList(params, REQUEST_LIS)
    res && dispatch(receiveLis(res))
  }
}
