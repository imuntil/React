import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'dva/router'
import { SA } from '@/services'
import { currency } from '@/utils/cts.ts'
import ImgHolder from '@/components/Common/ImgHolder'
import './ListCell.scss'

const ListCell = ({ className, pro = {}, onCartClick, onBuyClick }) => {
  return (
    <section className={`list-cell-290jv ${className}`}>
      <div className="content-290jv">
        <Link to={`/pro/${pro.id}`}>
          <ImgHolder src={`${SA}${pro.image1}`} alt="" />
        </Link>
        <div className="right-box-290jv">
          <div className="top-box-290jv">
            <p>{pro.englishname}</p>
            <p>{pro.proname}</p>
            <p>
              <span className="color--red">{currency(pro.realPrice)}</span>
              {pro.onSale ? <i className="on-sale">{currency(pro.proprice)}</i> : null}
              {pro.procontent ? <i>{pro.procontent}ml</i> : null}
            </p>
          </div>
          <p className="bottom-box-290jv">
            <a href="javascript:;" onClick={() => onCartClick(pro.id)}>
              加入购物车
            </a>
            <a href="javascript:;" onClick={() => onBuyClick(pro.id)}>
              &nbsp;立即购买&nbsp;
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}

ListCell.propTypes = {
  pro: PropTypes.object.isRequired,
  onCartClick: PropTypes.func.isRequired,
  onBuyClick: PropTypes.func.isRequired
}

export default ListCell
