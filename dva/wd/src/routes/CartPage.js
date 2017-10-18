import React from 'react';
import { connect } from 'dva';
import { WhiteSpace } from 'antd-mobile'
import Like from '../components/Like/Like.js'
import styles from './CartPage.css';
import cart from "../models/cart/cart";

function CartBar({ chosenALL }) {
  return (
    <div className={styles.bar}>
      <div className={styles.lg}>
        <a href="javascript:;">
          {
            chosenALL
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
function ShoppingCart({ chosen }) {
  return (
    <div className="shopping_cart">
      <div className="cart_group">
        <div className="inner-group">
          <ul className="list list-horizontal">
            <li className="choose">
              <a href="javascript:;">
                {
                  chosen
                    ? <img src={require('../assets/ig-dir/chosen.png')} alt="" />
                    : <img src={require('../assets/ig-dir/not-choose.png')} alt="" />
                }
              </a>
            </li>
            <li className="img">
              <img src={require('../assets/ig-dir/asserts/campari-thumb-7.jpg')} alt="" />
            </li>
            <li className="infos">
              <p>Wild Turkey Real Kentucky Straight Bourbon Whiskey</p>
              <p>威凤凰波本威士忌</p>
              <p>750ml</p>
              <p className="group_add_sub">
                <a href="javascript:;">-</a>
                <span>1</span>
                <a href="javascript:;">+</a>
              </p>
            </li>
            <li className="price">
              <span>￥198.00</span>
            </li>
          </ul>
        </div>
      </div>
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
    const { store } = this.props
    return (
      <div className={styles.normal}>
        <div className={styles.body}>
          <div className={styles.main_box}>
            {
              !store.length
                ? <EmptyCart />
                : <ShoppingCart />
            }
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
