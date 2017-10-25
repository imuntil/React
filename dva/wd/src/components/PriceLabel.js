import React from 'react';
import styles from './PriceLabel.css';

function PriceLabel({ price }) {
  const p = price.toFixed(2).toString().split('.')
  return (
    <span className={styles.price_label}>
      ￥{p[0]}.<em>{p[1]}</em>
    </span>
  );
}

export default PriceLabel;
