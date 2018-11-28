import React from 'react'
import PropTypes from 'prop-types'
import cssModules from 'react-css-modules'
import styles from './AnimeList.module.scss'
import classNames from 'classnames/bind'
import { Tag } from 'antd'
const cx = classNames.bind(styles)

let Item = ({ date, type, subtitle, title, size, magnet, link }) => {
  return (
    <li styleName="anime-item">
      <div styleName="date">{date}</div>
      <div styleName="type">
        <Tag color="#2db7f5" style={{ margin: 0 }}>
          {type}
        </Tag>
      </div>
      <div styleName="subtitle">
        {subtitle ? (
          <Tag
            color="magenta"
            style={{
              margin: 0,
              maxWidth: 100,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {subtitle}
          </Tag>
        ) : null}
      </div>
      <div styleName="title">
        <a href={link} target="__blank">
          {title}
        </a>
      </div>
      <div styleName="size">
        <Tag color="#108ee9">{size}</Tag>
      </div>
      <div styleName="magnet">
        <a href={magnet} download={magnet} target="__blank">
          <Tag color="blue" style={{ margin: 0 }}>
            磁链
          </Tag>
        </a>
      </div>
    </li>
  )
}
Item = cssModules(Item, styles)

let Head = () => (
  <li className={cx('anime-item', 'header')}>
    <div styleName="date">日期</div>
    <div styleName="type">类别</div>
    <div styleName="subtitle">字幕组</div>
    <div styleName="title">标题</div>
    <div styleName="size">大小</div>
    <div styleName="magnet">磁链</div>
  </li>
)
Head = cssModules(Head, styles)

const AnimeList = props => {
  const { data } = props
  return (
    <ul styleName="anime-list">
      <Head />
      {data.map(v => (
        <Item {...v} key={v.magnet} />
      ))}
    </ul>
  )
}

AnimeList.propTypes = {
  data: PropTypes.array.isRequired
}

export default cssModules(AnimeList, styles)
