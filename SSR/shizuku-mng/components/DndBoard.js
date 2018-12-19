import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import styles from './DndBoard.module.scss'
import DndColumn from './DndColumn'

const DndBoard = memo(function DndBoard(props) {
  const { onDragEnd, keys, values } = props
  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="board"
          type="COLUNN"
          direction="horizontal"
          isCombineEnabled={false}
        >
          {provided => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              styleName="container"
            >
              {keys.map((v, i) => (
                <DndColumn
                  list={values[v]}
                  listId={v}
                  title={v}
                  index={i}
                  key={v}
                  styleName="dnd-item"
                />
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
})

DndBoard.propTypes = {
  onDragEnd: PropTypes.func.isRequired,
  keys: PropTypes.arrayOf(PropTypes.string).isRequired,
  values: PropTypes.object.isRequired
}

export default DndBoard
