import React from 'react'
import PropTypes from 'prop-types'
import Product from './Product'

function ProductItem({product, onAddToCartClicked}) {
  const addToCartAction = (
    <button
      onClick={onAddToCartClicked}
      disabled={product.inventory > 0 ? '' : 'disabled'}
    >
      {product.inventory > 0 ? 'Add to cart' : 'sold out'}
    </button>
  )
  return (
    <div style={{marginBottom: 20}}>
      <Product title={product.title}
               action={addToCartAction}
               price={product.price} />
    </div>
  )
}

ProductItem.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    inventory: PropTypes.number.isRequired
  }).isRequired,
  onAddToCartClicked: PropTypes.func.isRequired
}

export default ProductItem