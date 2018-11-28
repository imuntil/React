import React from 'react'
import PropTypes from 'prop-types'
import { Spin } from 'antd'

const style = {
  position: 'absolute',
  zIndex: 2,
  display: 'flex',
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
  justifyContent: 'center',
  alignItems: 'flex-start',
  paddingTop: '300px',
  backgroundColor: 'rgba(255, 255, 255, .75)'
}

const PartLoading = ({ children, loading, replace = false }) => {
  return (
    <div style={{ position: 'relative' }}>
      {!replace && children}
      {loading ? (
        <div style={style}>
          <Spin />
        </div>
      ) : replace ? (
        children
      ) : null}
    </div>
  )
}

PartLoading.propTypes = {
  loading: PropTypes.bool.isRequired,
  replace: PropTypes.bool
}

export default PartLoading
