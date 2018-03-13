import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'dva'
import QueueAnim from 'rc-queue-anim'
import TopBanner from '@/components/TopBanner'
import BottomBar from '@/components/BottomBar'
import WordQuestion from '@/components/WordQuestion'
import './Test.scss'

class Test extends Component {
  state = {
    ans: []
  }
  componentWillMount = () => {
    const { dispatch, match } = this.props
    const type = match.params.type === 'word' ? 'Word' : 'Pic'
    dispatch({ type: `question/fetch${type}` })
  }

  /* 处理答题 */
  handleAns = (index, value) => {
    const ans = [...this.state.ans]
    ans[index] = value
    this.setState({
      ans
    })
  }

  /* 提交 */
  handleSubmit = () => {
    const points = this.state.ans.filter(v => v).length * 10
    console.log(points)
  }

  render() {
    const { word, pic, match } = this.props
    const questions = match.params.type === 'word' ? word : pic
    return (
      <section className="container test-page">
        <div className="main-body">
          <TopBanner title={'选择题'} type={true}>
            <img src={require('../../assets/test-banner.jpg')} alt="" />
          </TopBanner>
          <QueueAnim className="question-area">
            {questions.map((qt, i) => (
              <WordQuestion
                key={i}
                index={i + 1}
                qt={qt}
                onAnswer={this.handleAns}
                className="qu-item"
              />
            ))}
          </QueueAnim>
          <p className="text--center">
            <a
              href="javascript:;"
              className="confirm-btn"
              onClick={this.handleSubmit}
            >
              提交
            </a>
          </p>
        </div>
        <BottomBar />
      </section>
    )
  }
}

function mapStateToProps(state) {
  const { word, pic } = state.question
  return { word, pic }
}

export default connect(mapStateToProps)(Test)
