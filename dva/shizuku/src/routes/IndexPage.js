import React from 'react'
import {connect} from 'dva'
import Yozora from '../components/Yozora'
import './IndexPage.scss'

function IndexPage() {
  return (
    <Yozora />
  )
}

IndexPage.propTypes = {}

export default connect()(IndexPage)
