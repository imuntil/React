import React from 'react';
import { connect } from 'dva';
import { WhiteSpace } from 'antd-mobile'
import PageLoading from '../components/PageLoading.js'
import OrderItem from '../components/Order/OrderItem.js'
import styles from './OrderPage.css';

class OrderPage extends React.Component {
  render() {
    const { loading } = this.props
    return (
      <PageLoading loading={loading}>
        <div className={styles.normal}>
          <WhiteSpace />
          <OrderItem />
          <OrderItem />
          <OrderItem />
        </div>
      </PageLoading>
    )
  }
}

function mapStateToProps(state) {
  const { all, toPay, toReceive } = state.orders
  const loading = state.loading.models.orders
  return { all, toReceive, toPay, loading };
}

export default connect(mapStateToProps)(OrderPage);
