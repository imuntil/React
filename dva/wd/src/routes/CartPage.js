import React from 'react';
import { connect } from 'dva';
import { WhiteSpace } from 'antd-mobile'
import Like from '../components/Like/Like.js'
import styles from './CartPage.css';

function CartBar({ chsosen }) {
  return (
    <div className={styles.bar}>
      <div className={styles.lg}>
        <a href="javascript:;">
          {
            chsosen
              ? <img src={require('../assets/ig-dir/chosen.png')} alt="" />
              : <img src={require('../assets/ig-dir/not-choose.png')} alt="" />
          }
          全选
        </a>
      </div>
      <div className={styles.rg}>
        <span>合计: ￥0.00</span>
        <a href="javascript:;">去结算</a>
      </div>
    </div>
  )
}
function EmptyCart() {
  return (
    <div className={styles.empty}>
      <img src={require('../assets/ig-dir/empty-cart.jpg')} alt="" />
    </div>
  )
}

class CartPage extends React.Component {
  componentWillMount() {
    // const { dispatch } = this.props
    // dispatch({ type: 'cart/fetchCart' })
    // dispatch({ type: 'cart/changeMaybe', payload: { type: 1 } })
  }
  render() {
    return (
      <div className={styles.normal}>
        <div className={styles.body}>
          <div className={styles.main_box}>
            <EmptyCart />
          </div>
          <WhiteSpace />
          <Like title="猜你喜欢" data={[]} />
        </div>
        <CartBar />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { store: cart, maybe } = state.cart
  const store = state['list-store']
  return {
    cart, store, maybe
  };
}

export default connect(mapStateToProps)(CartPage);
