import React from 'react'
import PropTypes from 'prop-types'
import './ListCell.scss'

const ListCell = ({ className }) => {
  return (
    <section className={`list-cell-290jv ${className}`}>
      <div className="content-290jv">
        <a href="javascript:;">
          <img src={require('@/assets/home-sellings-4.jpg')} alt="" />
        </a>
        <div className="right-box-290jv">
          <div className="top-box-290jv">
            <p>Campari</p>
            <p>金巴厘苦味利口酒</p>
            <p>
              <span className="color--red">￥100.00</span>
              <i>1000ml</i>
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
