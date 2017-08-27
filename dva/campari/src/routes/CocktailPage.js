import React from 'react';
import { connect } from 'dva';
import styles from './CocktailPage.css';

function CocktailPage() {
  return (
    <div className={styles.normal}>
      Route Component: CocktailPage
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(CocktailPage);
