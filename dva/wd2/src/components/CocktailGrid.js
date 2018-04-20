import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'antd-mobile'
import ImgHolder from '@/components/Common/ImgHolder'
import './CocktailGrid.scss'

const CocktailGrid = ({ className, src, cn, en, to = 'javascript:;', more = false }) => {
  return (
    <a href={to} className={`cocktail-grid-uej28 ${className}`}>
      <ImgHolder src={src} alt="" />
      <p>{cn}</p>
      <p>{en}</p>
      {more ? (
        <p className="more-uej28">
          查看详情<Icon type="right" />
        </p>
      ) : null}
    </a>
  )
}

CocktailGrid.propTypes = {
  src: PropTypes.string.isRequired,
  cn: PropTypes.string.isRequired,
  en: PropTypes.string.isRequired,
  more: PropTypes.bool,
  to: PropTypes.string
}

export default CocktailGrid
