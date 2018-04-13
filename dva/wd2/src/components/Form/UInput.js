import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import TweenOne from 'rc-tween-one'
import { delay } from '@/utils/cts'
import './UInput.scss'

/* build-in regs */
const buildIn = {
  phone: /^(1[3|4|5|6|7|8|9])[0-9]{9}$/,
  password: /^[A-z0-9_]{6,20}$/,
  code: /^[\d]{6}$/,
  objectId: /^[0-9a-fA-F]{24}$/
}

const El = ({ el, ...rest }) => {
  return el === 'input' ? <input {...rest} /> : <textarea {...rest} />
}

class UInput extends PureComponent {
  animation = { translateX: '4%', yoyo: true, repeat: 7, duration: 50 }

  constructor(props) {
    super(props)
    const { value = '', minL, maxL } = this.props
    if (minL && maxL && minL > maxL) {
      throw new Error('minL must be less than or equal to maxL')
    }
    const valid = this.valid(value)
    this.state = { value, forceShake: false, ...valid }
  }

  componentWillReceiveProps = nextProps => {
    const { value } = nextProps
    if (value === '' && this.state.value !== '') {
      const valid = this.valid('')
      this.setState({ value: '', ...valid })
    }
  }

  handleChange = e => {
    const { onInputChange, name } = this.props
    const value = e.target.value.trim()
    const valid = this.valid(value)
    onInputChange({ name, value, $valid: valid })
    this.setState({ value, ...valid })
  }
  valid = v => {
    const { required, vv, name, length, reg, confirm } = this.props
    let { maxL, minL } = this.props
    if (required && !v.length) {
      return { valid: false, msg: `${vv || name}为必填项` }
    }
    if (confirm) {
      if (`${v}` !== `${confirm}`) {
        return { valid: false, msg: '两次密码不一致' }
      }
    }
    if (length && v.length !== length) {
      minL = maxL = 0
      return { valid: false, msg: `${vv || name}的长度应为${length}` }
    }
    if (minL && minL > v.length) {
      return { valid: false, msg: `${vv || name}的长度需大于${minL}` }
    }
    if (maxL && maxL < v.length) {
      return { valid: false, msg: `${vv || name}的长度需小于${maxL}` }
    }
    if (reg) {
      const exp = buildIn[reg] || new RegExp(reg)
      if (!exp.test(v)) {
        return { valid: false, msg: `${vv || name}不符合规则` }
      }
    }
    return { valid: true, msg: null }
  }

  $shake = async (time = 1000) => {
    this.setState({ forceShake: true })
    await delay(time)
    this.setState({ forceShake: false })
  }

  get aniShake() {
    const { forceShake, valid } = this.state
    const { shake } = this.props
    return forceShake || (!valid && shake)
  }

  render() {
    const {
      type = 'text',
      name,
      length,
      maxL,
      minL,
      wrapperClass = '',
      inputClass = '',
      el,
      /* eslint-disable un-used-vars */
      shake,
      reg,
      onInputChange,
      confirm,
      required,
      ...rest
    } = this.props
    const { value } = this.state
    return (
      <TweenOne
        animation={this.aniShake ? this.animation : null}
        component={el === 'input' ? 'span' : 'div'}
        className={`${wrapperClass} ${
          this.aniShake ? 'shake' : ''
        } input-wrapper-298jf`}
      >
        <El
          el={el}
          type={type}
          value={value}
          onChange={this.handleChange}
          name={name}
          maxLength={length || maxL}
          minLength={length || minL}
          className={`${inputClass} u-input-298jf`}
          {...rest}
        />
      </TweenOne>
    )
  }
}

const numberValid = (props, propName, componentName) => {
  if (props.hasOwnProperty(propName) && !/^[1-9]\d*$/.test(props[propName])) {
    return new Error(
      `Invalid prop ${propName} supplied to ${componentName}. Validation failed`
    )
  }
}

UInput.defaultProps = {
  type: 'text',
  el: 'input'
}

UInput.propTypes = {
  length: numberValid,
  maxL: numberValid,
  minL: numberValid,
  name: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  confirm: PropTypes.string,
  shake: PropTypes.bool,
  el: PropTypes.oneOf(['input', 'textarea']),
  /* 正则表达式 */
  reg: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ])
}

export default UInput
