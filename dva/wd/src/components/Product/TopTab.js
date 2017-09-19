import React from 'react';
import styles from './TopTab.css';

function TopTab({ onLeftClick, onRightClick }) {
  return (
    <div className={styles.normal}>
      <div className={styles.tabs}>
        <a onClick={onLeftClick} href="javascript:;">产品分类 <span>▼</span> <em /></a>
        <a onClick={onRightClick} href="javascript:;">只能排序 <span>▼</span></a>
      </div>
    </div>
  );
}

export default TopTab;
