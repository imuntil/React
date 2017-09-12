import React from 'react';
import { connect } from 'dva';
import { List, WhiteSpace, WingBlank } from 'antd-mobile'
import styles from './SafePage.css';

const { Item } = List

function SafePage({ history }) {
  return (
    <div className={styles.normal}>
      <WhiteSpace size="lg" />
      <List>
        <Item arrow="horizontal" extra="135****2314">
          手机号
        </Item>
        <Item arrow="horizontal" onClick={() => { history.push('/user/modify') }}>修改登录密码</Item>
      </List>
      <WhiteSpace size="lg" />
      <WingBlank>
        <a
          href="javascript:;" className="common-btn"
          style={{ color: '#888', backgroundColor: '#fff', border: '2px solid #555' }}
        >退出登录</a>
      </WingBlank>

    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(SafePage);
