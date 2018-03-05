import React from 'react'

const DefaultLayout = ({ children }) => {
  return (
    <div className="layout" style={{ width: '100%', height: '100%' }}>
      {children}
    </div>
  )
}

export default DefaultLayout
