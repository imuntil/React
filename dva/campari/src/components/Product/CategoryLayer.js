import React from 'react';
import styles from './CategoryLayer.css';

function CategoryLayer() {
  return (
    <div className={styles.normal}>
      <img src={require('../../assets/ig-dir/c-all-4.jpg')} alt="" />
      <div className={styles.btns}>
        <a href="javascript:;">&nbsp;</a>
        <a href="javascript:;">&nbsp;</a>
        <a href="javascript:;">&nbsp;</a>
        <a href="javascript:;">&nbsp;</a>
        <a href="javascript:;">&nbsp;</a>
        <a href="javascript:;">&nbsp;</a>
        <a href="javascript:;">&nbsp;</a>
      </div>
    </div>
  );
}

export default CategoryLayer;
