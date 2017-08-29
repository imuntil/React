import request from '../utils/request';
import { BASEURL } from '../constant'

export function fetchAllPros({ flag, sort }) {
  return request(`${BASEURL}productShowPro.action?flag=${flag}&sort=${sort}`)
}
