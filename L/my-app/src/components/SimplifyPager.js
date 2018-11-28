import React from 'react'
import PropTypes from 'prop-types'
import { Pagination } from 'antd'

const SimplifyPager = ({
  total,
  page,
  next,
  onChange,
  count,
  position = 'top'
}) => {
  const t = total === page && next ? total + 1 : total
  return (
    <div
      style={{
        display: 'flex',
        padding: '1em 0',
        justifyContent: 'space-between',
        alignItems: position === 'top' ? 'flex-end' : 'flex-start'
      }}
    >
      <span style={{ fontSize: 12 }}>共[{count}]条数据</span>
      <Pagination
        defaultCurrent={1}
        current={page}
        pageSize={1}
        total={t}
        onChange={onChange}
      />
    </div>
  )
}

SimplifyPager.propTypes = {
  total: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  next: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
}

export default SimplifyPager
