import React from 'react';
import { Link } from 'dva/router'
import styles from './Item.css';
import { IMGURL } from '../constant'
import PriceLabel from './PriceLabel.js'

function Item({ data, style = {}, onAddToCart }) {
  return (
    <div className={styles.normal} style={style}>
      <Link to={`/product/${data.sku}`} className={styles.img_box}>
        <img src={IMGURL + data.images[0]} alt="" />
      </Link>
      <div className={styles.right_part}>
        <div className={styles.top_part}>
          <p className={styles.en}>{data.en}</p>
          <p className={styles.cn}>{data.cn}</p>
          <p className={styles.oth}>
            <PriceLabel price={data.truePrice} fz={26} />
            <em>{data.content}ml</em>
          </p>
        </div>
        <div className={styles.bottom_part}>
          <a href="javascript:;" onClick={onAddToCart.bind(null, data.sku)}>加入购物车</a>
          <a href="javascript:;">立即购买</a>
        </div>
      </div>
    </div>
  )
}

export default Item;
