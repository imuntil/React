import React, {PureComponent} from 'react'
import {connect} from 'dva'
import Yozora from '../components/Yozora'
import './IndexPage.scss'

@connect()
class IndexPage extends PureComponent {
  componentDidMount() {
    // x
  }
  render () {
    return (
      <Yozora className="IndexPage">
        IndexPage
      </Yozora>
    )
  }
}

export default IndexPage
