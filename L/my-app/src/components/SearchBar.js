import React, { memo } from 'react'
import PropTypes from 'prop-types'
import cssModules from 'react-css-modules'
import { Select, Input, Button } from 'antd'
import styles from './SearchBar.module.scss'
const Option = Select.Option
const Search = Input.Search

const SearchBar = memo(
  cssModules(function SearchBar(props) {
    const {
      onChange,
      subOptions,
      typeOptions,
      onQuery,
      onFilter,
      model,
      onReset,
      mode
    } = props
    return (
      <div>
        <Select
          defaultValue="-"
          onChange={v => onChange('type', v === '-' ? '' : v)}
          style={{ width: 100, marginRight: '.5em' }}
          value={model.type}
        >
          <Option key="-">全部</Option>
          {typeOptions.map(v => (
            <Option key={v}>{v}</Option>
          ))}
        </Select>
        <Select
          defaultValue="-"
          onChange={v => onChange('subtitle', v === '-' ? '' : v)}
          style={{ width: 150, marginRight: '.5em' }}
          value={model.subtitle}
        >
          <Option key="-">全部</Option>
          {subOptions.map(v => (
            <Option key={v}>{v}</Option>
          ))}
        </Select>
        <Search
          onChange={v => onChange('name', v.target.value)}
          onSearch={onFilter}
          style={{ width: 250, marginRight: '.5em' }}
          placeholder="关键字"
          value={model.name}
        />
        <Button
          shape="circle"
          type="danger"
          ghost
          icon="close"
          size="small"
          style={{ marginRight: '.5em' }}
          onClick={onReset}
        />
        <Button
          type={mode === 'SEARCH' ? 'primary' : ''}
          icon="search"
          style={{ marginRight: '.5em' }}
          onClick={onQuery}
        >
          搜索
        </Button>
        <Button
          type={mode === 'FILTER' ? 'primary' : ''}
          icon="filter"
          onClick={onFilter}
        >
          筛选
        </Button>
      </div>
    )
  }, styles)
)

SearchBar.propTypes = {
  typeOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  subOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  onQuery: PropTypes.func.isRequired,
  onFilter: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  model: PropTypes.shape({
    type: PropTypes.string,
    subtitle: PropTypes.string,
    name: PropTypes.string
  }).isRequired,
  mode: PropTypes.string
}

export default SearchBar
