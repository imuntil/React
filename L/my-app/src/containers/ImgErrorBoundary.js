import React, { Component } from 'react'
import { mockImg } from '@/utils'
const LoadErrImg = () => (
  <img src={mockImg(600, 335, 'EEE', 'AAA', 'img has gone =.=||')} alt="o.0" />
)

export default class ImgErrorBoundary extends Component {
  state = {
    hasError: false
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch = (error, info) => {
    console.log(error)
    console.log(info)
  }

  render() {
    if (this.state.hasError) {
      return <LoadErrImg />
    }
    return this.props.children
  }
}
