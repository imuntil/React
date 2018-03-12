import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import TopBanner from '@/components/TopBanner'

const Test = () => {
  return (
    <section className="container text-page">
      <div className="main-body">
        <TopBanner title={'选择题'}>
          <img src={require('../../assets/test-banner.jpg')} alt="" />
        </TopBanner>
      </div>
    </section>
  )
}

export default connect()(Test)
