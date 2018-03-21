import React, { Component } from 'react'
import { connect } from 'dva'
import QueueAnim from 'rc-queue-anim'
import TopBanner from '@/components/TopBanner'
import WordQuestion from '@/components/WordQuestion'
import Stopwatch from '@/components/Stopwatch'
import { Toast } from 'antd-mobile'
import ques from '@/utils/af-ques'
import './AfTest.scss'

class AfTest extends Component {
  state = {
    currentIndex: 0,
    finish: false
  }
  /* 用户答题结果 */
  answers = []

  componentWillMount() {
    const { history } = this.props
    this.block = history.block((location, action) => {
      console.log(location, action)
      return false
    })
  }

  componentWillUnmount() {
    this.block()
  }

  handleClick = i => {
    if (this.answers[i] === undefined) {
      Toast.info('请完成此题', 1)
      return
    }
    this.next()
  }
  handleSubmit = () => {
    if (this.answers[ques.length - 1] === undefined) {
      Toast.info('请完成此题', 1)
      return
    }
    /* 答题结束 */
    this.setState({ finish: true })
    /* 取消倒计时 */
    this.sw.cancel()
    const points = this.answers.filter(v => v).length * 10
    Toast.info(`成绩为:${points}`)
  }
  handleAnswer = (index, ans) => {
    this.answers[index] = ans
  }

  /* 答题超时 */
  handleTimeout = () => {
    Toast.fail('答题超时', 1)
    this.answers[this.state.currentIndex] = false
    this.next()
  }

  /* 下一题 */
  next = () => {
    let { currentIndex } = this.state
    if (currentIndex >= 9) {
      /* 答题结束 */
      this.setState({ finish: true })
      return
    }
    /* 重置sw */
    this.sw && this.sw.reRun()
    this.setState({
      currentIndex: ++currentIndex
    })
  }
  render() {
    const { currentIndex, finish } = this.state
    const currentQue = ques[currentIndex]
    return (
      <section className="container af-test-ju792ka">
        <div className="main-body flex">
          <TopBanner title="试驾体验-测试" type>
            <img
              src={require('../../assets/test-banner.jpg')}
              alt=""
              width="100%"
            />
          </TopBanner>
          <div className="content-area">
            <div className="question-box">
              <Stopwatch
                limit={2}
                onEnd={this.handleTimeout}
                ref={cmp => (this.sw = cmp)}
              />
              <div className="question">
                <QueueAnim type={['right', 'left']}>
                  {currentIndex % 2 === 0 ? (
                    <WordQuestion
                      key={0}
                      index={currentIndex + 1}
                      qt={currentQue}
                      type="word"
                      onAnswer={this.handleAnswer}
                      ansAble={!finish}
                    />
                  ) : (
                    <WordQuestion
                      key={1}
                      index={currentIndex + 1}
                      qt={currentQue}
                      type="word"
                      onAnswer={this.handleAnswer}
                      ansAble={!finish}
                    />
                  )}
                </QueueAnim>
              </div>
              <p className="next-btn">
                {currentIndex < 9 ? (
                  <a
                    href="javascript:;"
                    onClick={() => {
                      this.handleClick(currentIndex)
                    }}
                  >
                    下一题
                  </a>
                ) : (
                  <a href="javascript:;" onClick={this.handleSubmit}>
                    提交
                  </a>
                )}
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default connect()(AfTest)
