import React from 'react'
import Velocity from 'velocity-animate'
import PropTypes from 'prop-types'
import './FuncIntro.css'

class FuncIntro extends React.Component {
  hashs = []
  constructor (props) {
    super(props)
  }
  handleClick(index) {
    const destination = this.hashs[index].getBoundingClientRect().top
    Velocity(document.body, 'scroll', {
      duration: 400,
      offset: destination + document.body.scrollTop - 70
    })
  }
  render () {
    const {tabs, images} = this.props
    return (
      <div className="func-intro-section common-section">
        <div className="func-tab">
          <ul>
            {
              tabs.map((tab, index) => (
                <li key={index}>
                  <a href="javascript:;"
                     onClick={this.handleClick.bind(this, index)}>{tab}</a>
                </li>
              ))
            }
          </ul>
          {
            images.map((image, index) => (
              <div key={index} className="box" ref={ele => this.hashs.push(ele)}>
                <img src={image} width='100%' alt=""/>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

FuncIntro.propTypes = {
  tabs: PropTypes.array.isRequired,
  images: PropTypes.array.isRequired
}
export default FuncIntro