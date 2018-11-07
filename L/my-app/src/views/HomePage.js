import React, { Component } from 'react'
import cssModules from 'react-css-modules'
import Bangumi from '@/containers/Bangumi/Bangumi'
import styles from './HomePage.module.scss'

class HomePage extends Component {
  render() {
    return (
      <div style={{ padding: '1rem' }}>
        <Bangumi />
      </div>
    )
  }
}

export default cssModules(HomePage, styles)