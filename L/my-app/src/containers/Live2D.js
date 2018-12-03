import React, { Component } from 'react'
import cssModules from 'react-css-modules'
import styles from './Live2D.module.scss'
import '@/lib/live2d.format'

class Live2D extends Component {
  componentDidMount = () => {
    try {
      window.loadlive2d(
        'live2d',
        `${process.env.PUBLIC_URL}/hijiki/hijiki.model.json`
      )
    } catch (error) {
      console.log(error)
    }
  }
  handlePreventClick = e => {
    e.preventDefault()
    e.stopPropagation()
    return false
  }
  render() {
    return <canvas styleName="canvas" id="live2d" width="200" height="230" />
  }
}

export default cssModules(Live2D, styles)
