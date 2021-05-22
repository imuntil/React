import React from 'react'
import { observer, Observer } from 'mobx-react'

interface Props {
  from: string
  list: { name: string; complete: boolean }[]
}

const TodoList = (props: Props) => {
  return (
    <Observer>
      {() => (
        <div>
          {props.list.map((v) => (
            <div key={v.name}>
              {v.name} --- {v.complete ? 'done' : 'undo'}
            </div>
          ))}
        </div>
      )}
    </Observer>
  )
}

export default TodoList
