import React from 'react';
import styles from './CategoryLayer.css';

export function CategoryLayer({ changeParams }) {
  return (
    <div className={styles.normal}>
      <img src={require('../../assets/ig-dir/c-all-4.jpg')} alt="" />
      <div className={styles.btns}>
        <a onClick={() => changeParams({ flag: '2', sort: '1', type: '1' })} href="javascript:;">&nbsp;</a>
        <a onClick={() => changeParams({ flag: '2', sort: '1', type: '2' })} href="javascript:;">&nbsp;</a>
        <a onClick={() => changeParams({ flag: '2', sort: '1', type: '3' })} href="javascript:;">&nbsp;</a>
        <a onClick={() => changeParams({ flag: '2', sort: '1', type: '4' })} href="javascript:;">&nbsp;</a>
        <a onClick={() => changeParams({ flag: '2', sort: '1', type: '5' })} href="javascript:;">&nbsp;</a>
        <a onClick={() => changeParams({ flag: '2', sort: '1', type: '6' })} href="javascript:;">&nbsp;</a>
        <a onClick={() => changeParams({ flag: '2', sort: '1', type: '7' })} href="javascript:;">&nbsp;</a>
      </div>
    </div>
  );
}

export function CategoryLayerF({ changeParams }) {
  return (
    <div className={styles.normal}>
      <img src={require('../../assets/ig-dir/c-all-4.jpg')} alt="" />
      <div className={styles.btns}>
        <a onClick={() => changeParams({ flag: '2', type: '1' })} href="javascript:;">&nbsp;</a>
        <a onClick={() => changeParams({ flag: '2', type: '2' })} href="javascript:;">&nbsp;</a>
        <a onClick={() => changeParams({ flag: '2', type: '3' })} href="javascript:;">&nbsp;</a>
        <a onClick={() => changeParams({ flag: '2', type: '4' })} href="javascript:;">&nbsp;</a>
        <a onClick={() => changeParams({ flag: '2', type: '5' })} href="javascript:;">&nbsp;</a>
        <a onClick={() => changeParams({ flag: '2', type: '6' })} href="javascript:;">&nbsp;</a>
        <a onClick={() => changeParams({ flag: '2', type: '7' })} href="javascript:;">&nbsp;</a>
      </div>
    </div>
  );
}

