import React from 'react'
import JNews from '../components/News'

function News() {
  return (
    <div style={{overflow: 'hidden'}}>
      <JNews pagination={{pageSize: 5}} />
    </div>
  )
}

export default News