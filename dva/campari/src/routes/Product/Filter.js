import React from 'react';
import gen from './gen.js'
import Row from '../../components/Item.js'
import styles from './Filter.css'

function Body({ children }) {
  return (
    <div className={styles.body_box}>
      {
        children
      }
    </div>
  )
}

export default gen('filter', 'B', Row, Body, true)
