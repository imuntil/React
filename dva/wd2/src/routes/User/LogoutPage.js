import React, { PureComponent } from 'react'
import { connect } from 'dva'
import QueueAnim from 'rc-queue-anim'
import { List } from 'antd-mobile'
import './LogoutPage.scss'

const Item = List.Item

@connect()
export default class LogoutPage extends PureComponent {
  handleLogout = () => {
    this.props.dispatch({
      type: 'user/setUser',
      payload: {
        openID: '',
        phone: '',
        nick: '',
        userID: '',
        avatar: '',
        ran: ''
      }
    })
  }

  render() {
    return (
      <div className="container logout-9z92l">
        <div className="am-list">
          <QueueAnim className="am-list-body">
            <Item key={0} arrow="horizontal">
              <p className="list-item flex">
                <span>手机号</span>
                <span>130****6765</span>
              </p>
            </Item>
            <Item
              key={1}
              arrow="horizontal"
              onClick={() => this.props.history.push('/user/modify/pwd')}
            >
              <p className="list-item">修改登陆密码</p>
            </Item>
            <p key={3} className="form-btn-box">
              <a
                href="javascript:;"
                className="form-btn"
                onClick={this.handleLogout}
              >
                退出登录
              </a>
            </p>
          </QueueAnim>
        </div>
      </div>
    )
  }
}
