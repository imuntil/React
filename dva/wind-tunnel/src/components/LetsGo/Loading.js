import React from 'react'
import styles from './Loading.less'
import Velocity from 'velocity-animate'
import PropTypes from 'prop-types'

class Loading extends React.Component {
  box1 = null
  box2 = null
  box3 = null
  box4 = null
  componentDidMount () {
    Velocity(this.box1, {
      perspective: '100px',
      top: 0,
      opacity: 1
    }, { duration: 3000, delay: 360, easing: 'easeOutQuad', complete: true })
    Velocity(this.box2, {
      perspective: '100px',
      opacity: 1
    }, {duration: 3000, delay: 900, easing: 'easeOutQuad', complete: true})
    Velocity(this.box3, {
      perspective: '200px'
    }, {duration: 1200, delay: 1800, easing: [0.995, 0.120, 0.980, 0.335], complete: true})
    Velocity(this.box3, {
      opacity: 0,
      scale: 0
    }, {
      duration: 900,
      delay: 2700,
      queue: false,
      complete: () => {
        this.props.onLoadingEnd()
      }
    })
    Velocity(this.box4, {
      height: '100%',
      width: '100%',
      left: 0,
      top: 0
    }, {
      duration: 1200,
      delay: 2100,
      easing: [0.995, 0.120, 0.980, 0.335],
      complete: true})
  }

  render () {
    return (
      <div className={styles.loading}>
        <div className={styles.box_1} ref={ele => this.box1 = ele}>
          <img src={require('../../assets/yy-1.png')} alt=""/>
        </div>
        <div className={styles.box_2} ref={ele => this.box2 = ele}>
          <img src={require('../../assets/yy-2.png')} alt=""/>
        </div>
        <div className={styles.box_3} ref={ele => this.box3 = ele}>
          <img src={require('../../assets/yy-3.png')} alt=""/>
        </div>
        <div className={styles.box_4} ref={ele => this.box4 = ele}/>
      </div>
    )
  }
}
Loading.propTypes = {
  onLoadingEnd: PropTypes.func.isRequired
}
export default Loading
