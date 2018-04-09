import React, { PureComponent } from 'react'
import { connect } from 'dva'
import './UserIndex.scss'

@connect()
export default class UserIndex extends PureComponent {
  render () {
    return <div className="container ao289">
      user index
    </div>
  }
}
