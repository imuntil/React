import React, { useState } from 'react'
import { useTrail, animated as a, config } from 'react-spring'

import './styles.css'

const Trail: React.FC<any> = ({ children }) => {
  const items = React.Children.toArray(children)
  const trail = useTrail(items.length, {
    config: config.stiff,
    // config: { mass: 5, tension: 2000, friction: 200 },
    opacity: 1,
    // x: 0,
    // height: 40,
    transform: 'translate(0, 0)',
    from: { opacity: 0, transform: 'translate(10px, 10px)' },
    // from: { opacity: 0, x: 20, height: 0 },
  })
  return (
    <div>
      {trail.map((style, index) => (
        <a.div key={index} className="list-cell" style={style}>
          <a.div>{items[index]}</a.div>
        </a.div>
      ))}
    </div>
  )
}

export default function TrailSimple() {
  const [extra, setExtra] = useState<string[]>([])

  const handleClick = () => {
    const arr = Array(10)
      .fill('')
      .map(() => Math.random() + '')
    setExtra((prev) => [...prev, ...arr])
  }

  return (
    <div>
      <button onClick={handleClick}>add extra</button>
      <Trail>
        {/* <span>Lorem</span>
        <span>Ipsum</span>
        <span>Dolor</span>
        <span>Sit</span> */}
        {extra.map((v) => (
          <span key={v}>{v}</span>
        ))}
      </Trail>
    </div>
  )
}
