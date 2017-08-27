import React from 'react';
import { connect } from 'dva';
import styles from './All.css';

function All() {
  return (
    <div className={styles.normal}>
      Route Component: Product/All
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(All);
