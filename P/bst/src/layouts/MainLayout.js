import React from 'react'
import Header from '../components/Header'
import JCarousel from '../components/Carousel'
import Footer from '../components/Footer'

function MainLayout({children}) {
  return (
    <div>
      <Header  />
      <JCarousel />
      {
        children
      }
      <Footer />
    </div>
  )
}

export default MainLayout