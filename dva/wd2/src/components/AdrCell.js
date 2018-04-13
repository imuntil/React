import React from 'react'
import PropTypes from 'prop-types'
import AdrRadio from './Form/AdrRadio'
import './AdrCell.scss'

const AdrCell = ({
  adr,
  className,
  onEditClick,
  onDelClick,
  onToggleDefault
}) => {
  return (
    <div className={`adr-cell-19aop ${className || ''}`}>
      <div className="content-19aop">
        <div className="cell-top">
          <div className="contact-19aop">
            <p>
              <span>{adr.name}</span>
              <span>{adr.phone}</span>
            </p>
            <span>{adr.label}</span>
          </div>
          <p className="adr-19aop">
            {adr.city}
            {adr.address}
          </p>
        </div>
        <div className="cell-bottom-19aop">
          <AdrRadio
            text="默认地址"
            onRadioClick={() => onToggleDefault(adr.status, adr.id)}
            checked={!!adr.status}
          />
          <p className="cb-right">
            <a href="javascript:;" onClick={() => onEditClick(adr.id)}>
              编辑
            </a>
            <a href="javascript:;" onClick={() => onDelClick(adr.id)}>
              删除
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

AdrCell.defaultProps = {
  adr: {}
}

AdrCell.propTypes = {
  adr: PropTypes.object.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onDelClick: PropTypes.func.isRequired,
  onToggleDefault: PropTypes.func.isRequired
}

export default AdrCell
