import React, {Component, PureComponent} from 'react'
import {connect} from 'dva'
import {Modal, Toast} from 'antd-mobile'
import Adr from '@/components/AdrChosen'
import ImgHolder from '@/components/Common/ImgHolder'
import './ExChangePage.scss'
const alert = Modal.alert

const mapStateToProps = state => {
  const {adr, user, ptpro} = state
  const {defaultID, dic, selectedID} = adr
  return {
    adr: (selectedID
      ? dic[selectedID]
      : dic[defaultID]) || {},
    user
  }
}

@connect(mapStateToProps)
export default class ExChagePage extends PureComponent {

  exchangeClick = () => {
    alert('提示', '确认支付1200积分兑换xxx么', [
      {
        text: '取消'
      }, {
        text: '确定',
        onPress: () => this.confirmToExchange()
      }
    ])
  }

  confirmToExchange = () => {
    Toast.success('兑换成功', 2)
  }

  render() {
    const {adr} = this.props
    console.log('render')
    return (
      <div className="container exchange-20kdl">
        <div className="content-20kdl">
          <Adr adr={adr}></Adr>
          <div className="box-20kdl">
            <p>商品信息</p>
            <div className="box-split-20kdl">
              <div className="img">
                <ImgHolder size={300} text="Points Pro"/>
              </div>
              <div className="box">
                <p>商品名</p>
                <p>需支付积分 :
                  <i className="iconfont">&#xe66b;</i>
                  <span>1200</span>
                  <i className="iconfont">&#xe60a;</i>
                  <span>1</span>
                </p>
                <p>兑换后剩余积分 :
                  <br/>
                  <i className="iconfont">&#xe66b;</i>
                  <span>1200</span>
                  <i className="iconfont to">&#xe601;</i>
                  <i className="iconfont">&#xe66b;</i>
                  <span>1200</span>
                </p>
              </div>
            </div>
          </div>
          <a
            href="javascript:;"
            onClick={this.exchangeClick}
            onTouchStart={() => {}}
            className="exchange">兑换</a>
        </div>
      </div>
    )
  }
}