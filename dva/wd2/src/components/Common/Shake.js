import React from 'react'
import TweenOne from 'rc-tween-one'
import PropTypes from 'prop-types'

const animation = { translateX: '4%', yoyo: true, repeat: 7, duration: 50 }
const style = { boxShadow: '0 0 4px 2px #e47f87' }
const Shake = ({ shake, ani, playingStyle, children, ...rest }) => {
  return (
    <TweenOne animation={shake ? ani : null} component="div" {...rest}>
      <p style={shake ? playingStyle : null}>{children}</p>
    </TweenOne>
  )
}

Shake.defaultProps = {
  shake: false,
  ani: animation,
  playingStyle: style
}

Shake.propTypes = {
  shake: PropTypes.bool.isRequired,
  ani: PropTypes.object,
  playingStyle: PropTypes.object
}

export default Shake
