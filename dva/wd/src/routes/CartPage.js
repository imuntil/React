import React from 'react';
import { connect } from 'dva';
import { WhiteSpace, SwipeAction } from 'antd-mobile'
import QueueAnim from 'rc-queue-anim'
import _ from 'lodash'
import Like from '../components/Like/Like.js'
import styles from './CartPage.css';
import { IMGURL } from '../constant'

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
        <span>合计: ￥{amount}</span>
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
    <QueueAnim className={styles.shopping_cart} component="div"
               delay={200} interval={150} animConfig={{ opacity: [1, 0] }}
               type={['right', 'scaleY']}>
      {
        list.map(id => (
          <SwipeAction
            autoClose className={styles.cart_group}
            key={id}
            right={[
              {
                text: '删除',
                onPress: () => onDeletePro(pros[id].cid, id),
                style: { backgroundColor: '#e4150e', color: '#fff', fontSize: '28px' }
              }
            ]}
          >
            <div className={styles.inner_group}>
              <ul className={styles.list_horizontal}>
                <li className={styles.choose} onClick={onChoose.bind(null, id)}>
                  <a href="javascript:;">
                    {
                      cs[id]
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
                      <a onClick={onModifyNum.bind(null, '-', id)} href="javascript:;">–</a>
                      <span>{pros[id].pronum}</span>
                      <a onClick={onModifyNum.bind(null, '+', id)} href="javascript:;">+</a>
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
    </QueueAnim>
  )
}

class CartPage extends React.Component {
  handleDeleteProFromCart = (cid, id) => {
    const { dispatch } = this.props
    dispatch({ type: 'cart/deleteProFromCart', payload: { cid, id } })
  }
  handleModifyNum = (method, id) => {
    const { dispatch } = this.props
    dispatch({ type: 'cart/modifyProsNum', payload: { id, add: method === '+' } })
  }
  handleProChoose = (id) => {
    const { dispatch } = this.props
    dispatch({ type: 'cart/toggleChoose', payload: { id } })
  }
  handleAllChoose = (all) => {
    const { dispatch } = this.props
    dispatch({ type: 'cart/toggleAllChoose', payload: { all } })
  }
  render() {
    const { idList, pros, store, chooseStatus, maybe } = this.props
    if (_.isEmpty(store)) return false
    let amount = 0
    const chosenPros = idList.filter(id => {
      const cs = chooseStatus[id]
      if (cs) {
        amount += pros[id].pronum * store[id].proprice
        return true
      }
      return false
    })
    const data = maybe.ids.map(id => store[id])
    const allChoose = chosenPros.length === idList.length
    return (
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
    );
  }
}

function mapStateToProps(state) {
  const { idList, pros, maybe, chooseStatus } = state.cart
  const store = state['list-store']
  return {
    idList, pros, store, maybe, chooseStatus
  };
}

export default connect(mapStateToProps)(CartPage);
