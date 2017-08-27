import React from 'react';
import { connect } from 'dva';
import styles from './Filter.css';

function Filter() {
  return (
    <div className={styles.normal}>
      Route Component: Product/Filter
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Filter);
