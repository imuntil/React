/**
 * Created by 斌 on 2017/9/19.
 */
import React from 'react'
import PropTypes from 'prop-types'
import TweenOne from 'rc-tween-one'

class ZTextarea extends React.Component {
  state = { value: '' }
  handleChange = (e) => {
    const { onZInputChange } = this.props
    const value = e.target.value.trim()
    this.setState({ value })
    onZInputChange(value, this.valid(value))
  }
  valid = v => {
    const { required, minL = 0, maxL = 256, name, length } = this.props
    if (required && !v.length) return { error: true, msg: `${name}是必填的` }
    if (length) {
      if (length !== v.length) return { error: true, msg: `${name}的长度必须为${length}` }
    } else {
      if (minL !== undefined && maxL && minL > maxL) throw new Error('minL must be less than or equal to maxL')
      if (minL !== undefined && v.length < minL) return { error: true, msg: `${name}长度必须大于或等于${minL}` }
      if (maxL && v.length > maxL) return { error: true, msg: `${name}长度必须小于或等于${maxL}` }
    }
    return { error: false, msg: 'ok' }
  }
  animation = { translateX: '4%', yoyo: true, repeat: 9, duration: 50 }
  render() {
    const {
      maxL = 256,
      minL = 0,
      required = false,
      shake,
      length,
      component = 'span',
      /* eslint-disable no-unused-vars */
      onZInputChange,
      value: init,
      ...rest
    } = this.props
    const { value } = this.state
    return (
      <TweenOne
        animation={shake ? this.animation : null}
        component={component}
      >
        <textarea
          style={shake ? { boxShadow: '0 0 4px 2px #E47F87' } : {}}
          maxLength={length || maxL} minLength={length || minL} required={required}
          value={value} onChange={this.handleChange} {...rest}
        />
      </TweenOne>
    );
  }
}


ZTextarea.propTypes = {
  name: PropTypes.string.isRequired,
  maxL: PropTypes.number,
  minL: PropTypes.number,
  required: PropTypes.bool,
  onZInputChange: PropTypes.func.isRequired,
  shake: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  component: PropTypes.string,
  length(props, propName, componentName) {
    if (props.hasOwnProperty(propName) && !/^[1-9]\d*$/.test(props[propName])) {
      return new Error(
        `Invalid prop ${propName} supplied to ${componentName}. Validation failed`
      )
    }
  }
}

export default ZTextarea
