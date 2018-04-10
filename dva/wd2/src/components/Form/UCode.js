import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { delay } from '@/utils/cts'
import './UCode.scss'

class UCode extends PureComponent {
  static defaultProps = {
    limit: 60,
    runningText: ''
  }

  static propTypes = {
    limit: PropTypes.number,
    onCodeClick: PropTypes.func,
    onTimeEnd: PropTypes.func,
    runningText: PropTypes.string
  }

  paused = false

  get content() {
    const { run, timer } = this.state
    const { runningText } = this.props
    return run
      ? runningText ? runningText.replace('$$', `${timer}s`) : `${timer}s`
      : '发送验证码'
  }

  constructor(props) {
    super(props)
    this.state = {
      timer: props.limit,
      run: false
    }
  }

  componentWillUnmount = () => {
    this.paused = true
    this.setState = (state, callback) => {
      return
    }
  }

  handleClick = async () => {
    if (this.state.run) return
    const { onCodeClick } = this.props
    onCodeClick && onCodeClick()
  }

  run = async () => {
    let { timer, run } = this.state
    const { onTimeEnd } = this.props
    if (run) return
    this.setState({ run: true })
    while (timer > 0 && !this.paused) {
      await delay(1000)
      --timer
      this.setState({ timer })
    }
    this.setState({ run: false })
    onTimeEnd && onTimeEnd()
    return true
  }

  render() {
    return (
      <a href="javascript:;" className="u-code" onClick={this.handleClick}>
        {this.content}
      </a>
    )
  }
}

export default UCode
