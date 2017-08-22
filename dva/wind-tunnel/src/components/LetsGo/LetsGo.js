import React from 'react'
import styles from './letsGo.less'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import PropTypes from 'prop-types'

class LetsGo extends React.Component {
  _timer = null
  constructor () {
    super()
    this.state = {
      current: 0
    }
  }
  componentDidMount = () => {
    this._timer = setInterval(() => {
      let { current } = this.state
      this.setState({
        current: (++current) % 4
      })
    }, 150)
  }
  componentWillUnmount = () => {
    clearInterval(this._timer)
    this._timer = null
  }
  handleClick = () => {
    const { letsGo } = this.props
    letsGo()
  }
  render () {
    let { current } = this.state
    return (
      <div className={styles.box}>
        <div className={styles.normal}>
          <img src={require('../../assets/let-go.png')} alt=""/>
          <div className={styles.man}>
            <ReactCSSTransitionGroup
              transitionName={{
                appear: 'animated',
                appearActive: 'tada'
              }}
              transitionEnter={false}
              transitionLeave={false}
              transitionAppear={true}
              transitionAppearTimeout={2000}
            >
              <img src={require('../../assets/let-go-man.png')} alt=""/>
            </ReactCSSTransitionGroup>
          </div>
          <div className={styles.color_box}>
            <img src={require(`../../assets/color-${current + 1}.png`)} alt=""/>
          </div>
        </div>
        <a href="javascript:;" className={styles.btn} onClick={this.handleClick}>立即体验</a>
      </div>
    )
  }
}

LetsGo.propTypes = {
  letsGo: PropTypes.func.isRequired
}

export default LetsGo
