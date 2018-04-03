import React from 'react'
import { withRouter } from 'dva/router'
import PropTypes from 'prop-types'
import { currency } from '../utils/cts'
import './ProGrid.scss'

const ProGrid = ({
  className,
  content,
  price,
  en,
  cn,
  src,
  vHot,
  history,
  match,
  id,
  handleClick
}) => {
  function push() {
    if (+match.params.id !== +id) {
      history.push(`/pro/${id}`)
    }
  }
  return (
    <div
      className={`${className} pro-grid-ay29k`}
      onClick={handleClick ? handleClick : push}
    >
      <div className="img">
        <img src={src} alt="" />
        {vHot ? (
          <span className="hot">
            <img src={require('../assets/hot-1.png')} alt="" />
          </span>
        ) : null}
      </div>
      <div className="infos">
        <p>{en}</p>
        <p>{cn}</p>
        <p className="last">
          {content ? <span>{content}ml</span> : <i />}
          <span className="color--red">{currency(price)}</span>
        </p>
      </div>
    </div>
  )
}

ProGrid.propTypes = {
  content: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  en: PropTypes.string.isRequired,
  cn: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  id: PropTypes.number,
  vHot: PropTypes.bool,
  handleClick: PropTypes.func
}

export default withRouter(ProGrid)
