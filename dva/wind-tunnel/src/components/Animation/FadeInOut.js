import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import styles from './FadeInOut.less'

function FadeInOut({children}) {
  return (
    <ReactCSSTransitionGroup
      transitionName={{
        enter: 'animated',
        enterActive: 'fadeInDown',
        leave: 'animated',
        leaveActive: 'fadeOutDown',
        appear: 'animated',
        appearActive: 'fadeInDown'
      }}
      transitionEnter={true}
      transitionLeave={true}
      transitionAppear={true}
      transitionEnterTimeout={20000}
      transitionLeaveTimeout={20000}
      transitionAppearTimeout={20000}
      component="div"
      className={styles.normal}
    >
      {children}
    </ReactCSSTransitionGroup>
  )
}
export default FadeInOut
