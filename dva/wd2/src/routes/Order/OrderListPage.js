import React, { PureComponent } from 'react'
import { connect } from 'dva'
import ReactList from 'react-list'
import TweenOne from 'rc-tween-one'
import Loading from '@/components/Common/Loading'
import { SA } from '@/services'
import { currency } from '@/utils/cts'
import './OrderListPage.scss'
import { ENODEV } from 'constants'

/**
 * status
 * 0: 未付款
 * 1： 待收货
 */

const OrderSection = ({ order = {} }) => {
  const { products = [] } = order
  return (
    <section className="sec-2wiso">
      <p className="header">
        <span>订单编号: {order.ordernum}</span>
        <span className="color--red">已取消</span>
      </p>
      <div className="list-2wiso">
        {products.map(v => (
          <div className="pro-2wiso" key={v.id}>
            <div className="content-2wiso">
              <div className="img">
                <img src={`${SA}${v.image1}`} width="100%" alt="" />
              </div>
              <div className="name">
                <p>{v.englishname}</p>
                <p>{v.proname}</p>
                <p className="color--gray">{v.procontent} ml</p>
              </div>
              <div className="price">
                <p>{currency(v.proprice || 0)}</p>
                <p className="color--gray">x {v.num}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="footer">
        <p>
          <span className="color--gray">共2件商品</span>
          实付￥1000.00
        </p>
        <p className="operation">
          <a href="javascript:;">已取消</a>
        </p>
      </div>
    </section>
  )
}

const mapStateToProps = state => {
  return { order: state.order }
}

@connect(mapStateToProps)
export default class OrderListPage extends PureComponent {
  listEl = null

  animation = {
    translateX: 0,
    translateY: 0,
    opacity: 1,
    duration: 250
  }

  get currentList() {
    const {
      order: { dic, list },
      match
    } = this.props
    const status = +match.params.status
    if (status === 9) return list
    const l = []
    list.forEach(v => {
      const od = dic[v]
      if (+od['orderstatus'] === status) {
        l.push(od['ordernum'])
      }
    })
    return l
  }

  renderCell = (index, key) => {
    const { dic } = this.props.order
    const order = dic[this.currentList[index]]
    return (
      <TweenOne
        className="cell-wrapper-2wsio"
        animation={{ ...this.animation, delay: index * 100 }}
        key={key}
      >
        <OrderSection order={order} key={order.ordernum} />
      </TweenOne>
    )
  }

  render() {
    const { expired } = this.props.order
    const len = this.currentList.length
    return (
      <div className="container order-2wiso">
        {!expired ? (
          <div className={`list-content ${!len && 'flex-content'}`}>
            {len ? (
              <ReactList
                itemRenderer={this.renderCell}
                length={this.currentList.length}
                pageSize={10}
                ref={el => (this.listEl = el)}
              />
            ) : (
              <span>没有符合的订单</span>
            )}
          </div>
        ) : (
          <Loading />
        )}
      </div>
    )
  }
}
