import React, { memo } from 'react'
import PropTypes from 'prop-types'
import cssModules from 'react-css-modules'
import { Select, Input, Button } from 'antd'
import styles from './SearchBar.module.scss'
const Option = Select.Option
const Search = Input.Search

const SearchBar = memo(
  cssModules(function SearchBar(props) {
    const { onChange, typeOptions, onQuery, model, onReset } = props
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
        <Search
          onChange={v => onChange('name', v.target.value)}
          onSearch={onQuery}
          style={{ width: 250, marginRight: '.5em' }}
          placeholder="关键字"
          value={model.name}
        />
        <Button
          type="primary"
          icon="search"
          style={{ marginRight: '.5em' }}
          onClick={onQuery}
        >
          搜索
        </Button>
        <Button
          icon="close"
          style={{ marginRight: '.5em' }}
          onClick={onReset}
        >
          重置
        </Button>
      </div>
    )
  }, styles)
)

SearchBar.propTypes = {
  typeOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  onQuery: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  model: PropTypes.shape({
    type: PropTypes.string,
    name: PropTypes.string
  }).isRequired
}

export default SearchBar
