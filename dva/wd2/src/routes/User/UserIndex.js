import React, { PureComponent } from 'react'
import { connect } from 'dva'
import QueueAnim from 'rc-queue-anim'
import { List, WhiteSpace } from 'antd-mobile'
import { domain } from '@/services'
import './UserIndex.scss'

const Item = List.Item
const mapStateToProps = state => ({ user: state.user })
@connect(mapStateToProps)
export default class UserIndex extends PureComponent {
  render() {
    const { nick, avatar, ran } = this.props.user
    return (
      <div className="container user-index-ao289">
        <header>
          <p className="avatar-ao289">
            <a href="javascript:;">
              <img src={`${domain}upload/${avatar}?${ran}`} width="100%" alt="" />
            </a>
            <a href="javascript:;" className="edit-avatar">
              编辑头像
            </a>
          </p>
          <p className="nick-ao289">
            <a href="javascript:;">{nick}</a>
          </p>
        </header>
        <div className="am-list">
          <QueueAnim className="am-list-body">
            <Item key={0} arrow="horizontal" onClick={() => {}}>
              <p className="list-item">待付款</p>
            </Item>
            <Item key={1} arrow="horizontal" onClick={() => {}}>
              <p className="list-item">待收货</p>
            </Item>
            <Item key={2} arrow="horizontal" onClick={() => {}}>
              <p className="list-item">全部订单</p>
            </Item>
            <Item key={3} arrow="horizontal" onClick={() => {}}>
              <p className="list-item">我的收藏</p>
            </Item>
          </QueueAnim>
        </div>
        <WhiteSpace />
        <div className="am-list">
          <QueueAnim className="am-list-body" delay={400}>
            <Item key={4} arrow="horizontal" onClick={() => {}}>
              <p className="list-item">账号安全</p>
            </Item>
            <Item key={5} arrow="horizontal" onClick={() => {}}>
              <p className="list-item">地址管理</p>
            </Item>
          </QueueAnim>
        </div>
      </div>
    )
  }
}
