import React, {PureComponent} from 'react'
import {connect} from 'dva'
import {Link} from 'dva/router'
import QueueAnim from 'rc-queue-anim'
import {List, WhiteSpace, Toast} from 'antd-mobile'
import {domain} from '@/services'
import {delay} from '@/utils/cts'
import {avatars, defaultAvatar} from '@/services/config'
import './UserIndex.scss'

const Item = List.Item
const mapStateToProps = state => ({user: state.user})
@connect(mapStateToProps)
export default class UserIndex extends PureComponent {
  state = {
    refreshing: false
  }
  get avatar() {
    const {avatar, ran} = this.props.user
    if (!avatar) 
      return defaultAvatar
    if (`${avatar}`.indexOf('.png') !== -1) {
      return `${domain}upload/${avatar}?${ran}`
    }
    return avatars[avatar - 1].src
  }

  refreshPoints = async() => {
    const {dispatch, user: {
        points
      }} = this.props
    if (points.cd) {
      Toast.info('已是最新数据，请稍后再试', 1)
      return
    }
    if (this.state.refreshing) 
      return
    this.setState({refreshing: true})
    dispatch({type: 'user/fetchUserPoints'})
    await delay(250)
    this.setState({refreshing: false})
  }

  render() {
    const {history, user} = this.props
    const {
      nick,
      points: {
        value: points,
        cd
      }
    } = user
    const {refreshing} = this.state
    return (
      <div className="container user-index-ao289">
        <header>
          <p className="avatar-ao289">
            <a href="javascript:;">
              <img src={this.avatar} width="100%" alt=""/>
            </a>
            <Link to="/user/modify/avatar" className="edit-avatar">
              编辑头像
            </Link>
          </p>
          <p className="nick-ao289">
            <Link to="/user/modify/nick">{nick}
              <i className="iconfont">&#xe619;</i>
            </Link>
            <span className={refreshing
              ? 'refreshing'
              : ''}>积分:{points}
              <i
                className={`iconfont ${cd
                ? 'in-cd'
                : ''}`}
                onClick={this.refreshPoints}>&#xe6a0;</i>
            </span>
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
            <Item key={4} arrow="horizontal" onClick={() => history.push('/user/coupon')}>
              <p className="list-item">我的优惠券</p>
            </Item>
          </QueueAnim>
        </div>
        <WhiteSpace/>
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
    )
  }
}
