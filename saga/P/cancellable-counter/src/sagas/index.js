import { take, put, call, fork, race, cancelled } from 'redux-saga/effects'
import { eventChannel, END } from 'redux-saga'
import {
  INCREMENT_ASYNC,
  CANCEL_INCREMENT_ASYNC,
  COUNTDOWN_TERMINATED,
  INCREMENT
} from '../actionTypes'

const action  = type => ({type})

const countdown = secs => {
  console.log('countdown', secs);
  return eventChannel(listener => {
    const iv = setInterval(() => {
      secs -= 1
      console.log('countdown', secs)
      if (secs > 0) listener(secs)
      else {
        listener(END)
        clearInterval(iv)
        console.log('countdown terminated');
      }
    }, 1000)
    return () => {
      clearInterval(iv)
      console.log('countdowm cancelled');
    }
  })
}

export function * incrementAsync({value}) {
  const chan = yield call(countdown, value)
  try {
    while (true) {
      console.log('cc');
      let seconds = yield take(chan)
      yield put({type: INCREMENT_ASYNC, value: seconds})
    }
  } finally {
    if (!(yield cancelled())) {
      yield put(action(INCREMENT))
      yield put(action(COUNTDOWN_TERMINATED))
    }
    chan.close()
  }
}

export function * watchIncrementAsync() {
  try {
    while (true) {
      const action = yield take(INCREMENT_ASYNC)
      yield race([
        call(incrementAsync, action),
        take(CANCEL_INCREMENT_ASYNC)
      ])
    }
  } finally {
    console.log('watchIncrementAsync terminated');
  }
}

export default function * rootSaga () {
  yield fork(watchIncrementAsync)
}
