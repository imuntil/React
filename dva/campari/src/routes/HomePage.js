import React from 'react';
import { connect } from 'dva';
import { WingBlank, WhiteSpace } from 'antd-mobile'
import styles from './HomePage.css';
import Banner from '../components/Home/Banner.js'
import Card from '../components/Card.js'

function HomePage() {
  return (
    <div className={styles.normal}>
      <WingBlank size="lg">
        <WhiteSpace size="xl" />
        <div className={styles.section}>
          <p className={styles.title}>
            <h3>精选指南</h3>
            <em>特价福利</em>
          </p>
          <Banner />
          <WhiteSpace size="lg" />
        </div>
        <WhiteSpace size="lg" />
        <div className={styles.section}>
          <p className={styles.title}>
            <h3>热卖排行</h3>
            <em>大家都在买什么</em>
          </p>
          <div className={styles.box}>
            <Card />
            <Card />
          </div>
          <WhiteSpace size="lg" />
        </div>
        <WhiteSpace size="lg" />
        <div className={styles.section}>
          <p className={styles.title}>
            <h3>经典鸡尾酒</h3>
            <em>详细配方全知道</em>
            <WhiteSpace size="lg" />
          </p>
        </div>
      </WingBlank>
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(HomePage);
