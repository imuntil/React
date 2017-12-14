import React from 'react';
import { connect } from 'dva';
import { WhiteSpace, SwipeAction } from 'antd-mobile'
import QueueAnim from 'rc-queue-anim'
import _ from 'lodash'
import Like from '../components/Like/Like.js'
import styles from './CartPage.css';
import { IMGURL } from '../constant'
import PageLoading from '../components/PageLoading'
import routeLoading from '../components/HighComponent/routeLoading'
import PriceLabel from '../components/PriceLabel'

function CartBar({ chosenALL, toggleAllChoose, amount = 0.00 }) {
  return (
    <div className={styles.bar}>
      <div className={styles.lg}>
        <a href="javascript:;" onClick={toggleAllChoose}>
          {
            chosenALL
              ? <img src={require('../assets/ig-dir/chosen.png')} alt="" />
              : <img src={require('../assets/ig-dir/not-choose.png')} alt="" />
          }
          全选
        </a>
      </div>
      <div className={styles.rg}>
        <p>合计: <PriceLabel price={+amount} fz={30} /></p>
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
function ShoppingCart({ list, pros, store, cs, onDeletePro, onModifyNum, onChoose }) {
  return (
    <QueueAnim
      className={styles.shopping_cart} component="div"
      delay={200} interval={150} animConfig={{ opacity: [1, 0] }}
      type={['right', 'scaleY']}
    >
      {
        list.map(sku => (
          <SwipeAction
            autoClose className={styles.cart_group}
            key={sku}
            right={[
              {
                text: '删除',
                onPress: () => onDeletePro(pros[sku].cid, sku),
                style: { backgroundColor: '#e4150e', color: '#fff', fontSize: '28px' }
              }
            ]}
          >
            <div className={styles.inner_group}>
              <ul className={styles.list_horizontal}>
                <li className={styles.choose} onClick={onChoose.bind(null, sku)}>
                  <a href="javascript:;">
                    {
                      cs[sku]
                        ? <img src={require('../assets/ig-dir/chosen.png')} alt="" />
                        : <img src={require('../assets/ig-dir/not-choose.png')} alt="" />
                    }
                  </a>
                </li>
                <li className={styles.img}>
                  <img src={IMGURL + store[sku].images[0]} alt="" />
                </li>
                <li className={styles.infos}>
                  <p>{store[sku].en}</p>
                  <p>{store[sku].cn}</p>
                  <p>{store[sku].content}ml</p>
                  <div>
                    <p className={styles.group_add_sub}>
                      <a onClick={onModifyNum.bind(null, '-', sku)} href="javascript:;">–</a>
                      <span>{pros[sku].count}</span>
                      <a onClick={onModifyNum.bind(null, '+', sku)} href="javascript:;">+</a>
                    </p>
                  </div>
                </li>
                <li className={styles.price}>
                  <PriceLabel price={store[sku].truePrice} fz={28} />
                </li>
              </ul>
            </div>
          </SwipeAction>
        ))
      }
    </QueueAnim>
  )
}

class CartPage extends React.Component {
  handleDeleteProFromCart = (cid, sku) => {
    const { dispatch } = this.props
    dispatch({ type: 'cart/deleteProFromCart', payload: { cid, sku } })
  }
  handleModifyNum = (method, sku) => {
    const { dispatch } = this.props
    dispatch({ type: 'cart/modifyProsNum', payload: { sku, add: method === '+' } })
  }
  handleProChoose = (sku) => {
    const { dispatch } = this.props
    dispatch({ type: 'cart/toggleChoose', payload: { sku } })
  }
  handleAllChoose = (all) => {
    const { dispatch } = this.props
    dispatch({ type: 'cart/toggleAllChoose', payload: { all } })
  }
  render() {
    const { idList = [], pros, store, chooseStatus, maybe, loading } = this.props
    if (_.isEmpty(store)) return false
    let amount = 0
    const chosenPros = idList.filter(sku => {
      const cs = chooseStatus[sku]
      if (cs) {
        amount += pros[sku].count * store[sku].truePrice
        return true
      }
      return false
    })
    const data = maybe.ids.map(id => store[id])
    const allChoose = chosenPros.length === idList.length
    return (
      <PageLoading loading={loading}>
        <div className={styles.normal}>
          <div className={styles.body}>
            <div className={styles.main_box}>
              {
                !idList.length || _.isEmpty(store)
                  ? <EmptyCart />
                  : <ShoppingCart
                    list={idList}
                    pros={pros}
                    store={store}
                    cs={chooseStatus}
                    onDeletePro={this.handleDeleteProFromCart}
                    onModifyNum={this.handleModifyNum}
                    onChoose={this.handleProChoose}
                  />
              }
            </div>
            <WhiteSpace />
            <Like title="猜你喜欢" data={data} />
          </div>
          <CartBar
            chosenALL={allChoose}
            toggleAllChoose={this.handleAllChoose.bind(null, allChoose)}
            amount={amount.toFixed(2)}
          />
        </div>
      </PageLoading>
    );
  }
}

function mapStateToProps(state) {
  const { idList, pros, maybe, chooseStatus } = state.cart
  const store = state['list-store']
  const { effects } = state.loading
  const loading = effects['cart/fetchCart'] || effects['cart/changeMaybe']
  return {
    idList, pros, store, maybe, chooseStatus, loading
  };
}

export default connect(mapStateToProps)(routeLoading(CartPage));
