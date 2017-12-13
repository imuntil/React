import React from 'react';
import styles from './CategoryLayer.css';

export function CategoryLayer({ changeParams }) {
  return (
    <div className={styles.normal}>
      <img src={require('../../assets/ig-dir/c-all-4.jpg')} alt="" />
      <div className={styles.btns}>
        <a onClick={() => changeParams({ flag: null, sort: null, type: '1' })} href="javascript:;">&nbsp;</a>
        <a onClick={() => changeParams({ flag: null, sort: null, type: '2' })} href="javascript:;">&nbsp;</a>
        <a onClick={() => changeParams({ flag: null, sort: null, type: '3' })} href="javascript:;">&nbsp;</a>
        <a onClick={() => changeParams({ flag: null, sort: null, type: '4' })} href="javascript:;">&nbsp;</a>
        <a onClick={() => changeParams({ flag: null, sort: null, type: '5' })} href="javascript:;">&nbsp;</a>
        <a onClick={() => changeParams({ flag: null, sort: null, type: '6' })} href="javascript:;">&nbsp;</a>
        <a onClick={() => changeParams({ flag: null, sort: null, type: '7' })} href="javascript:;">&nbsp;</a>
      </div>
    </div>
  );
}

export function CategoryLayerF({ changeParams }) {
  return (
    <div className={styles.normal}>
      <img src={require('../../assets/ig-dir/c-all-4.jpg')} alt="" />
      <div className={styles.btns}>
        <a onClick={() => changeParams({ type: '1' })} href="javascript:;">&nbsp;</a>
        <a onClick={() => changeParams({ type: '2' })} href="javascript:;">&nbsp;</a>
        <a onClick={() => changeParams({ type: '3' })} href="javascript:;">&nbsp;</a>
        <a onClick={() => changeParams({ type: '4' })} href="javascript:;">&nbsp;</a>
        <a onClick={() => changeParams({ type: '5' })} href="javascript:;">&nbsp;</a>
        <a onClick={() => changeParams({ type: '6' })} href="javascript:;">&nbsp;</a>
        <a onClick={() => changeParams({ type: '7' })} href="javascript:;">&nbsp;</a>
      </div>
    </div>
  );
}

