/* eslint-disable no-prototype-builtins */
import React from 'react';
import PropTypes from 'prop-types'
import TweenOne from 'rc-tween-one'
// import styles from './ZInput.css';

class ZInput extends React.Component {
  constructor(props) {
    super(props)
    const { value = '', minL, maxL } = this.props
    if (minL && maxL && minL > maxL) {
      throw new Error('minL must be less than or equal to maxL')
    }
    this.state = {
      value
    }
  }
  componentWillReceiveProps(nextProps) {
    const { value } = nextProps
    if (value === false) {
      this.setState({ value: '' })
    }
  }
  handleChange = (e) => {
    const { onZInputChange } = this.props
    const value = e.target.value.trim()
    this.setState({ value })
    onZInputChange(value, this.valid(value))
  }
  valid = (v) => {
    const { required, minL = 0, maxL, reg, name, length, confirm } = this.props
    if (required && !v.length) return { error: true, msg: `${name}是必填的` }
    if (length) {
      if (length !== v.length) return { error: true, msg: `${name}的长度必须为${length}` }
    } else {
      if (minL !== undefined && maxL && minL > maxL) throw new Error('minL must be less than or equal to maxL')
      if (minL !== undefined && v.length < minL) return { error: true, msg: `${name}长度必须大于或等于${minL}` }
      if (maxL && v.length > maxL) return { error: true, msg: `${name}长度必须小于或等于${maxL}` }
    }
    if (reg) {
      try {
        const reg2 = new RegExp(reg)
        if (!reg2.test(v)) return { error: true, msg: `${name}不符合规则` }
      } catch (e) {
        return '不合法的正则'
      }
    }
    if (confirm) {
      if (`${v}` !== `${confirm}`) return { error: true, msg: '两次密码不一致'}
    }
    return { error: false, msg: 'ok' }
  }
  animation = { translateX: '4%', yoyo: true, repeat: 9, duration: 50 }
  render() {
    const {
      type = 'text',
      maxL = 256,
      minL = 0,
      required = false,
      placeholder = '',
      shake,
      length,
      /* eslint-disable no-unused-vars */
      reg,
      onZInputChange,
      confirm,
      value: init,
      ...rest
    } = this.props
    const { value } = this.state
    return (
      <TweenOne
        animation={shake ? this.animation : null}
        component="span"
        style={shake ? { boxShadow: '0 0 8px #E47F87' } : {}}
      >
        <input
          type={type} maxLength={length || maxL} minLength={length || minL} required={required}
          placeholder={placeholder} value={value} onChange={this.handleChange} {...rest}
        />
      </TweenOne>
    );
  }
}

ZInput.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  maxL: PropTypes.number,
  minL: PropTypes.number,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  reg: PropTypes.string,
  onZInputChange: PropTypes.func.isRequired,
  shake: PropTypes.bool,
  confirm: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ]),
  length(props, propName, componentName) {
    if (props.hasOwnProperty(propName) && !/^[1-9]\d*$/.test(props[propName])) {
      return new Error(
        `Invalid prop ${propName} supplied to ${componentName}. Validation failed`
      )
    }
  }
}
export default ZInput;
