import React from 'react';
import { Link } from 'dva/router'
import styles from './Card.css';
import { IMGURL } from '../constant'
import PriceLabel from './PriceLabel'

function Card({ customStyle, data: {
  _id,
  sku,
  cn = 'xxx',
  en = 'xxx',
  content = 0,
  truePrice = 100,
  image1: pic = 'pro1036cfc9-954f-4e26-8986-78b3aa186e9a.jpeg'
} }) {
  return (
    <Link to={`/product/${sku}`} className={styles.normal} style={customStyle}>
      <img src={IMGURL + pic} alt="" />
      <p className={styles.en}>{en}</p>
      <p className={styles.cn}>{cn}</p>
      <p className={styles.oth}>
        <span>{content}ml</span>
        <PriceLabel price={truePrice} fz={26} />
      </p>
    </Link>
  );
}

export default Card;
