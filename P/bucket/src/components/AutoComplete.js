import React from 'react'
import PropTypes from 'prop-types'
import styles from './AutoComplete.less'

class AutoComplete extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      displayValue: '',
      activeItemIndex: -1
    }
  }
  handleChange (value) {
    this.setState({
      displayValue: '',
      activeItemIndex: -1
    })
    this.props.onValueChange(value)
  }
  handleKeyDown (e) {
    const { activeItemIndex } = this.state
    const { options } = this.props

    switch (e.keyCode) {
      case 13: {
        if (activeItemIndex >= 0) {
          e.preventDefault()
          e.stopPropagation()
          this.handleChange(this._getItemValue(options[activeItemIndex]))
        }
        break
      }
      case 38:
      case 40: {
        e.preventDefault()
        // this
        this._moveItem(e.keyCode === 38 ? 'up' : 'down')
        break;
      }
    }
  }
  handleEnter (index) {
    const currentItem = this.props.options[index]
    this.setState({
      activeItemIndex: index,
      displayValue: this._getItemValue(currentItem)
    })
  }
  handleLeave () {
    this.setState({
      activeItemIndex: -1,
      displayValue: ''
    })
  }
  _getItemValue (item) {
    return item.value || item;
  }
  _moveItem (direction) {
    const { activeItemIndex } = this.state
    const { options } = this.props
    const lastIndex = options.length - 1

    let newIndex = -1
    if (direction === 'up') {
      if (activeItemIndex === -1) {
        newIndex = lastIndex
      } else {
        newIndex = activeItemIndex - 1
      }
    } else {
      if (activeItemIndex < lastIndex) {
        newIndex = activeItemIndex + 1
      }
    }
    let newDisplayValue = ''
    if (newIndex >= 0) {
      newDisplayValue = this._getItemValue(options[newIndex])
    }

    this.setState({
      displayValue: newDisplayValue,
      activeItemIndex: newIndex
    })
  }
  render () {
    const { displayValue, activeItemIndex } = this.state
    const { value, options } = this.props
    return (
      <div className={styles.wrapper}>
        <input type="text"
               onChange={e => this.handleChange(e.target.value)}
               onKeyDown={this.handleKeyDown.bind(this)}
               value={displayValue || value}/>
        {
          options.length > 0 && (
            <ul className={styles.options} onMouseLeave={this.handleLeave.bind(this)}>
              {
                options.map((item, index) => {
                  return (
                    <li key={index}
                        className={index === activeItemIndex ? styles.active : ''}
                        onClick={() => this.handleChange(this._getItemValue(item))}
                        onMouseEnter={() => this.handleEnter(index)}>
                      {item.text || item}
                    </li>
                  )
                })
              }
            </ul>
          )
        }
      </div>
    )
  }
}

AutoComplete.porpTypes = {
  value: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onValueChange: PropTypes.func.isRequired
}

export default AutoComplete