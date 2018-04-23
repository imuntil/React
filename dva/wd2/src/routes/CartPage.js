import React, { PureComponent, Component } from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'
import { SwipeAction, Toast } from 'antd-mobile'
import __eq from 'lodash.eq'
import Loading from '@/components/Common/Loading'
import Radio from '@/components/Form/AdrRadio'
import { SA, fetchRecommend } from '@/services'
import Susume from '@/components/RecommendPro'
import CustomTM from '@/components/Common/CustomTM'
import ImgHolder from '@/components/Common/ImgHolder'
import NumBtns from '@/components/NumBtns'
import { currency, isEmptyObj } from '@/utils/cts'
import './CartPage.scss'

const Cell = ({ pro = {}, onChange, onNumChange }) => {
  return (
    <section className="cell-lwp2s">
      <div className="cell-box-lwp2s">
        <p className="radio">
          <Radio
            className="in-cart"
            onChange={onChange}
            checked={pro.checked}
          />
        </p>
        <Link to={`/pro/${pro.id}`} className="img">
          <ImgHolder src={`${SA}${pro.image1}`} width="100%" alt="" />
        </Link>
        <div className="main-box-lwp2s">
          <p>{pro.englishname}</p>
          <p>{pro.proname}</p>
          <p className="price">
            <span>{pro.procontent ? `${pro.procontent}ml` : '-'}</span>
            <span className="color--red">
              {currency(pro.realPrice || 0).replace(' ', '')}
            </span>
          </p>
          <NumBtns
            className="num-box-lwp2s"
            onChange={onNumChange}
            value={pro.pronum}
          />
        </div>
      </div>
    </section>
  )
}

const CartBar = ({ onToggleSelect, chosenAll, value, onClearing }) => {
  return (
    <div className="cart-bar-lwp2s">
      <div className="bar-content">
        <p className="bar-left">
          <Radio onChange={onToggleSelect} checked={chosenAll} />全选
        </p>
        <p className="bar-right">
          <span>合计: {currency(value)}</span>
          <a href="javascript:;" onClick={onClearing}>
            去结算
          </a>
        </p>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  const {
    cart: { list, dic, expired },
    product
  } = state
  const all = list.some(v => !dic[v].checked)
  return { cart: { list, dic, all: !all, expired }, product: product.dic }
}

@connect(mapStateToProps)
export default class CartPage extends Component {
  state = {
    susume: [103, 102],
    forceRender: false
  }
  /* 获取推荐 */
  fetched = false

  get money() {
    const {
      cart: { list, dic },
      product
    } = this.props
    if (isEmptyObj(product)) return 0
    return list.reduce((money, key) => {
      const { checked, pronum } = dic[key]
      return money + (checked ? pronum * product[key].proprice : 0)
    }, 0)
  }

  constructor(props) {
    super(props)
    this.props.dispatch({ type: 'cart/fetch' })
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    const {
      cart: { list, expired, dic },
      product
    } = nextProps
    if (expired || !Object.keys(product).length) return false
    if (!this.fetched) {
      this.fetchRecommendPros(product[list[0]].prolabel)
      return false
    }
    if (__eq(nextState, this.state) && __eq(dic, this.props.cart.dic))
      return false
    return true
  }

  fetchRecommendPros = async type => {
    if (this.fetched) return
    const { data } = await fetchRecommend(type)
    this.fetched = true
    if (!data) return
    this.setState({
      susume: data.result.map(v => v.id).concat(103, 102)
    })
  }

  /* 删除商品 */
  delCartPro = (index, cid) => {
    this.props.dispatch({
      type: 'cart/delCartPro',
      payload: { index, cid }
    })
  }

  /* 强制渲染 */
  forceRender = () => {
    this.setState(({ forceRender }) => ({
      forceRender: !forceRender
    }))
  }

  /* 修改商品数量 */
  handleNumChange = (payload, value, proID) => {
    const v = value + payload
    this.props.dispatch({
      type: 'cart/modifyCartNum',
      payload: {
        proID,
        value: v > 1 ? v : 1
      }
    })
    this.forceRender()
  }

  /* 结算 */
  handleClearing = () => {
    const {
      dispatch,
      history,
      cart: { list, dic }
    } = this.props
    const detail = list.reduce((obj, id) => {
      dic[id].checked && (obj[id] = dic[id].pronum)
      return obj
    }, {})
    if (isEmptyObj(detail)) {
      Toast.fail('请选择商品', 1)
      return
    }
    dispatch({
      type: 'order/setLocal',
      fromCart: true,
      detail
    })
    history.push('/order')
  }

  renderCell = (index, key) => {
    const {
      cart: { dic },
      dispatch,
      product
    } = this.props
    const pro = { ...product[key], ...dic[key] }
    return (
      <SwipeAction
        className="swipe"
        autoClose
        right={[
          {
            text: '删除',
            onPress: () => {
              this.delCartPro(index, pro.cid)
            },
            style: {
              backgroundColor: '#e41035',
              color: '#fff',
              padding: '20px'
            }
          }
        ]}
      >
        <Cell
          key={key}
          pro={pro}
          onChange={checked => {
            dispatch({
              type: 'cart/toggleSelected',
              checked,
              id: key
            })
            this.forceRender()
          }}
          onNumChange={(v, value) => {
            this.handleNumChange(v, value, key)
          }}
        />
      </SwipeAction>
    )
  }

  render() {
    console.log('render')
    const {
      cart: { list, expired, all },
      product,
      dispatch
    } = this.props
    const { susume, forceRender } = this.state
    return (
      <div className="container cart-lwp2s">
        {!expired ? (
          [
            <div className="content-lwp2s" key="content">
              {[
                list.length ? (
                  <CustomTM
                    key="tm"
                    list={list}
                    forceRender={forceRender}
                    renderCell={this.renderCell}
                    marginBottom={10}
                  />
                ) : (
                  <div className="empty" key="empty">
                    <img src={require('@/assets/empty-cart.jpg')} alt="" />
                  </div>
                ),
                <Susume
                  key="susume"
                  className="susume-lwp2s"
                  title="猜你喜欢"
                  pros={susume.map(v => product[v])}
                />
              ]}
            </div>,
            <CartBar
              key="bar"
              onToggleSelect={() => {
                dispatch({
                  type: 'cart/toggleSelectedAll',
                  checked: !all
                })
                this.forceRender()
              }}
              onClearing={this.handleClearing}
              chosenAll={all}
              value={this.money}
            />
          ]
        ) : (
          <Loading />
        )}
      </div>
    )
  }
}
