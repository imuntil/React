import React from 'react';
import { connect } from 'dva';
import styles from './ModifyPage.css';

function ModifyPage() {
  return (
    <div className={styles.normal}>
      Route Component: ModifyPage
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(ModifyPage);
