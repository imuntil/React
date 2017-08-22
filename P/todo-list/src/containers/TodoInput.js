/**
 * Created by 斌 on 2017/6/18.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TodoInput from '../components/TodoInput'
import { addTodo } from '../reducers/todos'

class TodoInputContainer extends Component {
  static propTypes = {
    addTodo: PropTypes.func
  }
  handleAddTodo (todo) {
    const { todos } = this.props
    console.log(todo);
    const newTodos = [...todos, todo]
    localStorage.setItem('todos', JSON.stringify(newTodos))
    if (this.props.addTodo) {
      this.props.addTodo(todo)
    }
  }
  render () {
    return (
      <TodoInput addTodo={this.handleAddTodo.bind(this)} />
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
    addTodo: todo => dispatch(addTodo(todo))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoInputContainer)