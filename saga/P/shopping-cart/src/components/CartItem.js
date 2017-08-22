import React from 'react'
import PropTypes from 'prop-types'
import Product from './Product'

function CartItem({onRemove, title, price, quantity}) {
  const removeFromCartAction = (
    <button onClick={onRemove}>
      {' X '}
    </button>
  )
  return (
    <Product
      price={price}
      title={title}
      quantity={quantity}
      action={removeFromCartAction}
    />
  )
}

CartItem.propTypes = {
  title: PropTypes.string,
  price: PropTypes.number,
  quantity: PropTypes.number,
  onRemove: PropTypes.func.isRequired
}

export default CartItem