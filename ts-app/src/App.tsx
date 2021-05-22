import React, { useEffect } from 'react'
import logo from './logo.svg'
import BtnList from './components/BtnList'
import alert from './components/Alert'
import StudentCard from './components/StudentCard'
import MobxComp from './xmobx/MboxComp'
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
      <BtnList groupName="btns list" list={list} />
      <StudentCard />
      <MobxComp />
    </div>
  )
}

export default App
