import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

const Modal = (title, message, actions = [{ text: '确定' }]) => {
  let closed = false
  if (!title && !message) {
    return {
      close: () => {}
    }
  }
  const div = document.createElement('div')
  document.body.appendChild(div)

  function close () {
    ReactDOM.unmountComponentAtNode(div)
    if (div && div.parentNode) {
      div.parentNode.removeChild(div)
    }
  }

  const footer = actions.map(btn => {
    const originPress = btn.onPress || function () {}
    btn.onPress = () => {
      if (closed) { return }
      const res = originPress()
      if (res && res.then) {
        res.then(() => {
          closed = true
          close()
        }).catch(() => {})
      } else {
        closed = true
        close()
      }
    }
    return btn
  })

  function renderFooterButton(btn, i) {
    return (
      <a href="javascript:;" className="modal-btn" onClick={btn.onPress} key={i}>{btn.text}</a>
    )
  }

  ReactDOM.render(
    <div className="modal-wrapper">
      <div className="modal">
        {title}
        <br/>
        {message}
        <br/>
        {footer.map((btn, i) => renderFooterButton(btn, i))}
      </div>
    </div>, div
  )

  return {
    close
  }
}

export default Modal