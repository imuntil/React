import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import { delay } from '@/util/ct'

class Stopwatch extends Component {
  timer = null
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     time: this.props.limit
  //   }
  // }
  componentWillMount = () => {
    this.setState({
      time: this.props.limit
    })
  }
  

  componentDidMount() {
    this.run()
  }

  componentWillUnmount () {
    clearTimeout(this.timer)
  }

  run = () => {
    const { onEnd } = this.props
    this.timer = setTimeout(() => {
      let { time } = this.state
      if (time === 0) {
        onEnd()
        return
      }
      this.setState({
        time: --time
      })
      this.run()
    }, 1000)
  }

  reRun = () => {
    this.cancel()
    this.run()
  }

  cancel = () => {
    const { limit } = this.props
    clearTimeout(this.timer)
    this.setState({
      time: limit
    })
  }

  render() {
    const { time } = this.state
    return <div>{time}s</div>
  }
}

Stopwatch.propTypes = {
  limit: PropTypes.number,
  onEnd: PropTypes.func
}

export default Stopwatch
