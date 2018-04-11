import React from 'react'
import PropTypes from 'prop-types'
import './AdrRadio.scss'

const AdrRadio = ({ text, className, onRadioClick, checked }) => {
  return (
    <a
      href="javascript:;"
      onClick={onRadioClick}
      className={`radio-20s4k ${className} ${checked && 'checked-20s4k'}`}
    >
      <i />
      {text}
    </a>
  )
}

AdrRadio.defaultProps = {
  onRadioClick: () => {},
  checked: false,
  className: '',
}

AdrRadio.propTypes = {
  text: PropTypes.string,
  onRadioClick: PropTypes.func,
  checked: PropTypes.bool,
  className: PropTypes.string
}

export default AdrRadio
