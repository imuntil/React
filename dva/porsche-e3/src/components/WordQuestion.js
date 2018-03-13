import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './WordQuestion.scss'

class WordQuestion extends Component {
  state = {
    chosen: -1,
    status: false
  }
  handleClick = (index, ans) => {
    this.setState({ chosen: index, status: ans })
    this.props.onAnswer({ index, v: ans })
  }
  render() {
    const { index, qt } = this.props
    const { chosen } = this.state
    const options = ['A', 'B', 'C', 'D']
    return (
      <div className="question word-question">
        <p>
          {index}、{qt.question}
        </p>
        <ul>
          {qt.answer.map((v, i) => (
            <li className={`options ${chosen === i && 'chosen'}`} key={i}>
              <a
                href="javascript:;"
                onClick={() => {
                  this.handleClick(i, v.v)
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
  onAnswer: PropTypes.func.isRequired
}

export default WordQuestion
