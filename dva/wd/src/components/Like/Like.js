import React from 'react'
import Card from '../Card.js'
import styles from './Like.css'

function Like({ data, title }) {
  return (
    <div className="section">
      <div className="pd-section">
        <p className="section_title">{title}</p>
        <div className={styles.box}>
          {
            data.map((i, k) => <Card key={k} data={i} />)
          }
        </div>
      </div>
    </div>
  )
}

export default Like
