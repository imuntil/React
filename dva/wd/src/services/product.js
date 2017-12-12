import request from '../utils/request';
import { BASEURL, base } from '../constant'

export function fetchAllPros({ flag, sort }) {
  return request(`${base}pros?flag=${flag}&sort=${sort}`)
}
export function fetchFilerPros({ flag, sort, type }) {
  return request(`${base}pros?flag=${flag}&sort=${sort}&type=${type}`)
}
export function fetchProDetail({ id }) {
  return request(`${BASEURL}productShowOnePro.action?id=${id}`)
}
export function fetchMaybe({ type, sku }) {
  return request(`${base}pros/maybe?type=${type}&sku=${sku}`)
}
