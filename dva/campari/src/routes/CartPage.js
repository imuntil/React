import React from 'react';
import { connect } from 'dva';
import styles from './CartPage.css';

function CartPage() {
  return (
    <div className={styles.normal}>
      Route Component: CartPage
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(CartPage);
