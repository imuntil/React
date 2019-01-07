import { whyDidYouUpdate } from 'why-did-you-update'

export const wdyu = React => {
  if (process.env.NODE_ENV !== 'production') {
    whyDidYouUpdate(React)
  }
}

export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

export const reorderQuoteMap = ({ quoteMap, source, destination }) => {
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

export const combinedQuoteMap = ({ quoteMap, source, combine }) => {
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
