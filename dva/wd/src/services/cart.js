import request from '../utils/request'
import { BASEURL } from "../constant"

export function fetchCart({ userid }) {
  return request(`${BASEURL}selectUsrShoppingCartSct.action?userid=${userid}&flag=1`)
}
