import React, { Component } from 'react'
import { mockImg } from '@/utils'
const _src = mockImg(600, 335, 'EEE', 'AAA', 'img has gone =.=||')
const LoadingImg = props => (
  <img
    src={mockImg(600, 335, 'EEE', 'AAA', 'LOADING...')}
    alt="o.0"
    {...props}
  />
)

export default class Img extends Component {
  state = {
    loadError: false,
    loaded: false
  }

  constructor(props) {
    super(props)
    const { src } = this.props
    this.img = new Image()
    this.img.src = src
    if (this.img.complete) {
      this.state = {
        loaded: true,
        loadError: false
      }
    }
    this.img.onload = this.onLoad
    this.img.onerror = this.onError
  }

  onLoad = () => {
    this.setState({ loaded: true })
  }

  onError = e => {
    const { onError } = this.props
    this.setState({ loaded: true, loadError: true })
    onError && onError(e)
  }

  render() {
    const { onError, src, alt = '', ...rest } = this.props
    const { loaded, loadError } = this.state
    return loaded ? (
      <img {...rest} src={loadError ? _src : src} alt={alt} />
    ) : (
      <LoadingImg {...rest} />
    )
  }
}
