import React from 'react'
import PropTypes from 'prop-types'

function Posts({posts}) {
  return (
    <ul>
      {
        posts.map((post, i) =>
          <li key={i}>{post.title}</li>
        )
      }
    </ul>
  )
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired
}

export default Posts