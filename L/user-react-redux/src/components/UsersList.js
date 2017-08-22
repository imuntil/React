import React, { Component } from 'react'
import User from './User'
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '../lib/store'

class UsersList extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      age: '',
      gender: ''
    }
  }
  onUsernameChange (e) {
    this.setState({
      username: e.target.value
    })
  }
  onAgeChange (e) {
    this.setState({
      age: e.target.value
    })
  }
  onGenderChange (e) {
    this.setState({
      gender: e.target.value
    })
  }
  render () {
    const { users, addUser, deleteUser } = this.props
    const { username, age } = this.state
    return (
      <div>
        <div className="add-user">
          <div>Username: <input type="text" onChange={this.onUsernameChange.bind(this)} value={username}/></div>
          <div>Age: <input type="number" onChange={this.onAgeChange.bind(this)} value={age}/></div>
          <div>Gender:
            <label>Male: <input type="radio" onChange={this.onGenderChange.bind(this)} name="gender" value="male"/></label>
            <label>Female: <input type="radio" onChange={this.onGenderChange.bind(this)} name="gender" value="female"/></label>
          </div>
          <button onClick={() => addUser(this.state)}>增加</button>
        </div>
        <div className="users-list">
          {
            users.map((user, index) =>
              <User user={user} index={index} deleteUser={deleteUser} key={index} />
            )
          }
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersList)
