import React from 'react';
import { Icon } from 'antd-mobile'
import styles from './CocktailCard.css';

function CocktailCard({ more, width = '45%', data = {} }) {
  return (
    <div className={styles.normal} style={{ width }}>
      <img src={data.src || require('../assets/ig-dir/cocktail-1.jpg')} alt="" />
      <p className="en">{data.en || 'negroni'}</p>
      <p className="cn">{data.cn || '内格罗尼'}</p>
      {
        more
          ? <a href="javascript:;">查看更多 <Icon type="right" /></a>
          : null
      }
    </div>
  );
}

export default CocktailCard;
