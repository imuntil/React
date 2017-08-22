import React, { Component } from 'react'
import CommentInput from './CommentInput'
import CommentList from './CommentList'
import '../style/comment-app.css'

export default class CommentApp extends Component {
  render () {
    return (
      <div className="wrapper">
        <CommentInput />
        <CommentList />
      </div>
    )
  }
}