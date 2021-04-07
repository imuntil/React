import * as React from 'react'

interface searchFunc {
  (source: string, subString: string): boolean
}

const mySearch: searchFunc = function (x: string, y: string) {
  return x.indexOf(y) > -1
}

export interface BtnListProps {
  groupName: string
  list: { txt: string, count?: number }[]
}

const BtnList = (props: BtnListProps) => {
  return (
    <div>
      <h2>{props.groupName}</h2>
      <ul>
        {props.list.map((v) => (
          <li>
            {v.txt}-{mySearch(props.groupName, v.txt) ? 1 : 0}
            &nbsp;&nbsp;&nbsp;
            <span>count is {v.count || 0}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BtnList
