import request from '../utils/request'

const TIMEOUT = 100
const MAX_CHECKOUT = 2

export const api = {
  getProducts () {
    return request('http://localhost:3000/products')
  },
  buyProducts (cart) {
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        if (Object.keys(cart.quantityById).length <= MAX_CHECKOUT)
          resolve(cart)
        else
          reject(`You can buy ${MAX_CHECKOUT} items at maximum in a checkout`)
      }, TIMEOUT * 10)
    )
  }
}