import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TodoList from '../components/TodoList'
import { toggleTodo, initTodos, editTodo } from '../reducers/todos'

class TodoListContainer extends Component {
  static propTypes = {
    todos: PropTypes.array,
    initTodos: PropTypes.func,
    onToggleTodo: PropTypes.func,
    onEditTodo: PropTypes.func
  }
  componentWillMount () {
    this._loadTodos()
  }
  handleToggleTodo (index) {
    console.log(index);
    const { todos } = this.props
    const newTodos = [
      ...todos.slice(0, index),
      {...todos[index], complete: !todos[index].complete},
      ...todos.slice(index + 1)
    ]
    localStorage.setItem('todos', JSON.stringify(newTodos))
    if (this.props.onToggleTodo) {
      this.props.onToggleTodo(index)
    }
  }
  handleEditTodo (index, todo) {
    this.props.onEditTodo(index, todo)
  }
  _loadTodos () {
    let todos = localStorage.getItem('todos')
    todos = todos ? JSON.parse(todos) : []
    console.log(todos);
    this.props.initTodos(todos)
  }
  render () {
    return (
      <TodoList todos={this.props.todos}
                onEditTodo={this.handleEditTodo.bind(this)}
                onToggleTodo={this.handleToggleTodo.bind(this)} />
    )
  }
}

const mapStateToProps = state => {
  return {
    todos: state.todos
  }
}
const mapDispatchToProps = dispatch => {
  return {
    initTodos (todos) {
      dispatch(initTodos(todos))
    },
    onToggleTodo (todoIndex) {
      dispatch(toggleTodo(todoIndex))
    },
    onEditTodo (index, todo) {
      dispatch(editTodo(index, todo))
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoListContainer)