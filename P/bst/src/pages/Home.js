import React from 'react'
import JProducts from '../components/Products'
import JAbout from '../components/About'
import JNews from '../components/News'

function Home() {
  return (
    <div style={{overflow: 'hidden'}}>
      <JProducts />
      <JAbout />
      <JNews />
    </div>
  )
}
export default Home