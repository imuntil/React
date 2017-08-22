import React from 'react'
import ProductList from './ProductList'
import Cart from './Cart'

function App() {
  return (
    <div>
      <h2>Shopping Cart</h2>
      <hr/>
      <ProductList />
      <hr/>
      <Cart />
    </div>
  )
}
export default App