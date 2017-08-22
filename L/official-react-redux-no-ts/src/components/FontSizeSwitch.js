import * as React from 'react'
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '../lib/props'

class FontSizeSwitch extends React.Component {
  handleChangeFontSize (size) {
    if (this.props.onSwitchFontSize) {
      this.props.onSwitchFontSize(size)
    }
  }
  render () {
    const { themeColor, fontSize } = this.props
    return (
      <div>
        <button
          onClick={this.handleChangeFontSize.bind(this, '30px')}
          style={{color: themeColor, fontSize: fontSize}}
        >
          30px
        </button>
        <button
          onClick={this.handleChangeFontSize.bind(this, '12px')}
          style={{color: themeColor, fontSize: fontSize}}
        >
          12px
        </button>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FontSizeSwitch)