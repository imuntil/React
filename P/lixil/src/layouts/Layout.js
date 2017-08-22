import React from 'react'
import Header from './Header'
import Footer from './Footer'
import './Layout.css'


function Layout(props) {
  const {children, location} = props
  return (
    <div className="main">
      <Header {...{location}}/>
      <div className="x-main">
        {children}
      </div>
      {/*<Footer />*/}
    </div>
  )
}

export default Layout