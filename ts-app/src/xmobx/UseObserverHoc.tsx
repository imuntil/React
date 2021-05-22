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

const UserObserverHOC = (props: any) => {
  // const store = useContext(MobXProviderContext)
  // console.log(`store`, store)
  const store = props.userStore
  // const { name, age, setName, setAge, intro, todos, addTodo } = props

  useEffect(() => {
    console.log('hoc updated')
  })
  return (
    // <div>
    //   <h1>observer HOC</h1>
    //   <div>name: {name}</div>
    //   <div>age: {age}</div>
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
    //     <button
    //       onClick={() => {
    //         addTodo()
    //       }}
    //     >
    //       add todo
    //     </button>
    //   </div>
    //   <TodoList from="component" list={todos} />
    // </div>
    <div>
      <h1>observer HOC</h1>
      <div>name: {store.name}</div>
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
  )
}

export default inject((stores: any) => {
  // const { name, age, setName, setAge, intro, todos, addTodo } = stores.store.userStore
  // return { name, age, setName, setAge, intro, todos, addTodo }
  return stores.store
})(observer(UserObserverHOC))
// export default inject((stores: any) => stores.store)(observer(UserObserverHOC))
