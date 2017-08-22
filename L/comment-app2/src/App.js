import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import CommentApp from './containers/CommentApp'
import commentsReducer from './reducers/comments'

const store = createStore(commentsReducer)

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <Provider store={store}>
          <CommentApp />
        </Provider>
      </div>
    )
  }
}

export default App
