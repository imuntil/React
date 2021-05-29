import React, { useState } from 'react'
import { animated, config, useTransition } from 'react-spring'
import './styles.css'

function Mount({ show }: { show: boolean }) {
  // const [show, set] = useState(false)
  const transitions = useTransition(show, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    reverse: show,
    // delay: 200,
    config: config.default,
    // onRest: () => set(!show),
  })

  return transitions(
    (styles, item) =>
      item && (
        <animated.div style={styles} className="wrap">
          <div>some component</div>
        </animated.div>
      )
  )
}

const TransitionSimple = () => {
  const [flip, setFlip] = useState(false)
  return (
    <div>
      <button
        onClick={() => {
          setFlip((v) => !v)
        }}
      >
        toggle
      </button>
      <Mount show={flip} />
    </div>
  )
}

export default TransitionSimple
