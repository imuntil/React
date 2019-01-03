import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import DndItem from './DndItem'
import styles from './DndColumn.module.scss'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles)

const IQIYI = 'IQIYI'
const BILIBILI = 'BILIBILI'
const BANGUMI = 'BANGUMI'
const NAME_MAP = {
  [IQIYI]: '爱奇艺',
  [BILIBILI]: '哔哩哔哩动画',
  [BANGUMI]: '番组计划'
}

const Title = ({ title }) => {
  switch (title) {
    case BILIBILI:
      return (
        <span style={{ color: '#00a1d6' }}>
          <em>from</em>
          <i className="iconfont icon-bilibili-logo" />
        </span>
      )
    case IQIYI:
      return (
        <span style={{ color: '#00be06' }} className={cx('big-icon')}>
          <em>from</em>
          <i className="iconfont icon-aiqiyi" />
        </span>
      )
    default:
      return (
        <span style={{ color: '#fb7299' }}>
          <em>from</em>
          番组计划
        </span>
      )
  }
}

const DndColumn = memo(function DndColumn(props) {
  const { list, listId, title, index, isCombineEnabled = true, ...rest } = props
  return (
    <div {...rest} styleName="column-box">
      <h3 styleName="column-title">
        <Title title={title} />
      </h3>
      <Droppable
        droppableId={listId}
        index={index}
        isCombineEnabled={isCombineEnabled}
      >
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={cx('column-body', {
              'dragging-over': snapshot.isDraggingOver
            })}
          >
            {list.map((v, i) => (
              <Draggable key={v.id} draggableId={v.id} index={i}>
                {(dp, ds) => (
                  <div
                    ref={dp.innerRef}
                    {...dp.dragHandleProps}
                    {...dp.draggableProps}
                    styleName="item-wrap"
                  >
                    <DndItem
                      isDraggingOver={Boolean(ds.combineTargetFor)}
                      isDragging={ds.isDragging}
                      name={v.name}
                      from={v.from}
                      cover={v.cover}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
})

DndColumn.propTypes = {
  list: PropTypes.array,
  listId: PropTypes.string,
  title: PropTypes.oneOf(Object.keys(NAME_MAP)),
  index: PropTypes.number
}

export default DndColumn
