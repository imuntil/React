import React from 'react';
import { connect } from 'dva';
import styles from './News.css';

function News() {
  return (
    <div className={styles.normal}>
      Route Component: News
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(News);
