import React from 'react'
import PropTypes from 'prop-types'
import TweenOne from 'rc-tween-one'
import styles from './Shake.css';

const animation = { translateX: '4%', yoyo: true, repeat: 9, duration: 50 }
const style = { boxShadow: '0 0 4px 2px #E47F87' }
function Shake({ shake, ani = animation, playingStyle = style, children, ...rest }) {
  return (
    <TweenOne
      animation={shake ? ani : null}
      component='div'
      { ...rest }
    >
      <div style={shake ? playingStyle : null}>
        {children}
      </div>
    </TweenOne>
  );
}
Shake.propTypes = {
  shake: PropTypes.bool.isRequired,
  ani: PropTypes.object,
  playingStyle: PropTypes.object
}

export default Shake;
