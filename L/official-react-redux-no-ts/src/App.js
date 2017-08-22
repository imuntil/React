import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import Header from './components/Header'
import Content from './components/Content'

function themeReducer(state, action) {
  if (!state) {
    return {
      themeColor: 'red',
      fontSize: '25px'
    }
  }
  switch (action.type) {
    case 'CHANGE_COLOR':
      return {...state, themeColor: action.themeColor}
    case 'CHANGE_FONTSIZE':
      return {...state, fontSize: action.fontSize}
    default:
      return state
  }
}

const store = createStore(themeReducer)

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <Provider store={store}>
          <div>
            <Header />
            <Content />
          </div>
        </Provider>
      </div>
    );
  }
}

export default App;
