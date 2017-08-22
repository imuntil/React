import React from 'react'

function FormItem({label, children, valid, error}) {
  return (
    <div>
      <label>{label}</label>
      {children}
      {!valid && <span>{error}</span>}
    </div>
  )
}

export default FormItem