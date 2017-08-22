import React from 'react'

function Response({children, ...props}) {
  console.log(props);
  return (
    <div>
      <div className="left">
        {children[0]}
      </div>
      <div className="right">
        {children[1]}
      </div>
    </div>
  )
}

export default Response