import React from 'react';
import PropTypes from 'prop-types'
import { delay } from '../../services/tools-fun'
import styles from './ZCode.css';

class ZCode extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      limit: props.limit || 60
    }
  }
  componentWillReceiveProps(nextProps) {
    const { countDown } = nextProps
    if (countDown !== this.props.countDown) {
      this.countDownStatusChange(countDown)
    }
  }
  componentWillUnmount() {
    this.unmount = true
  }
  countDownStatusChange = (countDown) => {
    if (countDown) {
      this.run().then(() => { this.props.countDownEnds() })
        .catch((e) => {
          console.log(e);
        })
    }
  }
  run = async () => {
    let { limit } = this.state
    console.log('out', this.unmount);
    while (limit > 0 && !this.unmount) {
      console.log('in', this.unmount);
      await delay(1000)
      limit -= 1
      console.log('pre', this.unmount);
      if (this.unmount) throw new Error('component has un mount')
      this.setState({ limit })
    }
    return true
  }
  unmount = false
  render() {
    const {
      normalText = '获取验证码',
      countDown,
      countDownClass,
      normalClass,
      onNativeClick
    } = this.props
    const { limit } = this.state
    const text = countDown ? `${limit}s` : normalText
    return (
      <a
        className={countDown ? countDownClass : normalClass}
        href="javascript:;" onClick={onNativeClick}
      >
        {text}
      </a>
    );
  }
}

ZCode.propTypes = {
  countDownClass: PropTypes.string,
  normalClass: PropTypes.string,
  normalText: PropTypes.string,
  limit: PropTypes.number,
  countDown: PropTypes.bool.isRequired,
  countDownEnds: PropTypes.func.isRequired,
  onNativeClick: PropTypes.func.isRequired
}

export default ZCode;
