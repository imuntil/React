import React from 'react'
import PropTypes from 'prop-types'
import { SA } from '@/services'
import { currency } from '@/utils/cts'
import './ListCell.scss'

const ListCell = ({ className, pro }) => {
  return (
    <section className={`list-cell-290jv ${className}`}>
      <div className="content-290jv">
        <a href="javascript:;">
          <img src={`${SA}${pro.image1}`} alt="" />
        </a>
        <div className="right-box-290jv">
          <div className="top-box-290jv">
            <p>{pro.englishname}</p>
            <p>{pro.proname}</p>
            <p>
              <span className="color--red">{currency(pro.proprice)}</span>
              <i>{pro.procontent}ml</i>
            </p>
          </div>
          <p className="bottom-box-290jv">
            <a href="javascript:;">加入购物车</a>
            <a href="javascript:;">&nbsp;立即购买&nbsp;</a>
          </p>
        </div>
      </div>
    </section>
  )
}

ListCell.propTypes = {}

export default ListCell
