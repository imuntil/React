import React, { memo } from 'react'
import PropTypes from 'prop-types'
import styles from './DndItem.module.scss'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles)

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
          style={{ color: '#00be06' }}
          styleName="icon-font"
          className="iconfont icon-iqiyi"
        />
      )
    default:
      return (
        <i
          style={{ color: '#fb7299' }}
          styleName="icon-font"
          className="iconfont icon-fanju"
        />
      )
  }
}

const DndItem = memo(function DndItem(props) {
  return (
    <div
      className={cx('container', {
        dragging: props.isDragging,
        'dragging-over': props.isDraggingOver
      })}
    >
      <div styleName="cover">
        <img src="https://dummyimage.com/120x120?text=PNG" alt="" />
      </div>
      <div styleName="box">
        <div styleName="title">{props.name}</div>
        <div styleName="some">
          <Icon from={props.from} />
        </div>
      </div>
    </div>
  )
})

DndItem.propTypes = {
  name: PropTypes.string,
  from: PropTypes.string,
  isDragging: PropTypes.bool,
  isDraggingOver: PropTypes.bool
}

export default DndItem
