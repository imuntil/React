import React, { Component } from 'react'

enum Gender {
  male = 0,
  female,
}

interface Props {}
interface State {
  name: string
  age: number
  gender: Gender
}

export default class StudentCard extends Component<Props, State> {
  state = {
    name: '',
    age: 0,
    gender: Gender.male,
  }

  // React.ChangeEvent<HTMLInputElement>
  handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ name: e.target.value })
  }

  handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ age: +e.target.value })
  }

  handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(`e.target.value`, e.target.value)
    this.setState({ gender: +e.target.value })
  }

  render() {
    return (
      <div>
        <div>
          <input
            type="text"
            value={this.state.name}
            onChange={this.handleNameChange}
          />
        </div>
        <div>
          <input
            type="number"
            value={this.state.age}
            onChange={this.handleAgeChange}
          />
        </div>
        <div>
          <input
            type="checkbox"
            name="gender"
            checked={this.state.gender === 0}
            onChange={this.handleGenderChange}
            value={0}
          />
          <input
            type="checkbox"
            name="gender"
            checked={this.state.gender === 1}
            onChange={this.handleGenderChange}
            value={1}
          />
        </div>
      </div>
    )
  }
}
