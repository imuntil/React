import React from 'react'
import './LeftNav.css'
import PropTypes from 'prop-types'

function LeftNav({index, onHashChange}) {
  const titles = ['关于骊住', '企业理念', '历史沿革', '公司信息']
  return (
    <ul className="left-nav">
      {
        titles.map((title, i) => (
          <li key={i}>
            <a className={i === index ? 'current' : null}
               onClick={() => {
              onHashChange(i)
            }} href="javascript:void(0);">{title}<span/></a>
          </li>
        ))
      }
    </ul>
  )
}
LeftNav.propTypes = {
  index: PropTypes.number.isRequired,
  onHashChange: PropTypes.func.isRequired
}
export default LeftNav