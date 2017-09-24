import React from 'react';
import { ActivityIndicator } from 'antd-mobile'
import styles from './PageLoading.css';

function Loading() {
  return (
    <div className={styles.loading}>
      <ActivityIndicator size="large" />
    </div>
  )
}

function PageLoading({ loading, children }) {
  return (
    <div className={styles.normal}>
      {
        loading
          ? <Loading />
          : children
      }
    </div>
  );
}

export default PageLoading;
