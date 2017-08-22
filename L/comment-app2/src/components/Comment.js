import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Comment extends Component {
  static propTypes = {
    index: PropTypes.number,
    onDeleteComment: PropTypes.func,
    comment: PropTypes.object
  }
  timer = null

  constructor () {
    super()
    this.state = { timeString: '' }
  }

  componentWillMount () {
    this._updateTimeString()
    this.timer = setInterval(this._updateTimeString.bind(this), 5000)
  }
  componentWillUnmount () {
    clearInterval(this.timer)
  }

  _updateTimeString () {
    const comment = this.props.comment
    const duration = (+Date.now() - comment.createdTime) / 1000
    this.setState({
      timeString: duration > 60
        ? `${Math.round(duration / 60)} 分钟前`
        : `${Math.round(Math.max(duration, 1))} 秒前`
    })
  }

  handleDeleteComment () {
    if (this.props.onDeleteComment) {
      this.props.onDeleteComment(this.props.index)
    }
  }

  render () {
    const { comment } = this.props
    return (
      <div className="comment">
        <div className="comment-user">
          <span className="comment-username">
            {comment.username}
          </span>
          <p>{comment.content}</p>
        </div>
        <span className="comment-createdtime">
          {this.state.timeString}
        </span>
        <span
          onClick={this.handleDeleteComment.bind(this)}
          className="comment-delete">
          删除
        </span>
      </div>
    )
  }
}
export default Comment