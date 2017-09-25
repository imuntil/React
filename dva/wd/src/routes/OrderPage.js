import React from 'react';
import { connect } from 'dva';
import { WhiteSpace } from 'antd-mobile'
import ListView from '../components/Product/ProListView.js'
import PageLoading from '../components/PageLoading.js'
import OrderItem from '../components/Order/OrderItem.js'
import styles from './OrderPage.css';

function Row(props) {
  return <OrderItem {...props} />
}
function Body({ children }) {
  return (
    <div className={styles.body_box}>
      {
        children
      }
    </div>
  )
}
class OrderPage extends React.Component {
  componentWillMount() {
    this.setCls()
  }
  componentWillReceiveProps(nextProps) {
    const { cls, all } = this.props
    if (!cls.length && !all.length && nextProps.all.length) {
      this.setCls(nextProps)
    }
  }
  setCls = (props) => {
    const { params: { status }, all, dispatch } = props || this.props
    let s = ''
    switch (+status) {
      case 0:
        s = 'toPay'
        break
      case 3:
        s = 'toReceive'
        break
      default:
        s = 'all'
    }
    if (all && all.length) {
      dispatch({
        type: 'co/resetStatus',
        payload: {
          status: s
        }
      })
    }
  }
  render() {
    const { loading, list, page, hasMore, cls, dispatch } = this.props
    return (
      <PageLoading loading={loading}>
        <div className={styles.normal}>
          <ListView
            store={list}
            lists={cls}
            page={page}
            hasMore={hasMore}
            PER_PAGE={8}
            RowComponent={Row}
            BodyComponent={Body}
            onLoadMore={() => {
              dispatch({
                type: 'co/updateCLs',
                payload: {
                  page: page + 1
                }
              })
            }}
          />
        </div>
      </PageLoading>
    )
  }
}

function mapStateToProps(state) {
  const { all, toPay, toReceive, list } = state['order-store']
  const loading = state.loading.models['order-store']
  const co = state.co
  return { all, toReceive, toPay, loading,
    list, cls: co.cls, page: co.page, hasMore: co.hasMore  };
}

export default connect(mapStateToProps)(OrderPage);
