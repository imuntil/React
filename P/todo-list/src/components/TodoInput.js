import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as _ from 'lodash'

export default class TodoInput extends Component {
  static propTypes = {
    task: PropTypes.string,
    complete: PropTypes.bool
  }
  static defaultProps = {
    task: '',
    complete: false
  }
  todoInput = null
  constructor (props) {
    super(props)
    this.state = {
      task: '',
      complete: false
    }
  }
  componentDidMount () {
    this.todoInput.focus()
  }
  handleTaskInput (e) {
    if (e.keyCode !== 13) return
    let task = e.target.value
    if (!_.trim(task).length) {
      alert('todo can not be empty')
      return
    }
    if (this.props.addTodo) {
      this.props.addTodo({
        task, complete: false
      })
    }
    this.setState({
      task: ''
    })
  }
  handleTaskChange (e) {
    this.setState({
      task: e.target.value
    })
  }
  render () {
    return (
      <div>
        <input
          value={this.state.task}
          onChange={this.handleTaskChange.bind(this)}
          onKeyUp={this.handleTaskInput.bind(this)}
          ref={todoInput => this.todoInput = todoInput} type="text"/>
      </div>
    )
  }
}