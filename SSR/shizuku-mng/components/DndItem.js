import React, { memo } from 'react'
import PropTypes from 'prop-types'
import styles from './DndItem.module.scss'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles)

const sorts = {
  bilibili: 0,
  iqiyi: 1,
  bangumi: 2
}

const Icon = ({ from }) => {
  switch (from) {
    case 'bilibili':
      return (
        <i
          style={{ color: '#00a1d6' }}
          styleName="icon-font"
          className="iconfont icon-bilibili"
        />
      )
    case 'iqiyi':
      return (
        <i
          style={{ color: '#00be06', fontSize: '1.2rem' }}
          styleName="icon-font"
          className="iconfont icon-iqiyi"
        />
      )
    default:
      return (
        <i
          style={{ color: '#fb7299', fontSize: '1.2rem' }}
          styleName="icon-font"
          className="iconfont icon-fanju"
        />
      )
  }
}

const DndItem = memo(function DndItem(props) {
  const from = Array.isArray(props.from)
    ? props.from.sort((a, b) => sorts[a] - sorts[b])
    : [props.from]
  return (
    <div
      className={cx('container', {
        dragging: props.isDragging,
        'dragging-over': props.isDraggingOver
      })}
    >
      <div styleName="cover" onClick={props.onClick}>
        <img
          src={`https://dummyimage.com/120x120?text=${props.cover}`}
          alt=""
        />
      </div>
      <div styleName="box">
        <div styleName="title">{props.name}</div>
        <div styleName="some">
          {from.map(v => (
            <Icon from={v} key={v} />
          ))}
        </div>
      </div>
    </div>
  )
})

DndItem.propTypes = {
  name: PropTypes.string,
  from: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  isDragging: PropTypes.bool,
  isDraggingOver: PropTypes.bool,
  cover: PropTypes.string,
  onClick: PropTypes.func
}

export default DndItem
