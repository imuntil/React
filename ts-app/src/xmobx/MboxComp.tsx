import React, { useContext } from 'react'
import {
  Observer,
  useLocalObservable,
  useLocalStore,
  MobXProviderContext,
  inject,
  observer,
} from 'mobx-react'

interface Props {}

const MboxComp = (props: any) => {
  // const store = useContext(MobXProviderContext)
  // console.log(`store`, store)
  const { name, age, setAge, setName, intro } = props.userStore
  return (
    <Observer>
      {() => (
        <div>
          <div>name: {name}</div>
          <div>age: {props.userStore.age}</div>
          <div>intro: {intro}</div>
          <div>
            <button
              onClick={() => {
                setName('lalalal')
              }}
            >
              setName
            </button>
            <button
              onClick={() => {
                setAge(100)
              }}
            >
              setAge
            </button>
          </div>
        </div>
      )}
    </Observer>
  )
}

export default inject((stores: any) => stores.store)(MboxComp)
