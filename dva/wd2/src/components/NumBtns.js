import React from 'react'
import './NumBtns.scss'

export default ({ value = 1, onChange, className = '' }) => {
  return (
    <div className={`num-btns-29djh ${className}`}>
      <a href="javascript:;" onClick={() => onChange(-1, +value)} />
      <span>{value}</span>
      <a href="javascript:;" onClick={() => onChange(1, +value)} />
    </div>
  )
}
