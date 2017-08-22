import React, { Component } from 'react'
import Todo from './Todo'
import PropTypes from 'prop-types'

export default class TodoList extends Component {
  static propTypes = {
    todos: PropTypes.array,
    onToggleTodo: PropTypes.func,
    onEditTodo: PropTypes.func
  }
  static defaultProps = {
    todos: [
      {
        task: 'test',
        complete: false
      }
    ]
  }
  handleToggleTodo (index) {
    console.log(index);
    if (this.props.onToggleTodo) {
      this.props.onToggleTodo(index)
    }
  }
  handleEditTodo (index, todo) {
    const { onEditTodo } = this.props
    if (onEditTodo) {
      onEditTodo(index, todo)
    }
  }
  render () {
    const { todos } = this.props
    return (
      <div>
        {
          todos.map((todo, index) =>
            <Todo todo={todo} onToggleTodo={this.handleToggleTodo.bind(this)}
                  onEditTodo={this.handleEditTodo.bind(this)}
                  todoIndex={index} key={index} />
          )
        }
      </div>
    )
  }
}