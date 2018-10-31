import React from 'react'
import PropTypes from 'prop-types'
import cssModules from 'react-css-modules'
import styles from './BangumiCard.module.scss'

function BangumiCard({
  link = 'https://imuntil.com',
  title = '青春猪头少年不会梦到兔女郎学姐ssss古利特曼',
  wa = 5,
  follow = false
}) {
  return (
    <div styleName="season-group">
      <div styleName="time">22:00</div>
      <div styleName="season-list">
        <a href={link} styleName="bgm-pic">
          <img src={require('../../assets/bgm-card.webp')} alt="" />
        </a>
        <div styleName="season-body">
          <a href={link}>
            <div title={title} styleName="title">
              {follow ? <span styleName="follow">已追番</span> : null}
              {title}
            </div>
          </a>
          <a href={link} styleName="wa">
            <span>第{wa}话</span>
          </a>
        </div>
      </div>
    </div>
  )
}

BangumiCard.propTypes = {
  follow: PropTypes.bool,
  time: PropTypes.string,
  thumb: PropTypes.string,
  title: PropTypes.string,
  wa: PropTypes.number,
  link: PropTypes.string,
  onClick: PropTypes.func
}

export default cssModules(BangumiCard, styles)
