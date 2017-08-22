import React, { Component } from 'react'
import TodoList from './TodoList'
import TodoInput from './TodoInput'
import FooterBar from './FooterBar'

export default class TodoListApp extends Component {
  render () {
    return (
      <div>
        <TodoInput />
        <TodoList />
        <FooterBar />
      </div>
    )
  }
}