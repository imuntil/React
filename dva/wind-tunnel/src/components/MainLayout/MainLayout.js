import React from 'react'
import styles from './MainLayout.less'

const MainLayout = ({ children, bg2 }) => {
  return (
    <div className={styles.bg_1} style={{
      background: bg2
        ? `url(${require('../../assets/main-bg2.jpg')}) no-repeat center`
        : `url(${require('../../assets/main-bg.jpg')}) no-repeat center`,
      backgroundSize: 'cover'
    }} >
      {children}
    </div>
  )
}

export default MainLayout
