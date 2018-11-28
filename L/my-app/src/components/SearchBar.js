import React, { memo } from 'react'
import PropTypes from 'prop-types'
import cssModules from 'react-css-modules'
import { Select } from 'antd'
import styles from './SearchBar.module.scss'
const Option = Select.Option

const SearchBar = memo(
  cssModules(function SearchBar(props) {
    const { onChange, subOptions, typeOptions } = props
    return (
      <div>
        <Select
          defaultValue="-"
          onChange={v => onChange('type', v === '-' ? '' : v)}
          style={{ width: 100, marginRight: '1em' }}
        >
          <Option key="-">全部</Option>
          {typeOptions.map(v => (
            <Option key={v}>{v}</Option>
          ))}
        </Select>
        <Select
          defaultValue="-"
          onChange={v => onChange('sub', v === '-' ? '' : v)}
          style={{ width: 150 }}
        >
          <Option key="-">全部</Option>
          {subOptions.map(v => (
            <Option key={v}>{v}</Option>
          ))}
        </Select>
      </div>
    )
  }, styles)
)

SearchBar.propTypes = {
  typeOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  subOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired
}

export default SearchBar
