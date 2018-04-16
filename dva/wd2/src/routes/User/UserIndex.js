import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'
import QueueAnim from 'rc-queue-anim'
import { List, WhiteSpace } from 'antd-mobile'
import { domain } from '@/services'
import './UserIndex.scss'

const Item = List.Item
const mapStateToProps = state => ({ user: state.user })
@connect(mapStateToProps)
export default class UserIndex extends PureComponent {
  render() {
    const { history, user } = this.props
    const { nick, avatar, ran } = user
    return <div className="container user-index-ao289">
        <header>
          <p className="avatar-ao289">
            <a href="javascript:;">
              <img src={`${domain}upload/${avatar}?${ran}`} width="100%" alt="" />
            </a>
            <Link to="/user/modify/avatar" className="edit-avatar">
              编辑头像
            </Link>
          </p>
          <p className="nick-ao289">
            <Link to="/user/modify/nick">{nick}</Link>
          </p>
        </header>
        <div className="am-list">
          <QueueAnim className="am-list-body">
            <Item key={0} arrow="horizontal" onClick={() => history.push('/order/0')}>
              <p className="list-item">待付款</p>
            </Item>
            <Item key={1} arrow="horizontal" onClick={() => history.push('/order/1')}>
              <p className="list-item">待收货</p>
            </Item>
            <Item key={2} arrow="horizontal" onClick={() => history.push('/order/9')}>
              <p className="list-item">全部订单</p>
            </Item>
            <Item key={3} arrow="horizontal" onClick={() => history.push('/user/col')}>
              <p className="list-item">我的收藏</p>
            </Item>
          </QueueAnim>
        </div>
        <WhiteSpace />
        <div className="am-list">
          <QueueAnim className="am-list-body" delay={400}>
            <Item key={4} arrow="horizontal" onClick={() => history.push('/user/logout')}>
              <p className="list-item">账号安全</p>
            </Item>
            <Item key={5} arrow="horizontal" onClick={() => history.push('/adr')}>
              <p className="list-item">地址管理</p>
            </Item>
          </QueueAnim>
        </div>
      </div>
  }
}
