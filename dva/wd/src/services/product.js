import request from '../utils/request';
import { BASEURL } from '../constant'

export function fetchAllPros({ flag = 1, sort = 1 }) {
  return request(`${BASEURL}productShowPro.action?flag=${flag}&sort=${sort}`)
}
export function fetchFilerPros({ flag, sort, type }) {
  return request(`${BASEURL}productShowPro.action?flag=${flag}&sort=${sort}&type=${type}`)
}
export function fetchProDetail({ id }) {
  return request(`${BASEURL}productShowOnePro.action?id=${id}`)
}
export function fetchMaybe({ type }) {
  return request(`${BASEURL}productTypeShowPro.action?type=${type}`)
}
