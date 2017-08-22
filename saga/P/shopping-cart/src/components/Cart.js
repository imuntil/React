import React from 'react'
import CartItem from './CartItem'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { removeFromCart, checkout } from '../actions'
import { getTotal, getCartProducts, isCheckoutPending, getCheckoutError } from '../reducers'

function Cart({products, total, error, checkoutPending, removeFromCart, checkout}) {
  const hasProducts = products.length > 0
  const checkoutAllowed = hasProducts && !checkoutPending
  return (
    <div>
      <h3>Your Cart</h3>
      {
        !hasProducts
        ? 'Please add some products to cart.'
        : products.map(product => (
          <CartItem
              title={product.title}
              price={product.price}
              onRemove={() => removeFromCart(product.id)}
              key={product.id}
              quantity={product.quantity} />
        ))
      }
      <h3>Total:${total}</h3>
      <button
        onClick={() => checkout()}
        disabled={checkoutAllowed ? '' : 'disabled'}
      >checkout</button>
      <div style={{color: 'red'}}>{error}</div>
      {
        checkoutPending
          ? <span>loading.....</span>
          : null
      }
    </div>
  )
}

Cart.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
  })).isRequired,
  total: PropTypes.number.isRequired,
  error: PropTypes.string,
  checkoutPending: PropTypes.bool.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  checkout: PropTypes.func.isRequired
}

export default connect(
  state => ({
    total: getTotal(state),
    products: getCartProducts(state),
    checkoutPending: isCheckoutPending(state),
    error: getCheckoutError(state)
  }),
  {
    removeFromCart,
    checkout
  }
)(Cart)