import React from 'react'
import { IMGURL } from '../../constant'
import styles from './OrderItem.css'

function Product({ pro }) {
  return (
    <div className={styles.pro_box}>
      <div className={styles.left_box}>
        <img src={`${IMGURL}${pro.image1}`} alt="" />
      </div>
      <div className={styles.right_box}>
        <div className={styles.pro_top}>
          <p className={styles.en}>{pro.englishname} <span>￥{pro.proprice}</span></p>
          <p className={styles.cn}>{pro.proname} <span>x {pro.num}</span></p>
        </div>
        <p className={styles.pro_bottom}>
          {pro.procontent}ml
        </p>
      </div>
    </div>
  )
}
const ss = {
  '0': '未支付',
  '1': '已支付',
  '3': '待收货'
}
function OrderItem({ data }) {
  const pros = data.products
  const count = pros.reduce((sum, c) => sum + c.num, 0)
  return (
    <div style={{ marginBottom: '.2rem' }}>
      <div className={styles.normal}>
        <p className={styles.top}>
          <span>{data.ordernum}</span>
          <span className={styles.status}>{ss[data.orderstatus]}</span>
        </p>
        <div className={styles.middle}>
          {
            pros.map((item, i) => (
              <Product key={i} pro={item} />
            ))
          }
        </div>
        <p className={styles.bottom}>
          <span className={styles.total}>共{count}件商品</span>
          <span className={styles.paid}>实付￥{data.orderprice}</span>
        </p>
        <p className={styles.underground}>
          <a href="javascript:;">去支付</a>
        </p>
      </div>
    </div>
  )
}

export default OrderItem
