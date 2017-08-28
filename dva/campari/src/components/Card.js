import React from 'react';
import styles from './Card.css';

function Card() {
  return (
    <a className={styles.normal}>
      <img src="http://115.28.239.3:8080/campariShop/upload/pro8d6a7822-ee83-46b7-a66d-406b2f296e45.jpeg" alt="" />
      <p className={styles.en}>xxxx</p>
      <p className={styles.cn}>XXXX</p>
      <p className={styles.oth}>
        <span>750ml</span>
        <em>￥100.00</em>
      </p>
    </a>
  );
}

export default Card;
