import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cssModules from 'react-css-modules'
import HeaderCt from '@/containers/HeaderCt'
import Live2D from '@/containers/Live2D'
import Footer from '@/components/Footer'
import styles from './DefaultLayout.module.scss'

class DefaultLayout extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  }
  render() {
    return (
      <div styleName="bone">
        <HeaderCt />
        <div className="main">{this.props.children}</div>
        <Live2D />
        <div styleName="footer">
          <Footer />
        </div>
      </div>
    )
  }
}

export default cssModules(DefaultLayout, styles)
