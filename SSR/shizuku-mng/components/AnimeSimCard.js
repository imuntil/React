import React, { memo } from 'react'
import PropTypes from 'prop-types'
import styles from './AnimeSimCard.module.scss'

const AnimeSimCard = memo(function AnimeSimCard(props) {
  return (
    <div className="sim-card">
      <div className="wrap">
        <span className="label">来源</span>
        <span className="value">bilibili</span>
      </div>
      <div className="wrap">
        <span className="label">封面</span>
        <span className="value">
          <img src="https://dummyimage.com/200x200?text=Anime" alt="" />
        </span>
      </div>
      <div className="wrap">
        <span className="label">番剧名</span>
        <span className="value">兔女郎</span>
      </div>
      <div className="wrap">
        <span className="label">ID</span>
        <span className="value">1239</span>
      </div>
      <span className="wrap">
        <span className="label">放送时间</span>
        <span className="value">每周日</span>
      </span>
      <span className="wrap">
        <span className="label">其他</span>
        <span className="value">x.x.</span>
      </span>
    </div>
  )
})

AnimeSimCard.propTypes = {}

export default AnimeSimCard
