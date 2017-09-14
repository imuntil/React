import React from 'react'

function someForm(state, FnComponent, onSubmit) {
  class SomeForm extends React.Component {
    constructor(props) {
      super(props)
      const { user } = this.props
      const s = { ...state }
      if (user && user.name) {
        s.v = user.name
        s.valid = true
      }
      this.state = { ...s,  submit: false }
    }
    setSubmit = () => {
      this.setState({ submit: true })
      setTimeout(() => {
        this.setState({ submit: false })
      }, 600)
    }
    handleSubmit = () => {
      const { submit } = this.state
      if (submit) return false
      this.setSubmit()
      onSubmit()
    }
    handleInputChange = (status, v, msg) => {
      const { error } = msg
      this.setState({
        [status]: {
          v: error ? '' : v,
          valid: !error
        }
      })
    }
    render() {
      return (
        <FnComponent
          { ...this.state }
          { ...this.props }
          handleSubmit={this.handleSubmit}
          handleInputChange={this.handleInputChange}
        />
      )
    }
  }
  return SomeForm
}

export default someForm
