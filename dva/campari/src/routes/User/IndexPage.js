import React from 'react';
import { connect } from 'dva';
import { List, WhiteSpace } from 'antd-mobile'
import styles from './IndexPage.css';

const { Item } = List

function IndexPage({ history }) {
  function push(path) {
    history.push(path)
  }
  return (
    <div className={styles.normal}>
      <div className={styles.header}>
        <div className={styles.avatar}>
          <img src={require('../../assets/ig-dir/avatar-0.png')} alt="" />
          <a href="javascript:;" className={styles.edit_avatar}>编辑头像</a>
        </div>
        <p className={styles.nick}>
          <a href="javascript:;">复活节</a>
        </p>
      </div>
      <div className="list_body">
        <List>
          <Item arrow="horizontal">待付款</Item>
          <Item arrow="horizontal">待收货</Item>
          <Item arrow="horizontal">全部订单</Item>
          <Item arrow="horizontal">我的收藏</Item>
        </List>
        <WhiteSpace />
        <List>
          <Item arrow="horizontal" onClick={() => { push('/user/safe') }}>账号安全</Item>
          <Item arrow="horizontal">地址管理</Item>
        </List>
      </div>
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(IndexPage);
