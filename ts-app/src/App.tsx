import React, { useEffect } from 'react'
import logo from './logo.svg'
import BtnList from './components/BtnList'
import alert from './components/Alert'
import StudentCard from './components/StudentCard'
import './App.css'

const list = [{ txt: 'abc' }, { txt: 'def', count: 100 }]
function App() {
  useEffect(() => {
    setTimeout(() => {
      alert('lalala', 'hello alert', [{ text: 'OK' }])
    }, 1000)
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <BtnList groupName="btns list" list={list} />
      <StudentCard />
    </div>
  )
}

export default App
