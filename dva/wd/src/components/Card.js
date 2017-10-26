import React from 'react';
import { Link } from 'dva/router'
import styles from './Card.css';
import { IMGURL } from '../constant'
import PriceLabel from './PriceLabel'

function Card({ customStyle, data: {
  id = 103,
  proname = 'xxx',
  englishname = 'xxx',
  procontent = 0,
  proprice = 100,
  discountprice = 0,
  image1: pic = 'pro1036cfc9-954f-4e26-8986-78b3aa186e9a.jpeg'
} }) {
  return (
    <Link to={`/product/${id}`} className={styles.normal} style={customStyle}>
      <img src={IMGURL + pic} alt="" />
      <p className={styles.en}>{englishname}</p>
      <p className={styles.cn}>{proname}</p>
      <p className={styles.oth}>
        <span>{procontent}ml</span>
        <PriceLabel price={proprice} fz={26} />
      </p>
    </Link>
  );
}

export default Card;
