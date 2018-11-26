import React, { memo } from 'react'
import PropTypes from 'prop-types'
import cssModules from 'react-css-modules'
import { Timeline, Icon } from 'antd'
import styles from './BgmYearline.module.scss'
const Item = Timeline.Item
const TL = ({ children, onClick, active }) => (
  <Item
    className={styles.item}
    onClick={() => onClick(children)}
    dot={
      <Icon
        type="clock-circle-o"
        style={{ color: active ? '#fb7299' : '#00a1d6' }}
      />
    }
  >
    {children}
  </Item>
)

function BgmYearline({ years, handleClick, currentYear }) {
  return (
    <Timeline>
      {years.map(v => (
        <TL key={v} onClick={handleClick} active={currentYear === v}>
          {v}
        </TL>
      ))}
    </Timeline>
  )
}

BgmYearline.propTypes = {
  years: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleClick: PropTypes.func.isRequired,
  currentYear: PropTypes.string
}

export default memo(cssModules(BgmYearline, styles))
