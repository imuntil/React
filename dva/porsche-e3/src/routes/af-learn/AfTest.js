import React, { Component } from 'react'
import { connect } from 'dva'
import QueueAnim from 'rc-queue-anim'
import TopBanner from '@/components/TopBanner'
import WordQuestion from '@/components/WordQuestion'
import ques from '@/utils/af-ques'
import './AfTest.scss'

class Timer {
  time = null
  timeBackup = null
  timer = null
  constructor(time = 30) {
    this.time = this.timeBackup = time
  }
  run = () => {
    this.timer = setTimeout(() => {
      this.time--
      this.time > 0 && this.run()
    }, 1000)
  }
  cancel = () => {
    clearTimeout(this.timer)
    this.time = this.timeBackup
  }
}


class AfTest extends Component {
  state = {
    currentIndex: 0,
    timer: new Timer()
  }
  /* 用户答题结果 */
  answers = []
  componentDidMount = () => {
    // this.timer.run()
    // this.state.timer.run()
  }

  handleClick = i => {
    if (this.answers[i] === undefined) {
      console.log('请完成此题')
      return
    }
    if (i >= 9) {
      return
    }
    this.setState({
      currentIndex: i + 1
    })
  }
  handleSubmit = () => {
    if (this.answers[ques.length - 1] === undefined) {
      console.log('请完成此题')
      return
    }
    console.log(this.answers)
    const points = this.answers.filter(v => v).length * 10
    console.log('成绩为:', points)
  }
  handleAnswer = (index, ans) => {
    this.answers[index] = ans
  }
  render() {
    const { currentIndex, timer } = this.state
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
              {/* <span className="timer">{timer.time}</span> */}
              <div className="question">
                <QueueAnim type={['right', 'left']}>
                  {currentIndex % 2 === 0 ? (
                    <WordQuestion
                      key={0}
                      index={currentIndex + 1}
                      qt={currentQue}
                      type="word"
                      onAnswer={this.handleAnswer}
                    />
                  ) : (
                    <WordQuestion
                      key={1}
                      index={currentIndex + 1}
                      qt={currentQue}
                      type="word"
                      onAnswer={this.handleAnswer}
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
