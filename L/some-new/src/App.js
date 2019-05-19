import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import SASS from './SASS'
import HOOKS from './HOOKS'

function App() {
  const [visible, setVisible] = useState(true)
  return (
    <div className="App">
      {/* <SASS /> */}
      {visible ? <HOOKS /> : null}
      <br />
      <button onClick={() => setVisible(!visible)}>Toggle</button>
    </div>
  )
}

export default App
