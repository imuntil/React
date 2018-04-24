import React, { Component } from 'react'
import { Toast } from 'antd-mobile'

const add2Cart_buyNow = Cmp => {
  class ABPage extends Component {
    /* 前往登陆 */
    toLogin = () => {
      const { history, location } = this.props
      history.push({ pathname: '/user/login', state: { from: location } })
    }

    /* 加入购物车 */
    addToCart = async proID => {
      const { isLogin, dispatch } = this.props
      if (!isLogin) {
        this.toLogin()
        return
      }
      await dispatch({ type: 'cart/addToCart', proID })
      Toast.success('添加完成', 1)
    }

    /* 立即购买 */
    buyNow = proID => {
      const { history, dispatch } = this.props
      dispatch({
        type: 'order/setLocal',
        fromCart: false,
        detail: { [proID]: 1 }
      })
      history.push('/order')
    }

    render() {
      return (
        <Cmp {...this.props} addToCart={this.addToCart} buyNow={this.buyNow} toLogin={this.toLogin} />
      )
    }
  }
  return ABPage
}

export default add2Cart_buyNow
