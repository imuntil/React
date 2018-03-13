import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { withRouter } from 'dva/router'
import './Modal.scss'

const Modal = (
  title,
  message,
  center,
  actions = [{ text: '确定' }],
  showRule = false,
  onClose = function() {},
  onClickRule = function() {}
) => {
  let closed = false
  if (!title && !message) {
    return {
      close: () => {}
    }
  }
  const div = document.createElement('div')
  document.body.appendChild(div)

  function close() {
    ReactDOM.unmountComponentAtNode(div)
    if (div && div.parentNode) {
      div.parentNode.removeChild(div)
    }
  }

  const footer = actions.map(btn => {
    const originPress = btn.onPress || function() {}
    btn.onPress = () => {
      if (closed) {
        return
      }
      const res = originPress()
      if (res && res.then) {
        res
          .then(() => {
            closed = true
            close()
          })
          .catch(() => {})
      } else {
        closed = true
        close()
      }
    }
    return btn
  })

  function renderFooterButton(btn, i) {
    return (
      <a
        href="javascript:;"
        className="modal-btn"
        onClick={btn.onPress}
        key={i}
      >
        {btn.text}
      </a>
    )
  }

  function handleCloseClick() {
    if (closed) return
    if (typeof onClose !== 'function') {
      onClose = function() {}
    }
    onClose()
    closed = true
    close()
  }

  ReactDOM.render(
    <div className="e3-dialog-wrapper">
      <div className="e3-dialog-content animated bounceIn">
        <img
          src={require('../assets/alert-bg.png')}
          alt=""
          width="100%"
          style={{ marginTop: '30px' }}
        />
        <div className="dialog-inner">
          <p className="close-bar">
            <a href="javascript:;" onClick={handleCloseClick}>
              <img
                src={require('../assets/alert-close.png')}
                alt=""
                width="20"
              />
            </a>
          </p>
          <p className="title">{title}</p>
          <div className="dialog-body">
            <div className={`content ${center && 'text--center'}`}>
              {message}
              {showRule ? (
                <p
                  className="rule-wrapper"
                  onClick={() => {
                    handleCloseClick()
                    onClickRule && onClickRule()
                  }}
                >
                  <img
                    src={require('../assets/act-rules.jpg')}
                    alt=""
                    width="100%"
                  />
                </p>
              ) : null}
            </div>
          </div>
          <p className="confirm-bar">
            {footer.map((btn, i) => renderFooterButton(btn, i))}
          </p>
        </div>
      </div>
    </div>,
    div
  )

  return {
    close
  }
}

export default Modal
