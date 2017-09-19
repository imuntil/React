import React from 'react';
import styles from './SortLayer.css';

export function SortLayer({ changeParams }) {
  return (
    <div className={styles.normal} onBlur={() => { console.log('xx') }}>
      <ul>
        <li>
          <a onClick={() => { changeParams({ flag: '1', sort: '2', type: null }) }} href="javascript:;">销量最高</a>
        </li>
        <li>
          <a onClick={() => { changeParams({ flag: '1', sort: '3', type: null }) }} href="javascript:;">价格最高</a>
        </li>
        <li>
          <a onClick={() => { changeParams({ flag: '1', sort: '4', type: null }) }} href="javascript:;">价格最低</a>
        </li>
      </ul>
    </div>
  );
}

export function SortLayerF({ changeParams }) {
  return (
    <div className={styles.normal}>
      <ul>
        <li>
          <a onClick={() => { changeParams({ sort: '2' }) }} href="javascript:;">销量最高</a>
        </li>
        <li>
          <a onClick={() => { changeParams({ sort: '3' }) }} href="javascript:;">价格最高</a>
        </li>
        <li>
          <a onClick={() => { changeParams({ sort: '4' }) }} href="javascript:;">价格最低</a>
        </li>
      </ul>
    </div>
  );
}
