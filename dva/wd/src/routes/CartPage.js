import React from 'react';
import { connect } from 'dva';
import { WhiteSpace, SwipeAction } from 'antd-mobile'
import _ from 'lodash'
import Like from '../components/Like/Like.js'
import styles from './CartPage.css';
import { IMGURL } from '../constant'

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
function ShoppingCart({ list, store, chosen }) {
  return (
    <div className={styles.shopping_cart}>
      {
        list.map(({ id, pronum }) => (
          <SwipeAction
            autoClose className={styles.cart_group}
            key={id}
            right={[
              {
                text: '删除',
                onPress: () => console.log('press'),
                style: { backgroundColor: '#e4150e', color: '#fff', fontSize: '28px' }
              }
            ]}
          >
            <div className={styles.inner_group}>
              <ul className={styles.list_horizontal}>
                <li className={styles.choose}>
                  <a href="javascript:;">
                    {
                      chosen
                        ? <img src={require('../assets/ig-dir/chosen.png')} alt="" />
                        : <img src={require('../assets/ig-dir/not-choose.png')} alt="" />
                    }
                  </a>
                </li>
                <li className={styles.img}>
                  <img src={IMGURL + store[id].image1} alt="" />
                </li>
                <li className={styles.infos}>
                  <p>{store[id].englishname}</p>
                  <p>{store[id].proname}</p>
                  <p>{store[id].procontent}ml</p>
                  <div>
                    <p className={styles.group_add_sub}>
                      <a href="javascript:;">-</a>
                      <span>{pronum}</span>
                      <a href="javascript:;">+</a>
                    </p>
                  </div>
                </li>
                <li className={styles.price}>
                  <span>￥{store[id].proprice}</span>
                </li>
              </ul>
            </div>
          </SwipeAction>
        ))
      }
    </div>
  )
}

class CartPage extends React.Component {
  render() {
    const { list, store } = this.props
    return (
      <div className={styles.normal}>
        <div className={styles.body}>
          <div className={styles.main_box}>
            {
              !list.length || _.isEmpty(store)
                ? <EmptyCart />
                : <ShoppingCart list={list} store={store} />
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
  const { store: list, maybe } = state.cart
  const store = state['list-store']
  return {
    list, store, maybe
  };
}

export default connect(mapStateToProps)(CartPage);
