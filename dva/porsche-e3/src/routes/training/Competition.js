import React, { Component } from 'react'
import { connect } from 'dva'
import { ActionSheet } from 'antd-mobile'
import TopBanner from '@/components/TopBanner'
import models from '@/utils/models'
import './Competition.scss'

const cayenneModels = []
const cptModels = []
Object.keys(models).forEach(v => {
  v.indexOf('Cayenne') > -1 ? cayenneModels.push(v) : cptModels.push(v)
})

class Competition extends Component {
  render() {
    return (
      <section className="container cpt-page-d8ej74">
        <div className="main-body flex nb">xx</div>
      </section>
    )
  }
}

export default connect()(Competition)
