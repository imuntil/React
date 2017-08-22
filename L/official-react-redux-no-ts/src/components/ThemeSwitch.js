import * as React from 'react'
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '../lib/props'

class ThemeSwitch extends React.Component {
  hanleSwitchColor(color) {
    if (this.props.onSwitchColor) {
      this.props.onSwitchColor(color)
    }
  }
  render() {
    return (
      <div >
          <button onClick = { this.hanleSwitchColor.bind(this, 'red') }
                  style = {
                    { color: this.props.themeColor } } >
              Red
          </button>
          <button onClick = { this.hanleSwitchColor.bind(this, 'blue') }
                  style = {
                    { color: this.props.themeColor } } >
              Blue
          </button>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ThemeSwitch)