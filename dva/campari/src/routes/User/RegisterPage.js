import React from 'react';
import { connect } from 'dva';
import styles from './RegisterPage.css';

function RegisterPage() {
  return (
    <div className={styles.normal}>
      Route Component: RegisterPage
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(RegisterPage);
