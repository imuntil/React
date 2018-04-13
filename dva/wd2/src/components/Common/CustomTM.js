import React, { PureComponent } from 'react'
import { TransitionMotion, presets, spring } from 'react-motion'

const setStyle = (maxHeight, marginBottom, opacity) => ({
  maxHeight,
  marginBottom,
  opacity
})

export default class CustomTM extends PureComponent {
  getDefaultStyle = () => {
    return this.props.list.map(v => ({
      key: `${v}`,
      style: setStyle(0, 0, 0)
    }))
  }

  getStyles = () => {
    return this.props.list.map(v => ({
      key: `${v}`,
      style: setStyle(
        spring(180, presets.gentle),
        spring(15, presets.gentle),
        spring(1, presets.gentle)
      )
    }))
  }

  willEnter() {
    return setStyle(0, 0, 0)
  }

  willLeave() {
    return { ...setStyle(spring(0), spring(0), spring(0)), height: 0 }
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
