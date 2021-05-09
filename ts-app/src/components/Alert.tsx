import React from 'react'
import ReactDOM from 'react-dom'
import Modal from 'antd-mobile/lib/modal'
import { Action } from 'antd-mobile/lib/modal/PropsType'

export default function alert(
  title: React.ReactNode,
  message: React.ReactNode,
  actions: Action<any>[]
) {
  const div = document.createElement('div')
  document.body.append(div)

  const close = () => {
    ReactDOM.unmountComponentAtNode(div)
    div.remove()
  }

  const footer = actions.map((action) => {
    const oldOnPress = action.onPress || (() => {});
    action.onPress = () => {
      const res = oldOnPress()
      if (res && res.then) {
        res.then(close).catch(() => {})
      } else {
        close()
      }
    }
    return action
  })
  return ReactDOM.render(
    <Modal visible transparent closable={false} title={title} footer={footer}>
      <div>{message}</div>
    </Modal>,
    div
  )
}
