import React from 'react';
import styles from './SortLayer.css';

function SortLayer() {
  return (
    <div className={styles.normal} onBlur={() => { console.log('xx') }}>
      <ul>
        <li>
          <a href="javascript:;">销量最高</a>
        </li>
        <li>
          <a href="javascript:;">价格最高</a>
        </li>
        <li>
          <a href="javascript:;">价格最低</a>
        </li>
      </ul>
    </div>
  );
}

export default SortLayer;
