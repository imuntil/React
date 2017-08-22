import * as React from 'react'
import { connect } from 'react-redux'
import { mapStateToProps } from '../lib/props'

class Header extends React.Component {
  render() {
    return (
      <h1 style = {
        { color: this.props.themeColor, fontSize: this.props.fontSize } } >
          vscode xx
      </h1>
    )
  }
}

export default connect(mapStateToProps)(Header)