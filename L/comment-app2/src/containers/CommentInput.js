import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CommentInput from '../components/CommentInput'
import { addComment } from '../reducers/comments'

class CommentInputContainer extends Component {
  static propTypes = {
    comments: PropTypes.array,
    onSubmit: PropTypes.func
  }

  constructor () {
    super()
    this.state = { username: '' }
  }
  componentWillMount () {
    this._loadUsername()
  }

  _loadUsername () {
    const username = localStorage.getItem('username')
    if (username) {
      this.setState({ username })
    }
  }
  _saveUsername (username) {
    localStorage.setItem('username', username)
  }
  handleSubmitComment (comment) {
    if (!comment || !comment.username || !comment.content) {
      return alert('can not empty')
    }
    const { comments } = this.props
    const newComments = [...comments, comment]
    localStorage.setItem('comments', JSON.stringify(newComments))
    if (this.props.onSubmit) {
      this.props.onSubmit(comment)
    }
  }

  render () {
    return (
      <CommentInput
        username={this.state.username}
        onUserNameInputBlur={this._saveUsername.bind(this)}
        onSubmit={this.handleSubmitComment.bind(this)}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    comments: state.comments
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onSubmit: comment => dispatch(addComment(comment))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentInputContainer)