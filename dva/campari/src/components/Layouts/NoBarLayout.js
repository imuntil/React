import React from 'react';
import QueueAnim from 'rc-queue-anim'
import styles from './NoBarLayout.css';

function NoBarLayout({ children }) {
  return (
    <QueueAnim type={'right'} className={styles.normal}>
      <div key="l3" className={styles.normal}>
        {children}
      </div>
    </QueueAnim>
  );
}

export default NoBarLayout;
