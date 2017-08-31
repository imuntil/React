import request from '../utils/request';
import { BASEURL } from '../constant'

export function fetchAllPros({ flag, sort }) {
  return request(`${BASEURL}productShowPro.action?flag=${flag}&sort=${sort}`)
}
export function fetchFilerPros({ flag, sort, type }) {
  return request(`${BASEURL}productShowPro.action?flag=${flag}&sort=${sort}&type=${type}`)
}
