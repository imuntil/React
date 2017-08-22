import * as React from 'react'
import { connect } from 'react-redux'
import { mapStateToProps } from '../lib/props'
import ThemeSwitch from './ThemeSwitch'
import FontSizeSwitch from './FontSizeSwitch'

class Content extends React.Component {
  render () {
    return (
      <div>
        <p style={{color: this.props.themeColor}}>
          O(∩_∩)O
        </p>
        <ThemeSwitch />
        <FontSizeSwitch />
      </div>
    )
  }
}

export default connect(mapStateToProps)(Content)