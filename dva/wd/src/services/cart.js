import request from '../utils/request'
import { BASEURL, base } from "../constant"

// 拉取购物车
export function fetchCart({ uid }) {
  return request(`${base}users/${uid}/cart`)
}
// 更新购物车商品数量
export function updateCount({ cid, count, uid }) {
  return request(`${base}users/${uid}/cart/${cid}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ count })
  })
}
// 删除购物车中的商品
export function deleteProFromCart({ cid, uid }) {
  return request(`${base}users/${uid}/cart/${cid}`, {
    method: 'DELETE‘'
  })
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
