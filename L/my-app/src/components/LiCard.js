import React, { Suspense } from 'react'
import PropTypes from 'prop-types'
import { Popover } from 'antd'
import Img from '@/components/Img'
import styles from './LiCard.module.scss'
import cssModules from 'react-css-modules'
import placeholder from '@/assets/placeholder.png'

const Links = (links, onCopy) => (
  <ul>
    {links.map(v => (
      <li key={v} className={styles.link}>
        {v}
        <i
          onClick={() => {
            onCopy(v)
          }}
          className="iconfont icon-copy no-padding"
        />
      </li>
    ))}
  </ul>
)

function LiCard({ li, onCopy }) {
  return (
    <div styleName="li-card">
      <a styleName="img" href={li.link} target="__blank">
        <Img
          // src="https://dummyimage.com/800x600/666666/FFF.png&text=ABC"
          src={li.img}
          alt="title"
          styleName="cover"
        />
      </a>
      <div styleName="title">
        <span>{li.title}</span>
        {/* <span>title</span> */}
        <Popover
          trigger="hover"
          title="Magnets"
          content={Links(li.magnet || [], onCopy)}
        >
          <i className="iconfont icon-cili" />
        </Popover>
      </div>
    </div>
  )
}

LiCard.propTypes = {
  li: PropTypes.shape({
    title: PropTypes.string.isRequired,
    img: PropTypes.string,
    magnet: PropTypes.array,
    _id: PropTypes.string.isRequired,
    link: PropTypes.string
  }).isRequired,
  onCopy: PropTypes.func.isRequired
}

export default cssModules(LiCard, styles)
