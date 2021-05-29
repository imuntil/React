import React from 'react'
import useResizeAware from 'react-resize-aware'

interface Props {}

const ReactResizeAware = (props: Props) => {
  const [resizeListener, sizes] = useResizeAware()

  return (
    <div style={{ position: 'relative' }}>
      {resizeListener}
      Your content here. (div sizes are {sizes.width} x {sizes.height})
    </div>
  )
}

export default ReactResizeAware
