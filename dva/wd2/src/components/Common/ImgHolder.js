import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
const placeholder = require('@/assets/placeholder.png')

export default class ImgHolder extends PureComponent {
  static defaultProps = {
    text: 'loading...',
    className: ''
  }

  static propTypes = {
    size: PropTypes.number,
    text: PropTypes.string,
    className: PropTypes.string,
    src: PropTypes.string
  }

  state = { loaded: false }

  constructor(props) {
    super(props)
    const { src } = this.props
    src && this.load(src)
  }

  componentWillUnmount = () => {
    this.setState = (state, cb) => {
      return
    }
  }

  load = src => {
    const img = new Image()
    img.onload = this.loaded
    img.src = src
  }

  loaded = () => {
    this.setState({ loaded: true })
  }

  render() {
    const { size, text, className, src, ...rest } = this.props
    const { loaded } = this.state
    const holderSrc = size
      ? `https://dummyimage.com/${size}x${size}?text=${text}`
      : placeholder
    return (
      <img
        className={className}
        src={loaded ? src : holderSrc}
        alt=""
        {...rest}
      />
    )
  }
}
