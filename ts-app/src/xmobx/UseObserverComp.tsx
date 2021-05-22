import React, { useContext, useEffect } from 'react'
import {
  Observer,
  useLocalObservable,
  useLocalStore,
  MobXProviderContext,
  inject,
  observer,
} from 'mobx-react'
import TodoList from './TodoList'

interface Props {}

const UseObserverComp = (props: any) => {
  // const store = useContext(MobXProviderContext)
  // console.log(`store`, store)
  const store = props.userStore

  useEffect(() => {
    console.log('comp update')
  })
  return (
    <Observer>
      {() => (
        <div>
          <h1>Observer Component</h1>
          <div>name: {store.name}</div>
          {/* <div>name2: {name}</div> */}
          <div>age: {store.age}</div>
          <div>intro: {store.intro}</div>
          <div>
            <button
              onClick={() => {
                store.setName('lalalal')
              }}
            >
              setName
            </button>
            <button
              onClick={() => {
                store.setAge(100)
              }}
            >
              setAge
            </button>
            <button
              onClick={() => {
                store.addTodo()
              }}
            >
              add todo
            </button>
          </div>
          <TodoList from="component" list={store.todos} />
        </div>
      )}
    </Observer>
    // <div>
    //   <div>name: {name}</div>
    //   <div>age: {props.userStore.age}</div>
    //   <div>intro: {intro}</div>
    //   <div>
    //     <button
    //       onClick={() => {
    //         setName('lalalal')
    //       }}
    //     >
    //       setName
    //     </button>
    //     <button
    //       onClick={() => {
    //         setAge(100)
    //       }}
    //     >
    //       setAge
    //     </button>
    //   </div>
    // </div>
  )
}

export default inject((stores: any) => stores.store)(UseObserverComp)
