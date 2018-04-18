import React from 'react'
import PropTypes from 'prop-types'
import AdrRadio from './Form/AdrRadio'
import './AdrCell.scss'

const AdrCell = ({
  adr,
  className,
  onEditClick,
  onDelClick,
  onToggleDefault,
  value,
  onSelected,
  selectAble
}) => {
  return (
    <div className={`adr-cell-19aop ${className || ''}`}>
      {selectAble && value ? <i className="iconfont">&#xe672;</i> : null}
      <div className="content-19aop">
        <div
          className="cell-top"
          onClick={() => selectAble && onSelected(adr.id)}
        >
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
            cancelAble={false}
            text="默认地址"
            onChange={value => {
              onToggleDefault(value, adr.id)
            }}
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
  adr: {},
  value: false,
  onSelected: () => {},
  selectAble: false
}

AdrCell.propTypes = {
  adr: PropTypes.object.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onDelClick: PropTypes.func.isRequired,
  onToggleDefault: PropTypes.func.isRequired,
  value: PropTypes.bool,
  onSelected: PropTypes.func,
  selectAble: PropTypes.bool
}

export default AdrCell
