import React from 'react'
import { Link } from 'dva/router'
import './BottomBar.scss'

const BottomBar = ({ mode = 3 }) => {
  return (
    <div className={`tab-bottom ${mode === 2 && 'split-2'}`}>
      {mode === 3 ? (
        <ul>
          <li>
            <Link to="/pre-learn">课前学习</Link>
          </li>
          <li>
            <Link to="/training">上市培训</Link>
          </li>
          <li>
            <Link to="/after-learn">课后学习</Link>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link to="/">首页</Link>
          </li>
          <li>
            <Link to="/honor">荣誉</Link>
          </li>
        </ul>
      )}
    </div>
  )
}

export default BottomBar
