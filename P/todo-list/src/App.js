import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import TodoListApp from './containers/TodoListApp'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import todosReducer from './reducers/todos'

const store = createStore(todosReducer)

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <Provider store={store}>
          <TodoListApp />
        </Provider>
      </div>
    )
  }
}

export default App
