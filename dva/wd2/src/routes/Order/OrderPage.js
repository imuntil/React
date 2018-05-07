import React, { Component } from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'
import { WhiteSpace, Toast } from 'antd-mobile'
import QueueAnim from 'rc-queue-anim'
import NumBtns from '@/components/NumBtns'
import PaySheet from '@/components/PaySheet'
import Loading from '@/components/Common/Loading'
import postages, { box } from '@/services/postage'
import { wxPay } from '@/services/pay'
import { currency } from '../../utils/cts'
import { SA, able2UseCoupon } from '@/services'
import './OrderPage.scss'

const provinceList = Object.keys(postages)

const Adr = ({ adr = {} }) => {
  return (
    <section className="adr-box-sl92k">
      <div className="content">
        <p>收货人</p>
        <p>
          <span>姓&nbsp;&nbsp;名:&nbsp;{adr.name}</span>
          <span>手机号:&nbsp;{adr.phone}</span>
        </p>
        <p>
          <span>
            地&nbsp;&nbsp;址:&nbsp;{adr.city}
            {adr.address}
          </span>
        </p>
        <p>
          <Link to={`/adr${adr.id ? `?id=${adr.id}` : ''}`}>编辑></Link>
        </p>
      </div>
    </section>
  )
}

const Cell = ({ editAble, pro = {}, num = 1, onChange }) => {
  return (
    <div className="cell-sl92k">
      <div>
        <div className="img">
          <img src={`${SA}${pro.image1}`} width="100%" alt="" />
        </div>
        <div className="right">
          <div className="top-sec-sl92k">
            <div className="info">
              <p>{pro.englishname}</p>
              <p>{pro.proname}</p>
              <p>
                <span className="color--red">{currency(pro.realPrice)}</span>
                <span>{pro.procontent ? `${pro.procontent}ml` : '-'}</span>
              </p>
            </div>
            <div className="total">
              <span>{currency(pro.proprice * num)}</span>
              {!editAble ? <span>x {num}</span> : null}
            </div>
          </div>
          {editAble ? (
            <NumBtns className="num-btns" value={num} onChange={onChange} />
          ) : null}
        </div>
      </div>
    </div>
  )
}

const List = ({ editAble, list, dic, num, onChange, postage, payment, onCouponClick, coupon }) => {
  return (
    <section className="order-box-sl92k">
      <p>商品信息</p>
      <div className="main-sl92k">
        {list.map(id => (
          <Cell
            key={id}
            pro={dic[id]}
            num={num[id]}
            editAble={editAble}
            onChange={(payload, value) => onChange(id, payload, value)}
          />
        ))}
      </div>
      <p>
        <span>配送方式</span>
        <i>快递</i>
      </p>
      <p className="postage-sl92k">
        <span>运费</span>
        <i>{currency(postage.amount)}</i>
        {postage.dis ? (
          <i className="free">
            订单中有免邮商品，已为您减免邮费 {currency(postage.dis)}
          </i>
        ) : null}
      </p>
      <p className="coupon-sl92k" onClick={onCouponClick}>
        <span>优惠</span>
        <i className="iconfont">&#xe600;</i>
      </p>
      <p className="strong">
        <span>需要支付</span>
        <span className="color--red">{currency(payment)}</span>
      </p>
    </section>
  )
}

const mapStateToProps = state => {
  const { adr, user, product, order, wx, coupon } = state
  const { defaultID, dic, selectedID } = adr
  return {
    adr: (selectedID ? dic[selectedID] : dic[defaultID]) || false,
    user,
    order,
    product,
    wx,
    couponList: coupon.unUseList
  }
}
@connect(mapStateToProps)
export default class OrderPage extends Component {
  state = { psVisible: false, able2UseCoupon: false }

  /* 运费 */
  get postage() {
    const {
      order: { list, detail },
      product: { dic, list: proList },
      adr: { city }
    } = this.props
    if (!proList.length || !list.length || !city) return { amount: 0, dis: 0 }
    let hasFree = false
    // 商品数量, 需要付邮费的商品数量, 商品总重量, 去除免邮商品的重量
    let [total, needPayTotal, weightTotal, weightNeedPay] = [0, 0, 0, 0]
    list.forEach(id => {
      const { proweight, postagefree } = dic[id]
      const w = proweight * detail[id]

      total += +detail[id]
      weightTotal += w
      if (postagefree === 'n') {
        needPayTotal += +detail[id]
        weightNeedPay += w
      } else {
        hasFree = true
      }
    })
    const province = provinceList.find(q => city.indexOf(q) > -1)
    /* 报价 */
    const quotation = postages[province]
    // 包装盒重量
    const boxWeight = this.getBoxWeight(total)
    // 总邮费
    const totalPA = this.getPostage(weightTotal, boxWeight, quotation)
    if (!hasFree) {
      return { amount: totalPA, dis: 0 }
    }
    /* 重量 */
    const boxNeedPayWeight = this.getBoxWeight(needPayTotal)
    /* 金额 */
    const needPayPA = this.getPostage(
      weightNeedPay,
      boxNeedPayWeight,
      quotation
    )
    return { amount: needPayPA, dis: totalPA - needPayPA }
  }

  /* 是否可以使用优惠券 coupon able pro */
  get hasCAP() {
    const {
      order: { list },
      product: { dic, list: proList }
    } = this.props
    if (!list.length || !proList.length) return false
    return list.some(id => dic[id].coupon === 'y')
  }

  /* 实际支付金额 */
  get payment() {
    const {
      order: { list, detail },
      product: { dic, list: proList },
      adr: { city }
    } = this.props
    if (!proList.length || !list.length || !city) return 0
    return list.reduce((v, id) => {
      return v + dic[id].proprice * detail[id]
    }, this.postage.amount)
  }

  constructor(props) {
    super(props)
    this.checkUserAble2UseCoupon()
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    const {
      product: { list }
    } = nextProps
    if (!list || !list.length) return false
    return true
  }

  /* 获取箱子重量 */
  getBoxWeight = proNum => {
    if (!proNum) return 0
    const boxNum = Math.floor(proNum / 2)
    const boxWeight =
      proNum % 2 === 0 ? boxNum * box.lg : boxNum * box.lg + box.sm
    return boxWeight
  }

  /* 获取邮费 */
  getPostage = (proWeight, boxWeight, [x, y]) => {
    if (!proWeight) return 0
    return x + Math.ceil((proWeight + boxWeight - 1000) / 1000) * y
  }

  /* 请求服务器，判断用户是否可以使用优惠券 */
  checkUserAble2UseCoupon = async () => {
    const { openID } = this.props.user
    const { fail, data, err } = await able2UseCoupon(openID)
    if (err) return
    const { result } = { ...fail, ...data }
    if (result && result.toLowerCase() === 'yes') {
      this.setState({ able2UseCoupon: true })
    }
  }

  /**
   * 下单
   * @param {number} method  支付方式；
   * 0： 支付宝
   * 1： 微信支付
   */
  placeOrder = method => {
    const { dispatch, adr } = this.props
    Toast.loading('', 100)
    dispatch({
      type: 'order/placeOrder',
      adr,
      code: 'n',
      express: this.postage.amount
    })
      .then(orderNumber => {
        // 处理优惠券
        method ? this.wxPayOrder(orderNumber) : this.aliPayOrder(orderNumber)
      })
      .catch(e => {
        console.log(e)
        Toast.info('出错了，请稍后再试', 1)
      })
  }

  /* 支付 */
  wxPayOrder = async orderNumber => {
    const { openID } = this.props.user
    try {
      // 模拟支付
      await wxPay(openID, orderNumber, this.payment, true)
      Toast.success('支付完成')
    } catch (e) {
      Toast.fail(e || '支付失败', 2)
    }
  }
  aliPayOrder = orderNum => {
    window.location.href = `./ali/index.html?o=${orderNum}&m=${this.payment}`
  }

  /* 商品数量变化 */
  handleNumChange = (id, payload, value) => {
    const v = value + payload
    if (v < 1) return
    this.props.dispatch({
      type: 'order/updateCountLocal',
      proID: id,
      num: v
    })
  }
  render() {
    const {
      adr,
      order: { fromCart, list, detail, coupon },
      product: { dic, list: proList },
      history,
      couponList
    } = this.props
    const { psVisible, able2UseCoupon } = this.state
    /* 优惠券 */
    const selectedCoupon = coupon ? couponList[coupon] : false
    console.log('render')
    return (
      <div className={`container order-sl92k`}>
        {proList.length ? (
          [
            <div className="content-sl92k" key="content">
              <Adr adr={adr || {}} />
              <List
                editAble={!fromCart}
                list={list}
                dic={dic}
                num={detail}
                onChange={this.handleNumChange}
                postage={this.postage}
                payment={this.payment}
                onCouponClick={() => history.push('/user/coupon/check')}
                coupon={selectedCoupon}
              />
              <p style={{ height: 100 }} />
            </div>,
            <div className="bottom-bar-sl92k" key="bar">
              <a
                href="javascript:;"
                onClick={() => {
                  this.setState({ psVisible: true })
                }}
                className="form-btn"
              >
                提交订单
              </a>
            </div>,
            <QueueAnim type="bottom" key="sheet">
              {psVisible ? (
                <PaySheet
                  onClose={() => this.setState({ psVisible: false })}
                  money={this.payment}
                  key="sheet"
                  // couponAble
                  couponAble={this.hasCAP && able2UseCoupon}
                  onPay={this.placeOrder}
                />
              ) : null}
            </QueueAnim>
          ]
        ) : (
          <Loading />
        )}
      </div>
    )
  }
}
