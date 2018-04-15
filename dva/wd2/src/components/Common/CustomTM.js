import React, { PureComponent } from 'react'
import { TransitionMotion, presets, spring } from 'react-motion'
import PropTypes from 'prop-types'

const setStyle = (maxHeight, marginBottom, opacity) => ({
  maxHeight,
  marginBottom,
  opacity
})

export default class CustomTM extends PureComponent {
  static defaultProps = {
    maxHeight: 180,
    marginBottom: 15
  }
  static propTypes = {
    renderCell: PropTypes.func.isRequired,
    list: PropTypes.array.isRequired,
    forceRender: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.number,
      PropTypes.string
    ]),
    maxHeight: PropTypes.number,
    marginBottom: PropTypes.number,
  }

  getDefaultStyle = () => {
    return this.props.list.map(v => ({
      key: `${v}`,
      style: setStyle(0, 0, 0)
    }))
  }

  getStyles = () => {
    const { list, maxHeight, marginBottom } = this.props
    return list.map(v => ({
      key: `${v}`,
      style: setStyle(
        spring(maxHeight, presets.gentle),
        spring(marginBottom, presets.gentle),
        spring(1, presets.gentle)
      )
    }))
  }

  willEnter() {
    return setStyle(0, 0, 0)
  }

  willLeave() {
    return { ...setStyle(spring(0), spring(0), spring(0)) }
  }

  render() {
    const { renderCell } = this.props
    return (
      <TransitionMotion
        defaultStyles={this.getDefaultStyle()}
        styles={this.getStyles()}
        willLeave={this.willLeave}
        willEnter={this.willEnter}
      >
        {styles => (
          <div className="scroll-box">
            {styles.map(({ data, key, style }, index) => (
              <div key={key} style={style}>
                {renderCell(index, key)}
              </div>
            ))}
          </div>
        )}
      </TransitionMotion>
    )
  }
}
