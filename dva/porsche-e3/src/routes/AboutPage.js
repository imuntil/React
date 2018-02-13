import React, { Component } from 'react'
import { connect } from 'dva'
import styles from './AboutPage.css'

class AboutPage extends Component {
  handleClick = () => {
    const { dispatch } = this.props
    dispatch({ type: 'example/fetch', payload: { msg: 'hello' } })
  }
  render() {
    return (
      <div className={styles.normal}>
        Route Component: AboutPage
        <button onClick={this.handleClick} className={styles.btn}>
          Click
        </button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const msg = state.example
  return { msg }
}

export default connect(mapStateToProps)(AboutPage)
