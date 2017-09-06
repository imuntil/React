import React from 'react';
import QueueAnim from 'rc-queue-anim'
import styles from './BuyBarLayout.css';

function BuyBarLayout({ children }) {
  return (
    <QueueAnim type={'right'} style={{ height: '100%', width: '100%', display: 'block' }}>
      <div key="l2" className={styles.normal}>
        <div className={styles.main}>
          {children}
        </div>
        <div className={styles.tabbar}>
          <a className={styles.cart} href="javascript:;">加入购物车</a>
          <a className={styles.buy} href="javascript:;">立即购买</a>
        </div>
      </div>
    </QueueAnim>
  );
}

export default BuyBarLayout;
