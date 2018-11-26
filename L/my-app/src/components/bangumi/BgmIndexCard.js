import React, { memo } from 'react'
import PropTypes from 'prop-types'
import cssModules from 'react-css-modules'
import styles from './BgmIndexCard.module.scss'
import { mockImg } from '@/utils'
const img = mockImg(320, 426, 'EEE', 'AAA', 'Bangumi')

function BgmIndexCard(props) {
  const { links = {}, name, onClick } = props
  const { iLink, bLink } = links
  return (
    <div styleName="card">
      <div styleName="cover">
        <img src={img} alt="" />
        <div styleName="links">
          {bLink ? (
            <i
              onClick={() => onClick(name, 'B')}
              className="iconfont icon-bilibili"
            />
          ) : null}
          {iLink ? (
            <i
              onClick={() => onClick(name, 'I')}
              className="iconfont icon-iqiyi"
            />
          ) : null}
          <i
            onClick={() => onClick(name, 'H')}
            className="iconfont icon-hua1"
          />
        </div>
      </div>
      <p styleName="name" className="hover--blue">
        {name}
      </p>
    </div>
  )
}

BgmIndexCard.propTypes = {
  cover: PropTypes.string,
  name: PropTypes.string.isRequired,
  links: PropTypes.shape({
    iLink: PropTypes.string,
    bLink: PropTypes.string,
    hLink: PropTypes.string
  })
}

export default memo(cssModules(BgmIndexCard, styles))
