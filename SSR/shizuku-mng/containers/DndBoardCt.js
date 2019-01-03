import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import DndBoard from '../components/DndBoard'
import ConfirmModal from '../components/ConfirmModal'
import pick from 'lodash.pick'

const model = {
  id: PropTypes.string,
  name: PropTypes.string,
  cover: PropTypes.string,
  from: PropTypes.string,
  content: PropTypes.arrayOf(
    PropTypes.shape({
      from: PropTypes.string,
      id: PropTypes.string
    })
  )
}

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
  const originList = [...quoteMap[source.droppableId]]
  const targetList = [...quoteMap[combine.droppableId]]
  const origin = { ...originList[source.index] }
  const targetIndex = targetList.findIndex(v => v.id === combine.draggableId)
  const target = { ...targetList[targetIndex] }
  // 保存来源，便于 merge 或者取消
  origin._stems = {
    index: source.index,
    from: source.droppableId
  }
  target._stems = {
    index: targetIndex,
    from: combine.droppableId
  }
  // todo
  // 1> 暂时删除origin
  // 2> 返回target & origin
  originList.splice(source.index, 1)
  let result = {}
  if (combine.droppableId !== source.droppableId) {
    result = {
      ...quoteMap,
      [combine.droppableId]: targetList,
      [source.droppableId]: originList
    }
  } else {
    result = {
      ...quoteMap,
      [combine.droppableId]: originList
    }
  }
  return {
    quoteMap: result,
    origin,
    target
  }
}

class DndBoardCt extends Component {
  cache = {}

  state = {
    BANGUMI: [
      { id: 1, from: 'bangumi', name: '兔女郎学姐', cover: 'xx1.png' },
      { id: 2, from: 'bangumi', name: 'jojo', cover: 'xxj2.png' },
      { id: 3, from: 'bangumi', name: '史莱姆', cover: 'xx2.png' },
      { id: 4, from: 'bangumi', name: '风', cover: 'xxf2.png' },
      { id: 5, from: 'bangumi', name: '哥杀', cover: 'xx2.png' },
      { id: 6, from: 'bangumi', name: '啦啦啦啦', cover: 'xx2.png' },
      { id: 7, from: 'bangumi', name: '想不起来了', cover: 'xx2.png' },
      { id: 9, from: 'bangumi', name: '幸运星', cover: 'xx2.png' },
      { id: 10, from: 'bangumi', name: '团长', cover: 'xx2.png' }
    ],
    BILIBILI: [
      { id: 2414, from: 'bilibili', name: '青春兔女郎学姐', cover: 'bb1.png' },
      { id: 7492, from: 'bilibili', name: 'ssss', cover: 'bb2.png' },
      { id: 8344, from: 'bilibili', name: '全金属', cover: 'xxqq2.png' }
    ],
    IQIYI: [
      { id: 145, from: 'iqiyi', name: '哥布林杀手', cover: 'ii1.png' },
      { id: 144, from: 'iqiyi', name: '其他', cover: 'ii2.png' }
    ],
    visible: false,
    target: {},
    origin: {}
  }

  onDragEnd = result => {
    console.log(result)
    this.cache = result
    const { combine, source, destination, type } = result
    if (combine) {
      this.handleMerge(type, source, combine)
      return
    }
    this.handleSort(destination, source)
  }

  /**
   * merge
   * @memberof DndBoardCt
   */
  handleMerge = (type, source, combine) => {
    if (type === 'COLUMN') {
      return
    }
    const data = combinedQuoteMap({
      quoteMap: this.state,
      source,
      combine
    })
    this.setState({
      ...data.quoteMap,
      origin: data.origin,
      target: data.target,
      visible: true
    })
  }

  /**
   * resort
   * @memberof DndBoardCt
   */
  handleSort = (destination, source) => {
    if (!destination) return
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return
    }
    const data = reorderQuoteMap({
      quoteMap: this.state,
      source,
      destination
    })
    this.setState({
      ...data.quoteMap
    })
  }

  handleOk = result => {
    console.log('result', result)
    const { index, from } = result._stems
    const prevList = this.state[from]
    // delete result._stems
    this.setState({
      [from]: [
        ...prevList.slice(0, index),
        result,
        ...prevList.slice(index + 1)
      ],
      origin: {},
      target: {},
      visible: false
    })
  }
  handleCancel = () => {
    // 取消 ‘暂时删除origin’ 的操作
    const { origin } = this.state
    const { index, from } = origin._stems
    const list = this.state[from]
    delete origin._stems
    this.setState({
      [from]: [...list.slice(0, index), origin, ...list.slice(index)],
      origin: {},
      target: {},
      visible: false
    })
  }

  render() {
    const list = ['BANGUMI', 'BILIBILI', 'IQIYI']
    const { visible, target, origin } = this.state
    const values = pick(this.state, list)
    return (
      <Fragment>
        <DndBoard values={values} keys={list} onDragEnd={this.onDragEnd} />
        <ConfirmModal
          visible={visible}
          target={target}
          origin={origin}
          handleOk={this.handleOk}
          handleCancel={this.handleCancel}
        />
      </Fragment>
    )
  }
}

export default DndBoardCt
