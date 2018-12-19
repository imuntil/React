import React from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'

import { loadData, startClock, tickClock } from '../actions/actions'

class Index extends React.Component {
  static async getInitialProps(props) {
    const { store, isServer } = props.ctx
    store.dispatch(tickClock(isServer))

    if (!store.getState().placeholderData) {
      store.dispatch(loadData())
    }

    return { isServer }
  }

  componentDidMount() {
    this.props.dispatch(startClock())
  }

  render() {
    return (
      <div>
        <p>Index Page</p>
        <Link href="/calendar">
          <a>To Calendar</a>
        </Link>{' '}
        <br />
        <Link href="/other">
          <a>To Other</a>
        </Link>
      </div>
    )
  }
}

export default connect()(Index)
