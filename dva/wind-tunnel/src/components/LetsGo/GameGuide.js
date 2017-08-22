import React from 'react'
import PropTypes from 'prop-types'
import BounceInUp from '../../components/Animation/BounceInUp'
import Rules from '../Rules/Rules'
import styles from './GameGuide.less'

function GameGuide({onStart}) {
  return (
    <div className={styles.box}>
      <div className={styles.normal}>
        <BounceInUp>
          <img className={styles.d1} src={require("../../assets/start-p1.png")} alt=""/>
        </BounceInUp>
        <BounceInUp>
          <img className={styles.d2} src={require('../../assets/start-p2.png')} alt=""/>
        </BounceInUp>
        <BounceInUp>
          <img className={styles.d3} src={require('../../assets/start-p3.png')} alt=""/>
        </BounceInUp>
        <BounceInUp>
          <a href="javascript:;"
             onClick={onStart}
             className={styles.start}>
            <img src={require('../../assets/start-btn.png')} alt=""/>
          </a>
        </BounceInUp>
      </div>
      <Rules />
    </div>
  )
}
GameGuide.propTypes = {
  onStart: PropTypes.func.isRequired
}
export default GameGuide
