import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './WordQuestion.scss'

const Pic = ({ chosen, index, qt, className, onClick }) => {
  const options = ['A', 'B', 'C', 'D']
  const { question: q, foo, answer } = qt
  return (
    <div className={`question pic-question ${className}`}>
      <p>
        {index}、{q[0]} <br />
        {q[1] ? <img src={q[1]} alt="" /> : null}
      </p>
      <ul>
        {answer.map((v, i) => (
          <li key={i} className={`options ${chosen === i && 'chosen'} ${foo === 2 && 'words'}`}>
            <a href="javascript:;" onClick={() => { onClick(i, v.v, index - 1) }}>
              {foo === 2 ? (
                <span>
                  <i>{options[i]}</i>、{v.q}
                </span>
              ) : (
                <figure>
                  <figcaption>{options[i]}</figcaption>
                  <img src={v.q} alt="" />
                </figure>
              )}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

class WordQuestion extends Component {
  state = {
    chosen: -1,
    status: false
  }

  handleClick = (current, ans, index) => {
    if (!this.props.ansAble) return
    this.setState({ chosen: current, status: ans })
    this.props.onAnswer(index, ans)
  }
  render() {
    const { index, qt, className, type } = this.props
    const { chosen } = this.state
    const options = ['A', 'B', 'C', 'D']
    return type === 'pic' ? (
      <Pic chosen={chosen} qt={qt} className={className} index={index} onClick={this.handleClick} />
    ) : (
      <div className={`question word-question ${className}`}>
        <p>
          {index}、{qt.question}
        </p>
        <ul>
          {qt.answer.map((v, i) => (
            <li className={`options ${chosen === i && 'chosen'}`} key={i}>
              <a
                href="javascript:;"
                onClick={() => {
                  this.handleClick(i, v.v, index - 1)
                }}
              >
                <i>{options[i]}</i>、{v.q}
              </a>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

WordQuestion.propTypes = {
  index: PropTypes.number.isRequired,
  qt: PropTypes.object.isRequired,
  onAnswer: PropTypes.func.isRequired,
  className: PropTypes.string,
  ansAble: PropTypes.bool
}

export default WordQuestion
