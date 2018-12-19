import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DndBoard from '../components/DndBoard'
import { Modal } from 'antd'

const model = {
  id: PropTypes.string,
  name: PropTypes.string,
  src: PropTypes.string,
  from: PropTypes.string,
  content: PropTypes.arrayOf(
    PropTypes.shape({
      from: PropTypes.string,
      id: PropTypes.string
    })
  )
}

const merge = (origin, target) => {}

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const reorderQuoteMap = ({ quoteMap, source, destination }) => {
  const current = [...quoteMap[source.droppableId]]
  const next = [...quoteMap[destination.droppableId]]
  const target = current[source.index]

  // 同一list drag
  if (source.droppableId === destination.droppableId) {
    const reordered = reorder(current, source.index, destination.index)
    const result = {
      ...quoteMap,
      [source.droppableId]: reordered
    }
    return {
      quoteMap: result
    }
  }
  // 不同list drag
  current.splice(source.index, 1)
  next.splice(destination.index, 0, target)
  const result = {
    ...quoteMap,
    [source.droppableId]: current,
    [destination.droppableId]: next
  }
  return {
    quoteMap: result
  }
}

const combinedQuoteMap = ({ quoteMap, source, combine }) => {
  const current = [...quoteMap[source.droppableId]]
  const next = [...quoteMap[combine.droppableId]]
  const target = current[source.index]
  const desIndex = next.findIndex(v => v.id === combine.draggableId)
  const des = next[desIndex]

  current.splice(source.index, 1)
  const newNext = [
    ...next.slice(0, desIndex),
    { ...des, name: des.name + target.name },
    ...next.slice(desIndex + 1)
  ]
  let result = {}
  if (combine.droppableId !== source.droppableId) {
    result = {
      ...quoteMap,
      [combine.droppableId]: newNext,
      [source.droppableId]: current
    }
  } else {
    result = {
      ...quoteMap,
      [combine.droppableId]: [
        ...newNext.slice(0, source.index),
        ...newNext.slice(source.index + 1)
      ]
    }
  }
  return {
    quoteMap: result
  }
}

class DndBoardCt extends Component {
  state = {
    BANGUMI: [
      { id: 1, from: 'bangumi', name: '兔女郎学姐', src: 'xx1.png' },
      { id: 2, from: 'bangumi', name: 'jojo', src: 'xx2.png' },
      { id: 3, from: 'bangumi', name: '史莱姆', src: 'xx2.png' },
      { id: 4, from: 'bangumi', name: '风', src: 'xx2.png' },
      { id: 5, from: 'bangumi', name: '哥杀', src: 'xx2.png' },
      { id: 6, from: 'bangumi', name: '啦啦啦啦', src: 'xx2.png' },
      { id: 7, from: 'bangumi', name: '想不起来了', src: 'xx2.png' },
      { id: 8, from: 'bangumi', name: '全金属', src: 'xx2.png' },
      { id: 9, from: 'bangumi', name: '幸运星', src: 'xx2.png' },
      { id: 10, from: 'bangumi', name: '团长', src: 'xx2.png' }
    ],
    BILIBILI: [
      { id: 2414, from: 'bilibili', name: '青春兔女郎学姐', src: 'bb1.png' },
      { id: 7492, from: 'bilibili', name: 'ssss', src: 'bb2.png' }
    ],
    IQIYI: [
      { id: 145, from: 'iqiyi', name: '哥布林杀手', src: 'ii1.png' },
      { id: 144, from: 'iqiyi', name: '其他', src: 'ii2.png' }
    ],
    visible: false
  }

  onDragEnd = result => {
    this.setState({
      visible: true
    })
    // console.log(result)
    // const { combine, source, destination, type } = result
    // if (combine) {
    //   if (type === 'COLUMN') {
    //     return
    //   }
    //   // 不允许同一个list的item combine
    //   const data = combinedQuoteMap({
    //     quoteMap: this.state,
    //     source,
    //     combine
    //   })
    //   this.setState({ ...data.quoteMap })
    // }
    // if (!destination) return
    // if (
    //   source.droppableId === destination.droppableId &&
    //   source.index === destination.index
    // ) {
    //   return
    // }
    // const data = reorderQuoteMap({
    //   quoteMap: this.state,
    //   source,
    //   destination
    // })
    // this.setState({ ...data.quoteMap })
  }

  handleOk = () => {
    this.handleCancel()
  }
  handleCancel = () => {
    this.setState({ visible: false })
  }

  render() {
    const list = ['BANGUMI', 'BILIBILI', 'IQIYI']
    return (
      <div>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
        <DndBoard values={this.state} keys={list} onDragEnd={this.onDragEnd} />
      </div>
    )
  }
}

export default DndBoardCt
