import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

function BounceInUp({children}) {
  return (
    // bounceInUp
    <ReactCSSTransitionGroup
      transitionName={{
        appear: 'animated',
        appearActive: 'bounceInUp'
      }}
      transitionEnter={false}
      transitionLeave={false}
      transitionAppear={true}
      transitionAppearTimeout={2200}
      component="p"
    >
      {children}
    </ReactCSSTransitionGroup>
  )
}
export default BounceInUp
