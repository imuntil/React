import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import './FadeInOut.css'

function FadeInOut({children}) {
  return (
    <ReactCSSTransitionGroup
       transitionName={{
         enter: 'fade-in',
         enterActive: 'fade-in-active',
         leave: 'fade-out',
         leaveActive: 'fade-out-active'
         // appear: 'appear',
         // appearActive: 'appear-active'
       }}
      // transitionName="fade"
      transitionEnter={true}
      transitionLeave={true}
      transitionAppear={false}
      transitionEnterTimeout={800}
      transitionLeaveTimeout={800}
      component="div"
      className='normal-animate'
    >
      {children}
    </ReactCSSTransitionGroup>
  )
}
export default FadeInOut
