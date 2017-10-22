import React from 'react';
import { Link } from 'dva/router'
import styles from './Item.css';
import { IMGURL } from '../constant'

function Item({ data, style = {}, onAddToCart }) {
  return (
    <div className={styles.normal} style={style}>
      <Link to={`/product/${data.id}`} className={styles.img_box}>
        <img src={IMGURL + data.image1} alt="" />
      </Link>
      <div className={styles.right_part}>
        <div className={styles.top_part}>
          <p className={styles.en}>{data.englishname}</p>
          <p className={styles.cn}>{data.proname}</p>
          <p className={styles.oth}>
            <span>￥{data.proprice}</span>
            <em>{data.procontent}ml</em>
          </p>
        </div>
        <div className={styles.bottom_part}>
          <a href="javascript:;" onClick={onAddToCart.bind(null, data.id)}>加入购物车</a>
          <a href="javascript:;">立即购买</a>
        </div>
      </div>
    </div>
  )
}

export default Item;
