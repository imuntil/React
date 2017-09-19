import React from 'react';
import { ActivityIndicator } from 'antd-mobile'
import styles from './Loading.css';

function Loading() {
  return (
    <div className={styles.normal}>
      <ActivityIndicator size="large" />
    </div>
  );
}

export default Loading;
