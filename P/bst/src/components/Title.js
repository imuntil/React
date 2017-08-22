import React from 'react'

function Title({children}) {
  return (
    <div className="col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1 col-xs-12 col-xs-offset-0">
      <div className="title">
        {children}
      </div>
    </div>
  )
}

export default Title