import React, { PureComponent } from 'react'
import { delay } from '@/utils/cts'

export default class Step extends PureComponent {
  state = { submitted: false }

  form = {}

  get formValid() {
    const f = Object.values(this.form)
    if (!f || !f.length) return false
    return f.every(v => v.valid)
  }

  componentWillUnmount = () => {
    this.setState = () => {
      return
    }
  }

  handleChange = ({ value, name, $valid: { valid } }) => {
    this.form[name] = { value, valid }
  }

  handleClick = async () => {
    if (this.state.submitted) return
    this.setState({ submitted: true })
    this.handle()
    await delay(1000)
    this.setState({ submitted: false })
  }

  handle = async () => {
    if (!this.formValid) return
  }
}