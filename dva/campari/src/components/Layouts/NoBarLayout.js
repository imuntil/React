import React from 'react';
import QueueAnim from 'rc-queue-anim'
import styles from './NoBarLayout.css';

function NoBarLayout({ children }) {
  return (
    <QueueAnim type={'right'}>
      <div key="l3" className={styles.normal}>
        <div>
          {children}
        </div>
      </div>
    </QueueAnim>
  );
}

export default NoBarLayout;
