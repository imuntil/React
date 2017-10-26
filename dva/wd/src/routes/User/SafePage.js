import React from 'react';
import { connect } from 'dva';
import { List, WhiteSpace, WingBlank } from 'antd-mobile'
import { formatPhone } from '../../services/ct'
import MissData from '../../components/Error/MissData.js'
import styles from './SafePage.css';
import routeLoading from '../../components/HighComponent/routeLoading'
import { afterLogin } from '../../services/bus'

const { Item } = List

function SafePage({ history, user, dispatch }) {
  function logout() {
    afterLogin.path = ''
    history.replace('/')
    dispatch({ type: 'user-info/logout' })
  }
  return (
    user.phone
      ? (
        <div className={styles.normal}>
          <WhiteSpace size="lg" />
          <List>
            <Item arrow="horizontal" extra={formatPhone(user.phone)}>
              手机号
            </Item>
            <Item arrow="horizontal" onClick={() => { history.push('/user/modify') }}>修改登录密码</Item>
          </List>
          <WhiteSpace size="lg" />
          <WingBlank>
            <a
              href="javascript:;" className="common-btn" onClick={logout}
              style={{ color: '#888', backgroundColor: '#fff', border: '2px solid #555' }}
            >退出登录</a>
          </WingBlank>
        </div>
      )
      : <MissData redirect={() => { history.replace('/user/login') }} />
  );
}

function mapStateToProps(state) {
  const user = state['user-info']
  return { user };
}

export default connect(mapStateToProps)(routeLoading(SafePage));
