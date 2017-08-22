import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  INCREMENT,
  DECREMENT,
  INCREMENT_ASYNC,
  INCREMENT_IF_ODD,
  CANCEL_INCREMENT_ASYNC
} from '../actionTypes'

function Counter({counter, countdown, dispatch}) {
  const action = (type, value) => () => dispatch({type, value})
  return (
    <div>
      Clicked: {counter} times
      {'  '}
      <button onClick={action(INCREMENT)}>+</button>
      {'   '}
      <button onClick={action(DECREMENT)}>-</button>
      {'    '}
      <button onClick={action(INCREMENT_IF_ODD)}>
        Increment if odd
      </button>
      {'    '}
      <button onClick={
        countdown ? action(CANCEL_INCREMENT_ASYNC)
          : action(INCREMENT_ASYNC, 5)
      } style={{
        color: countdown ? 'red' : 'black'
      }}>
        {countdown ? `Cancel increment (${countdown})` : 'increment after 5s'}
      </button>
    </div>
  )
}

Counter.propTypes = {
  dispatch: PropTypes.func.isRequired,
  counter: PropTypes.number.isRequired,
  countdown: PropTypes.number.isRequired
}

function mapStateToProps(state) {
  return {
    counter: state.counter,
    countdown: state.countdown
  }
}

export default connect(mapStateToProps)(Counter)