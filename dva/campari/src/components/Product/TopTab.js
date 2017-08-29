import React from 'react';
import styles from './TopTab.css';
import CategoryLayer from './CategoryLayer.js'

function TopTab() {
  return (
    <div className={styles.normal}>
      <div className={styles.tabs}>
        <a href="javascript:;">产品分类 <span>▼</span> <em /></a>
        <a href="javascript:;">只能排序 <span>▼</span></a>
      </div>
      <CategoryLayer />
    </div>
  );
}

export default TopTab;
