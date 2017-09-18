import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router'
import { List, WhiteSpace } from 'antd-mobile'
import { BASEURL, avatars } from '../../constant'
import MissData from '../../components/Error/MissData.js'
import styles from './IndexPage.css';

const { Item } = List

class IndexPage extends React.Component {
  render() {
    const { user, history } = this.props
    const img = user.imgname
    let avatar = ''
    if (`${img}`.length < 4) {
      avatar = avatars[+img - 1]
    } else {
      avatar = `${BASEURL}upload/${img}?${Math.random()}`
    }
    return (
      user.usersid
        ? (
          <div className={styles.normal}>
            <div className={styles.header}>
              <div className={styles.avatar}>
                <div className={styles.radius_box}>
                  <img src={avatar} alt="" />
                </div>
                <Link to="user/modify-avatar" className={styles.edit_avatar}>编辑头像</Link>
              </div>
              <p className={styles.nick}>
                <Link to="user/modify-nick">{user.name}</Link>
              </p>
            </div>
            <div className={styles.list_body}>
              <List>
                <Item arrow="horizontal">待付款</Item>
                <Item arrow="horizontal">待收货</Item>
                <Item arrow="horizontal">全部订单</Item>
                <Item arrow="horizontal">我的收藏</Item>
              </List>
              <WhiteSpace />
              <List>
                <Item arrow="horizontal" onClick={() => { history.push('/user/safe') }}>账号安全</Item>
                <Item arrow="horizontal">地址管理</Item>
              </List>
            </div>
          </div>
        )
        : <MissData redirect={() => { history.replace('/user/login') }} />
    );
  }
}

function mapStateToProps(state) {
  const user = state['user-info']
  return { user };
}

export default connect(mapStateToProps)(IndexPage);
