import React from 'react'

function someForm(state, FnComponent, onSubmit) {
  class SomeForm extends React.Component {
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
    state = { ...state, submit: false }
    render() {
      return (
        <FnComponent
          {...this.state}
          handleSubmit={this.handleSubmit}
          handleInputChange={this.handleInputChange}
        />
      )
    }
  }
  return SomeForm
}

export default someForm
