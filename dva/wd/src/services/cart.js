import request from '../utils/request'
import { BASEURL } from "../constant"

// 拉取购物车
export function fetchCart({ userid }) {
  return request(`${BASEURL}selectUsrShoppingCartSct.action?userid=${userid}&flag=1`)
}
// 更新购物车商品数量
export function updateCount({ cid, pronum }) {
  return request(`${BASEURL}updateShopCartNumSct.action?cid=${cid}&pronum=${pronum}`)
}
// 删除购物车中的商品
export function deleteProFromCart({ cid }) {
  return request(`${BASEURL}delShoppingCartSct.action?cid=${cid}`)
}
// 添加商品到购物车
export function addProToCart({ userid, id, pronum }) {
  return request((`${BASEURL}insertShoppingCartSct.action?flag=1&userid=${userid}&id=${id}&pronum=${pronum}`))
}
