import React from 'react';
import { connect } from 'dva';
import styles from './HomePage.css';

function HomePage() {
  return (
    <div className={styles.normal}>
      Route Component: HomePage
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(HomePage);
