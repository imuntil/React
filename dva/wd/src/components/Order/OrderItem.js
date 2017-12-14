import React from 'react'
import { IMGURL } from '../../constant'
import styles from './OrderItem.css'

function Product({ pro }) {
  return (
    <div className={styles.pro_box}>
      <div className={styles.left_box}>
        <img src={`${IMGURL}${pro.image}`} alt="" />
      </div>
      <div className={styles.right_box}>
        <div className={styles.pro_top}>
          <p className={styles.en}>{pro.en} <span>￥{pro.price}</span></p>
          <p className={styles.cn}>{pro.cn} <span>x {pro.count}</span></p>
        </div>
        <p className={styles.pro_bottom}>
          {pro.content}ml
        </p>
      </div>
    </div>
  )
}
const ss = {
  '0': { s: '未支付', o: '去支付' },
  '1': { s: '已支付', o: '' },
  '2': { s: '已发货', o: '确认收货' },
  '3': { s: '已完成', o: '申请退款' },
  '4': { s: '已取消', o: '' },
  '5': { s: '退款审核中', o: '' },
  '6': { s: '已退款', o: '' },
  '7': { s: '退款失败', o: '' }
}
function OrderItem({ data }) {
  const pros = data.products
  return (
    <div style={{ marginBottom: '.2rem' }}>
      <div className={styles.normal}>
        <p className={styles.top}>
          <span>{data.orderNumber}</span>
          <span className={styles.status}>{ss[data.status].s}</span>
        </p>
        <div className={styles.middle}>
          {
            pros.map((item, i) => (
              <Product key={i} pro={item} />
            ))
          }
        </div>
        <p className={styles.bottom}>
          <span className={styles.total}>共{data.total}件商品</span>
          <span className={styles.paid}>实付￥{data.amount}</span>
        </p>
        {
          ss[data.status].o
            ? (
            <p className={styles.underground}>
              <a href="javascript:;">{ss[data.status].o}</a>
            </p>
          )
            : null
        }
      </div>
    </div>
  )
}

export default OrderItem
