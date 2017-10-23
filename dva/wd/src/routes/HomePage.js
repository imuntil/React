import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router'
import { WingBlank, WhiteSpace, Icon } from 'antd-mobile'
import _ from 'lodash'
import Banner from '../components/Home/Banner'
import { sellings } from "../constant";
import Card from '../components/Card'
import CocktailCard from '../components/CocktailCard'
import Loading from '../components/Loading'
import styles from './HomePage.css';

function HomePage({ store, history }) {
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
          <Banner
            onBannerClick={(id) => {
              history.push(`/product/${id}`)
            }}
          />
          <WhiteSpace size="lg" />
        </div>
        <WhiteSpace size="lg" />
        <div className={styles.section}>
          <div className={styles.title}>
            <div>
              <h3>热卖排行</h3>
              <em>大家都在买什么</em>
            </div>
            <Link to="/product/all">查看更多 <Icon type="right" /></Link>
          </div>
          <div className={styles.box}>
            {
              _.isEmpty(store)
                ? <Loading />
                : sellings.map(id => (
                  <Card key={id} data={store[id]} />
                ))
            }
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
            <Link to="/cocktail">查看更多 <Icon type="right" /></Link>
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

function mapStateToProps(state) {
  const store = state['list-store']
  return { store }
}

export default connect(mapStateToProps)(HomePage);
