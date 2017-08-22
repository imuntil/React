import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FooterBar from '../components/FooterBar'
import { connect } from 'react-redux'
import { deleteCompleted, toggleAllTodos } from '../reducers/todos'

class FooterBarContainer extends Component {
  static propTypes = {
    todos: PropTypes.array,
    deleteCompleted: PropTypes.func,
    toggleAllTodos: PropTypes.func
  }
  handleToggleAll () {
    let { todos } = this.props
    let completed = todos.every(todo => todo.complete)
    if (this.props.toggleAllTodos) {
      this.props.toggleAllTodos(!completed)
    }
   }
  handleDeleteCompleted () {
    const { deleteCompleted } = this.props
    if (deleteCompleted) {
      deleteCompleted()
    }
  }
  render () {
    return (
      <FooterBar onToggleAll={this.handleToggleAll.bind(this)}
        onDeleteCompleted={this.handleDeleteCompleted.bind(this)} />
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
    deleteCompleted: () => dispatch(deleteCompleted()),
    toggleAllTodos: completed => dispatch(toggleAllTodos(completed))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FooterBarContainer)