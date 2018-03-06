import React from 'react'
import PropTypes from 'prop-types'
import RA from './RotateArrow'
import './TopBanner.scss'

const TopBanner = ({ children, title, type }) => {
  return (
    <div className={`top-banner animated pulse ${type && 'md2'}`}>
      {children}
      <div className="title">
        <RA />
        {title}
      </div>
      <p className="separator" />
    </div>
  )
}

TopBanner.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.bool
}
export default TopBanner
