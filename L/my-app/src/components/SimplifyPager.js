import React from 'react'
import PropTypes from 'prop-types'
import { Pagination } from 'antd'
import cssModules from 'react-css-modules'
import styles from './SimplifyPager.module.scss'

const SimplifyPager = ({
  totalPages,
  page,
  hasNext,
  onChange,
  totalCount,
  position = 'top',
  currentCount,
  style = {},
  ...rest
}) => {
  const t = hasNext ? totalPages + 1 : totalPages
  const st = {
    alignItems: position === 'top' ? 'flex-end' : 'flex-start',
    ...style
  }
  return (
    <div styleName="simplify-pager" style={st} {...rest}>
      <span style={{ fontSize: 12, marginRight: 12 }}>
        共[{currentCount}/{totalCount}]条数据
      </span>
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
  totalPages: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  hasNext: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  currentCount: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired
}

export default cssModules(SimplifyPager, styles)
