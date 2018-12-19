import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './Drag.module.scss'
import cssModules from 'react-css-modules'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const grid = 8

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'red',

  // styles we need to apply on draggables
  ...draggableStyle
})

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'grey',
  padding: grid,
  width: 250
})

class Drag extends Component {
  static propTypes = {
    // prop: PropTypes
  }

  state = {
    bgmList: [
      { id: 1, name: '兔女郎学姐', src: 'xx1.png' },
      { id: 2, name: 'jojo', src: 'xx2.png' }
    ],
    biliList: [
      { id: 2414, name: '青春兔女郎学姐', src: 'bb1.png' },
      { id: 7492, name: 'ssss', src: 'bb2.png' }
    ]
  }

  onDragEnd = result => {
    // dropped outside the list
    console.log(result)
    if (!result.destination) {
      return
    }

    const biliList = reorder(
      this.state.biliList,
      result.source.index,
      result.destination.index
    )

    this.setState({
      biliList
    })
  }

  render() {
    const { bgmList, biliList } = this.state
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="bgm">
          <h2>this is bgm</h2>
          <Droppable droppableId="droppable">
            {(droppableProvided, droppableSnapshot) => (
              <div
                ref={droppableProvided.innerRef}
                style={getListStyle(droppableSnapshot.isDraggingOver)}
              >
                {biliList.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(draggableProvided, draggableSnapshot) => (
                      <div
                        ref={draggableProvided.innerRef}
                        {...draggableProvided.draggableProps}
                        {...draggableProvided.dragHandleProps}
                        style={getItemStyle(
                          draggableSnapshot.isDragging,
                          draggableProvided.draggableProps.style
                        )}
                      >
                        {item.name}
                      </div>
                    )}
                  </Draggable>
                ))}
                {droppableProvided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    )
  }
}

export default cssModules(Drag, styles)
