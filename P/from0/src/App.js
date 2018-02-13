import React, { Component } from 'react'
import logo from './logo.svg'
import Border from './components/Border'
import Basic from './pages/RouterBasic'
import L2 from './pages/L2'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Border>
          <span>mimi</span>
        </Border>
        <Border>abc</Border>
        <Border>abcddd</Border>
        <Basic />
        <L2 />
      </div>
    )
  }
}

export default App
