import React from 'react';
import { connect } from 'dva';
import styles from './All.css';
import TopTabs from '../../components/Product/TopTab.js'

function All() {
  return (
    <div className={styles.normal}>
      <TopTabs />
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(All);
