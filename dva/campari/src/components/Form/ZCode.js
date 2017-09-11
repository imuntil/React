import React from 'react';
import PropTypes from 'prop-types'
import styles from './ZCode.css';

class ZCode extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      limit: props.limit
    }
  }
  componentWillReceiveProps(nextProps) {

  }
  render() {
    const {
      normalText = '获取验证码',
      countDown,
      countDownClass
    } = this.props
    return (
      <a href="javascript:;">{normalText}</a>
    );
  }
}

ZCode.propTypes = {
  countDownClass: PropTypes.string,
  normalText: PropTypes.string,
  limit: PropTypes.number,
  countDown: PropTypes.bool.isRequired
}

export default ZCode;
