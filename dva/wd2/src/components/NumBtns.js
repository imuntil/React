import React from 'react'
import './NumBtns.scss'

const NumBtns = ({ value = 1, onChange, className = '' }) => {
  return (
    <div key={value} className={`num-btns-29djh ${className}`}>
      <a href="javascript:;" onClick={() => onChange(-1, +value)} />
      <span>{value}</span>
      <a href="javascript:;" onClick={() => onChange(1, +value)} />
    </div>
  )
}

export default NumBtns
