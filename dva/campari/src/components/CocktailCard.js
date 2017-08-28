import React from 'react';
import styles from './CocktailCard.css';

function CocktailCard({ more, width = '48%' }) {
  return (
    <div className={styles.normal} style={{ width }}>
      <img src={require('../assets/ig-dir/cocktail-1.jpg')} alt="" />
      <p className="en">negroni</p>
      <p className="cn">内格罗尼</p>
      {
        more
          ? <a href="javascript:;">查看更多</a>
          : null
      }
    </div>
  );
}

export default CocktailCard;
