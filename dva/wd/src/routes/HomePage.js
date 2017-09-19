import React from 'react';
import { connect } from 'dva';
import { WingBlank, WhiteSpace, Icon } from 'antd-mobile'
import styles from './HomePage.css';
import Banner from '../components/Home/Banner.js'
import Card from '../components/Card.js'
import CocktailCard from '../components/CocktailCard.js'

function HomePage() {
  return (
    <div className={styles.normal}>
      <WingBlank size="lg">
        <WhiteSpace size="xl" />
        <div className={styles.section}>
          <div className={styles.title}>
            <div>
              <h3>精选指南</h3>
              <em>特价福利</em>
            </div>
          </div>
          <Banner />
          <WhiteSpace size="lg" />
        </div>
        <WhiteSpace size="lg" />
        <div className={styles.section}>
          <div className={styles.title}>
            <div>
              <h3>热卖排行</h3>
              <em>大家都在买什么</em>
            </div>
            <a href="javascript:;">查看更多 <Icon type="right" /></a>
          </div>
          <div className={styles.box}>
            <Card data={{}} />
            <Card data={{}} />
          </div>
          <WhiteSpace size="lg" />
        </div>
        <WhiteSpace size="lg" />
        <div className={styles.section}>
          <div className={styles.title}>
            <div>
              <h3>经典鸡尾酒</h3>
              <em>详细配方全知道</em>
            </div>
            <a href="javascript:;">查看更多 <Icon type="right" /></a>
          </div>
          <div className={styles.box}>
            <CocktailCard width="32%" />
            <CocktailCard width="32%" />
            <CocktailCard width="32%" />
          </div>
          <WhiteSpace size="lg" />
        </div>
      </WingBlank>
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(HomePage);
