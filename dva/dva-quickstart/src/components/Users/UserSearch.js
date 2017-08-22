import React from 'react'
import PropTypes from 'prop-types'
import { Button, Select, Input } from 'antd'
import styles from './UserSearch.less'
const Option = Select.Option

const UserSearch = ({form, field, keyword, onSearch, onAdd}) => {
  return (
    <div className={styles.normal}>
      <div className={styles.search}>
        <Select className="s-select" defaultValue="名字">
          <Option value="名字">名字</Option>
          <Option value="年龄">年龄</Option>
          <Option value="住址">住址</Option>
        </Select>
        <Input className={styles['s-input']} placeholder="search"/>
        <Button className="s-button" type="primary" icon="search">搜索</Button>
      </div>
      <div className={styles.create}>
        <Button type="ghost">添加</Button>
      </div>
    </div>
  )
}
export default UserSearch
