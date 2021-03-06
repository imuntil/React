import React from 'react'
import PropTypes from 'prop-types'
import './InputItem.scss'

const InputItem = ({
  label,
  mode,
  children,
  useWrap,
  className,
  customClass,
  noColon
}) => {
  return (
    <div
      className={`input-cell-qo83b ${useWrap ? 'wrap-qo83b' : ''} ${className}`}
    >
      <div className={`form-item-qo83b ${customClass}`}>
        <label htmlFor="" className={`text--${mode} ${noColon && 'no-colon'}`}>
          {mode === 'justify'
            ? label.split('').map(v => <i key={v}>{v}</i>)
            : label}
        </label>
        <div className="content-qo83b">{children}</div>
      </div>
    </div>
  )
}
InputItem.defaultProps = {
  mode: 'justify',
  useWrap: true,
  className: '',
  customClass: '',
  noColon: false
}
InputItem.propTypes = {
  label: PropTypes.string.isRequired,
  mode: PropTypes.oneOf(['justify', 'left', 'right', 'center']),
  useWrap: PropTypes.bool,
  className: PropTypes.string,
  customClass: PropTypes.string,
  labelWidth: PropTypes.number,
  noColon: PropTypes.bool
}

export default InputItem
