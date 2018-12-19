import React from 'react'
import PropTypes from 'prop-types'
import cssModules from 'react-css-modules'
import styles from './AnimeList.module.scss'
import classNames from 'classnames/bind'
import { Tag, Icon, Tooltip } from 'antd'
import { SORTS } from '@/utils/constant'
const cx = classNames.bind(styles)

let Item = ({
  date,
  type,
  subtitle,
  title,
  size,
  magnet,
  link,
  isChoosing,
  index,
  toggleChoose,
  id,
  isChosen
}) => {
  return (
    <li className={cx('anime-item', { chosen: isChosen })}>
      <div styleName="date">{date}</div>
      <div styleName="type">
        <Tag color="#2db7f5" style={{ margin: 0 }}>
          {type}
        </Tag>
      </div>
      <div styleName="subtitle">
        {subtitle ? (
          <Tag
            color="magenta"
            style={{
              margin: 0,
              maxWidth: 100,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {subtitle}
          </Tag>
        ) : null}
      </div>
      <div styleName="title" title={title}>
        <a href={link} target="__blank" style={{ marginRight: 5 }}>
          <Icon type="link" />
        </a>
        {title}
      </div>
      <div styleName="size">
        <Tag color="#108ee9">{size}</Tag>
      </div>
      <div styleName="magnet">
        {isChoosing ? (
          <Icon
            type="check-square"
            onClick={() => {
              toggleChoose(id, index, magnet)
            }}
            className={cx('chosen-square')}
          />
        ) : (
          <a
            href={magnet}
            download={magnet}
            target="__blank"
            style={{ padding: 5 }}
          >
            <Icon type="download" />
          </a>
        )}
      </div>
    </li>
  )
}
Item = cssModules(Item, styles)

let Head = ({ sort, onClick, setMode, isChoosing, onConfirm, onCancel }) => (
  <li className={cx('anime-item', 'header')}>
    <div styleName="date" onClick={() => onClick('date', sort)}>
      日期
      <div styleName="sort-box">
        <Icon
          type="caret-up"
          style={{ color: sort === SORTS.DATE_ASC ? '#fb7299' : '#888' }}
        />
        <Icon
          type="caret-down"
          style={{ color: sort === SORTS.DATE_DESC ? '#fb7299' : '#888' }}
        />
      </div>
    </div>
    <div styleName="type">类别</div>
    <div styleName="subtitle">字幕组</div>
    <div styleName="title">标题</div>
    <div styleName="size" onClick={() => onClick('size', sort)}>
      大小
      <div styleName="sort-box">
        <Icon
          type="caret-up"
          style={{ color: sort === SORTS.SIZE_ASC ? '#fb7299' : '#888' }}
        />
        <Icon
          type="caret-down"
          style={{ color: sort === SORTS.SIZE_DESC ? '#fb7299' : '#888' }}
        />
      </div>
    </div>
    <div styleName="magnet">
      {isChoosing ? (
        <div styleName="sm-box">
          <Tooltip title="批量下载">
            <Icon type="download" onClick={onConfirm} />
          </Tooltip>
          <Tooltip title="取消">
            <Icon type="close" onClick={onCancel} />
          </Tooltip>
        </div>
      ) : (
        <Tooltip title="点击批量选择">
          <i
            className="iconfont icon-cili"
            onClick={setMode}
            style={{ fontSize: 18 }}
          />
        </Tooltip>
      )}
    </div>
  </li>
)
Head = cssModules(Head, styles)

const AnimeList = props => {
  const {
    data,
    sort,
    onSortClick,
    isChoosing,
    setMode,
    toggleChoose,
    chosenList,
    onConfirm,
    onCancel
  } = props
  const handleSort = (type, st) => {
    let value
    if (type === 'date') {
      value = st === SORTS.DATE_DESC ? SORTS.DATE_ASC : SORTS.DATE_DESC
    } else {
      value = st === SORTS.SIZE_DESC ? SORTS.SIZE_ASC : SORTS.SIZE_DESC
    }
    onSortClick(value)
  }
  return (
    <div>
      <ul styleName="anime-list">
        <Head
          sort={sort}
          onClick={handleSort}
          setMode={setMode}
          isChoosing={isChoosing}
          onCancel={onCancel}
          onConfirm={onConfirm}
        />
        {data.map((v, index) => (
          <Item
            toggleChoose={toggleChoose}
            {...v}
            key={v.magnet}
            isChoosing={isChoosing}
            index={index}
            isChosen={isChoosing && chosenList.indexOf(v.id) > -1}
          />
        ))}
      </ul>
    </div>
  )
}

AnimeList.propTypes = {
  data: PropTypes.array.isRequired,
  sort: PropTypes.number,
  onSortClick: PropTypes.func,
  isChoosing: PropTypes.bool,
  setMode: PropTypes.func,
  toggleChoose: PropTypes.func,
  chosenList: PropTypes.array,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func
}

export default cssModules(AnimeList, styles)
