import React from 'react';
import QueueAnim from 'rc-queue-anim'
import styles from './BuyBarLayout.css';

function BuyBarLayout({ children, location }) {
  return (
    <QueueAnim type={'right'} style={{ height: '100%', width: '100%', display: 'block' }}>
      <div key="l2" className={styles.normal}>
        <QueueAnim type={'bottom'} style={{ position: 'relative', width: '100%', height: '100%' }}>
          <div key={location.pathname} style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden' }}>
            {children}
          </div>
        </QueueAnim>
        <div className={styles.tabbar}>
          <a className={styles.cart} href="javascript:;">加入购物车</a>
          <a className={styles.buy} href="javascript:;">立即购买</a>
        </div>
      </div>
    </QueueAnim>
  );
}

export default BuyBarLayout;
