import React from 'react';
import QueueAnim from 'rc-queue-anim'
import styles from './NoBarLayout.css';

function NoBarLayout({ children, location }) {
  return (
    <QueueAnim type={'right'} className={styles.normal}>
      <div key="l3" className={styles.normal}>
        <QueueAnim type={'bottom'} style={{ position: 'relative', width: '100%', height: '100%' }}>
          <div key={location.pathname} style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden' }}>
            {children}
          </div>
        </QueueAnim>
      </div>
    </QueueAnim>
  );
}

export default NoBarLayout;
