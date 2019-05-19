import React, { useState, useEffect } from 'react'

const useMounted = () => {
  const [mounted, setMounted] = useState(false)
  const mountedHook = () => {
    console.log('mounted')
    setMounted(true)
  }

  const unmountHook = () => {
    console.log('unmount')
    setMounted(false)
  }
  useEffect(() => {
    !mounted && mountedHook()
    return unmountHook
  }, [])

  return mounted
}

export default function HOOKS() {
  const [count, setCount] = useState(0)

  const componentDidUpdate = () => {
    console.log('update')
  }

  const mounted = useMounted()
  useEffect(() => {
    mounted && componentDidUpdate()
  })

  return (
    <div>
      you has clicked {count} times
      <div>
        <button onClick={() => void setCount(count + 1)}>Click</button>
      </div>
    </div>
  )
}
