import request from '../utils/request'
import { BASEURL, base } from "../constant"

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
  return request(`${BASEURL}delShoppingCartSct.action?flag=1&cid=${cid}`)
}
// 添加商品到购物车
export function addProToCart({ uid, sku }) {
  return request((`${base}users/${uid}/cart/add`), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ sku })
  })
}
