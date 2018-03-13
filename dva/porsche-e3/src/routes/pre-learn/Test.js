import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'dva'
import TopBanner from '@/components/TopBanner'
import WordQuestion from '@/components/WordQuestion'
import { mockTest, fetchQuestions } from '@/services'

class Test extends Component {
  state = {}
  componentWillMount = () => {
    fetchQuestions().then(v => {
      console.log(v)
    })
  }

  render() {
    return (
      <section className="container text-page">
        <div className="main-body">
          <TopBanner title={'选择题'}>
            <img src={require('../../assets/test-banner.jpg')} alt="" />
          </TopBanner>
          <div className="question-area" />
        </div>
      </section>
    )
  }
}

export default connect()(Test)
