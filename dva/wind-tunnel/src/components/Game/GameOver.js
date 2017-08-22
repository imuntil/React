import React from 'react'
import styles from './GameOver.less'
import PropTypes from 'prop-types'

function GameOver({onGameOver}) {
  return (
    <div className={styles.layer}>
      <div className={styles.box}>
        <img src={require('../../assets/game-over-bg.png')} alt=""/>
        <div className={styles.word}>
          <p>成功漂浮了xx秒</p>
          <p>快来留下个人信息，赢取飞行卡！</p>
          <p>让SKYYVODKA带你上天，带你飞！</p>
        </div>
        <a href="javascript:;" onClick={onGameOver}>填写个人信息</a>
      </div>
    </div>
  )
}

GameOver.propTypes = {
  onGameOver: PropTypes.func.isRequired
}

export default GameOver
