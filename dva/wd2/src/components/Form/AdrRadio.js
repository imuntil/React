import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import './AdrRadio.scss'

class AdrRadio extends PureComponent {
  state = { value: false }
  constructor(props) {
    super(props)
    this.state = { value: props.checked }
  }

  componentWillReceiveProps(nextProps) {
    const { checked, name } = nextProps
    if (checked !== this.state.value) {
      this.setState({ value: checked })
    }
  }

  handleClick = value => {
    const { cancelAble, onChange } = this.props
    if (!cancelAble && value) return
    this.setState({ value: !value })
    onChange(!value)
  }
  render() {
    const { className, text } = this.props
    const value = this.state.value
    return (
      <a
        href="javascript:;"
        onClick={() => this.handleClick(value)}
        className={`radio-20s4k ${className} ${value && 'checked-20s4k'}`}
      >
        <i />
        {text}
      </a>
    )
  }
}

AdrRadio.defaultProps = {
  onChange: () => {},
  checked: false,
  className: '',
  cancelAble: true
}

AdrRadio.propTypes = {
  text: PropTypes.string,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  className: PropTypes.string,
  cancelAble: PropTypes.bool,
  name: PropTypes.string,
}

export default AdrRadio
