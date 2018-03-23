import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'dva'
import QueueAnim from 'rc-queue-anim'
import TopBanner from '@/components/TopBanner'
import BottomBar from '@/components/BottomBar'
import WordQuestion from '@/components/WordQuestion'
import alert from '@/components/Modal'
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

  componentWillUnmount = () => {
    this.setState = (state, callback) => {
      return
    }
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
    const history = this.props.history
    const points = this.state.ans.filter(v => v).length * 10
    alert('信息', `提交成功，成绩为${points}`, true, [
      {
        text: '确定',
        onPress() {
          history.go(-1)
        }
      }
    ])
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
          <QueueAnim className="question-area" interval={200}>
            {questions.map((qt, i) => (
              <WordQuestion
                key={i}
                index={i + 1}
                qt={qt}
                onAnswer={this.handleAns}
                className="qu-item"
                type={match.params.type}
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
