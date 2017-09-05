import React from 'react'

function genLike() {
  class Like extends React.Component {
    render() {
      return (
        <div>like</div>
      )
    }
  }
  return Like
}

export default genLike
