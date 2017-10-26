import React from 'react';
import style from './PriceLabel.css'

function PriceLabel({ price, fz = 36 }) {
  const p = price.toFixed(2).toString().split('.')
  return (
    <span style={{ fontSize: `${fz}px` }} className={style.price_label}>
      ￥{p[0]}.<em style={{ fontSize: `${fz * 0.9}px` }}>{p[1]}</em>
    </span>
  );
}

export default PriceLabel;
