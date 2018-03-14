import React from 'react'
import PropTypes from 'prop-types'
import RA from './RotateArrow'
import './TopBanner.scss'

const TopBanner = ({ children, title, type, raVisible = true }) => {
  return (
    <div className={`top-banner animated pulse ${type && 'md2'}`}>
      {children}
      {raVisible ? (
        <div className="title">
          <RA />
          {title}
        </div>
      ) : null}
      <p className="separator" />
    </div>
  )
}

TopBanner.propTypes = {
  title: PropTypes.string,
  type: PropTypes.bool
}
export default TopBanner
