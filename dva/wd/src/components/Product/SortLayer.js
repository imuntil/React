import React from 'react';
import styles from './SortLayer.css';

export function SortLayer({ changeParams }) {
  return (
    <div className={styles.normal} onBlur={() => { console.log('xx') }}>
      <ul>
        <li>
          <a onClick={() => { changeParams({ flag: 'sales', sort: 'desc', type: null }) }} href="javascript:;">销量最高</a>
        </li>
        <li>
          <a onClick={() => { changeParams({ flag: 'truePrice', sort: 'desc', type: null }) }} href="javascript:;">价格最高</a>
        </li>
        <li>
          <a onClick={() => { changeParams({ flag: 'truePrice', sort: 'asc', type: null }) }} href="javascript:;">价格最低</a>
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
          <a onClick={() => { changeParams({ sort: 'desc', flag: 'sales' }) }} href="javascript:;">销量最高</a>
        </li>
        <li>
          <a onClick={() => { changeParams({ sort: 'desc', flag: 'truePrice' }) }} href="javascript:;">价格最高</a>
        </li>
        <li>
          <a onClick={() => { changeParams({ sort: 'asc', flag: 'truePrice' }) }} href="javascript:;">价格最低</a>
        </li>
      </ul>
    </div>
  );
}
