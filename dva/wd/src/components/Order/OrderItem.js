import React from 'react'
import styles from './OrderItem.css'

function Product() {
  return (
    <div className={styles.pro_box}>
      <div className={styles.left_box}>
        <img src={require('../../assets/ig-dir/home-sellings-4.jpg')} alt="" />
      </div>
      <div className={styles.right_box}>
        <div className={styles.pro_top}>
          <p className={styles.en}>XXXXXXXXxxxxxxxxxxxXXXXXXXX <span>￥100.00</span></p>
          <p className={styles.cn}>啦啦啦奥绿绿绿绿绿绿啦啦啦奥绿绿绿绿绿绿 <span>x 1</span></p>
        </div>
        <p className={styles.pro_bottom}>
          700ml
        </p>
      </div>
    </div>
  )
}

function OrderItem() {
  return (
    <div style={{ marginBottom: '.2rem' }}>
      <div className={styles.normal}>
        <p className={styles.top}>
          <span>XXXXXX</span>
          <span className={styles.status}>未支付</span>
        </p>
        <div className={styles.middle}>
          <Product />
        </div>
        <p className={styles.bottom}>
          <span className={styles.total}>共2件商品</span>
          <span className={styles.paid}>实付￥656.00</span>
        </p>
        <p className={styles.underground}>
          <a href="javascript:;">去支付</a>
        </p>
      </div>
    </div>
  )
}

export default OrderItem
