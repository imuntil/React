import React from 'react'
import cssModules from 'react-css-modules'
import styles from './Footer.module.scss'

function Footer() {
  return (
    <div styleName="footer">
      <span>豫ICP备17035440号</span>
      <span>powered by 逗比</span>
    </div>
  )
}

export default cssModules(Footer, styles)