import React, { Component } from 'react'
import Router from './router'
import { UserContext } from './context/user-context'
import { TestContext } from './context/test-context'
// import logo from './logo.svg'

class App extends Component {
  constructor(props) {
    super(props)

    this.login = info => {
      this.setState(({ user }) => ({
        user: {
          ...user,
          info
        }
      }))
    }
    this.logout = () => {
      this.setState(({ user }) => ({
        user: {
          ...user,
          info: {}
        }
      }))
    }

    this.state = {
      user: {
        info: {},
        logout: this.logout,
        login: this.login
      },
      version: {
        current: '1.10'
      }
    }
  }
  render() {
    return (
      <UserContext.Provider value={this.state.user}>
        <TestContext.Provider value={this.state.version}>
          <Router />
        </TestContext.Provider>
      </UserContext.Provider>
    )
  }
}

export default App
