import React from 'react'
import PropTypes from 'prop-types'

function Product({price, quantity, title, action}) {
  return (
    <div>
      {title} - &#36;{price} {quantity ? `x ${quantity}` : null}
      {'   '}
      {action}
    </div>
  )
}
Product.propTypes = {
  price: PropTypes.number,
  quantity: PropTypes.number,
  title: PropTypes.string,
  action: PropTypes.node
}
export default Product