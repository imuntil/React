import React from 'react'
import PropTypes from 'prop-types'
import styles from './Game.less'

class Game extends React.Component {
  static defaultProps = {
    maxSpeed: 20,
    minA: 4
  }
  constructor (props) {
    super(props)
    this.state = {
      simulation: true
    }
  }
  touchStartHandle (e) {
    console.log('start');
    e.preventDefault()
    if (this.state.simulation) return
    // let a = this.increaseA()
  }
  touchMoveHandle (e) {
    console.log('move');
  }
  touchEndHandle (e) {
    console.log('end');
    this.props.onGameOver()
  }
  increaseA () {
    const { maxSpeed, minA } = this.props
    return (Math.random() * maxSpeed + minA).toFixed(2)
  }
  render () {
    return (
      <div className={styles.game_box}>
        <div className={styles.test_box}>
          <img src={require('../../assets/man.png')} alt="" className="man"/>
        </div>
        <div className={styles.touch_box}
             onTouchStart={this.touchStartHandle.bind(this)}
             onTouchMove={this.touchMoveHandle}
             onTouchEnd={this.touchEndHandle.bind(this)}
        />
      </div>
    )
  }
}

Game.propTypes = {
  maxSpeed: PropTypes.number,
  minA: PropTypes.number,
  onGameOver: PropTypes.func.isRequired
}

export default Game
