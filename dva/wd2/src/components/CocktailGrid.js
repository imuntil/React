import React from 'react'
import PropTypes from 'prop-types'
import './CocktailGrid.scss'

const CocktailGrid = ({ className, src, cn, en }) => {
  return (
    <div className={`cocktail-grid-uej28 ${className}`}>
      <img src={src} alt="" />
      <p>{ cn }</p>
      <p>{ en }</p>
    </div>
  )
}

CocktailGrid.propTypes = {
  src: PropTypes.string.isRequired,
  cn: PropTypes.string.isRequired,
  en: PropTypes.string.isRequired
}

export default CocktailGrid
