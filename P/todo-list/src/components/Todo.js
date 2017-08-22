import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Todo extends Component {
  static propTypes = {
    todo: PropTypes.object,
    todoIndex: PropTypes.number,
    onToggleTodo: PropTypes.func,
    onEditTodo: PropTypes.func
  }
  editInput = null
  constructor (props) {
    super(props)
    this.state = {
      ...props.todo,
      editing: false
    }
  }
  handleInputChange (e) {
    console.log('todo');
    if (this.props.onToggleTodo) {
      this.props.onToggleTodo(this.props.todoIndex)
    }
  }
  handleEditInputChange (e) {
    this.setState({
      task: e.target.value
    })
  }
  handleDoubleClick () {
    const {editing} = this.state
    this.setState({
      editing: !editing
    })
    if (!editing) {
      setTimeout(() => {
        this.editInput.focus()
      }, 0)
    }
  }
  handleUpdateTodo (e) {
    if (e.keyCode !== 13) return
    this.setState({
      editing: false
    })
    const { onEditTodo, todoIndex } = this.props
    const { task, complete } = this.state
    if (onEditTodo) {
      onEditTodo(todoIndex, {task, complete})
    }
  }
  handleEditInputBlur (e) {
    this.setState({
      editing: false
    })
  }
  render () {
    const { todo } = this.props
    const { task, editing } = this.state
    return (
      <div>
        <p>
          <input onChange={this.handleInputChange.bind(this)} checked={todo.complete} type="checkbox"/>
          <span onClick={this.handleDoubleClick.bind(this)}>{todo.task}</span>
        </p>
        <p style={{visibility: editing ? 'visible' : 'hidden'}}>
          <input
            ref={input => this.editInput = input}
            onBlur={this.handleEditInputBlur.bind(this)}
            onKeyUp={this.handleUpdateTodo.bind(this)}
            onChange={this.handleEditInputChange.bind(this)} type="text" value={task}/>
        </p>
      </div>
    )
  }
}