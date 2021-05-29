import React, { useEffect } from 'react'
// import logo from './logo.svg'
import BtnList from '../../components/BtnList'
import alert from '../../components/Alert'
import StudentCard from '../../components/StudentCard'
import UseObserverComp from '../../xmobx/UseObserverComp'
import UseObserverHOC from '../../xmobx/UseObserverHoc'
// import './App.css'

const list = [{ txt: 'abc' }, { txt: 'def', count: 100 }]
function Demo1() {
  useEffect(() => {
    setTimeout(() => {
      alert('lalala', 'hello alert', [{ text: 'OK' }])
    }, 1000)
  }, [])

  return (
    <div className="Demo1">
      <BtnList groupName="btns list" list={list} />
      <StudentCard />
      <UseObserverComp />
      <hr />
      <UseObserverHOC />
    </div>
  )
}

export default Demo1
