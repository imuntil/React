import React, { PureComponent, Component } from 'react'
import { connect } from 'dva'
import { SwipeAction } from 'antd-mobile'
import Loading from '@/components/Common/Loading'
import Radio from '@/components/Form/AdrRadio'
import { SA, fetchRecommend } from '@/services'
import Susume from '@/components/RecommendPro'
import CustomTM from '@/components/Common/CustomTM'
import NumBtns from '@/components/NumBtns'
import { currency } from '@/utils/cts'
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
        <p className="img">
          <img src={`${SA}${pro.image1}`} width="100%" alt="" />
        </p>
        <div className="main-box-lwp2s">
          <p>{pro.englishname}</p>
          <p>{pro.proname}</p>
          <p className="price">
            <span>{pro.procontent} ml</span>{' '}
            <span className="color--red">
              {currency(pro.proprice || 0).replace(' ', '')}
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

const CartBar = ({ onHandleClick, chosenAll, value }) => {
  return (
    <div className="cart-bar-lwp2s">
      <div className="bar-content">
        <p className="bar-left">
          <Radio onChange={onHandleClick} checked={chosenAll} />全选
        </p>
        <p className="bar-right">
          <span>合计: {currency(value)}</span>
          <a href="javascript:;">去结算</a>
        </p>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  const {
    cart: { list, dic },
    product
  } = state
  const all = list.some(v => !dic[v].checked)
  return { cart: { list, dic, all: !all }, product: product.dic }
}

@connect(mapStateToProps)
export default class CartPage extends Component {
  state = {
    susume: [103, 102],
    forceRender: false
  }

  get money() {
    const { list, dic } = this.props.cart
    return list.reduce((money, key) => {
      const { checked, pronum, proprice } = dic[key]
      return money + (checked ? pronum * proprice : 0)
    }, 0)
  }

  constructor(props) {
    super(props)
    this.props.dispatch({ type: 'cart/fetch' })
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    const { susume } = nextState
    const {
      cart: { list, dic, expired }
    } = nextProps
    if (expired || !list.length) return false
    if (susume.length === 2) {
      this.fetchRecommendPros(dic[list[0]].prolabel)
      return false
    }
    return true
  }

  fetchRecommendPros = async type => {
    const { data } = await fetchRecommend(type)
    if (!data) {
      return
    }
    this.setState({
      susume: data.result.map(v => v.id).concat(103, 102)
    })
  }

  delCartPro = (index, cid) => {
    this.props.dispatch({
      type: 'cart/delCartPro',
      payload: { index, cid }
    })
  }

  forceRender = () => {
    this.setState(({ forceRender }) => ({
      forceRender: !forceRender
    }))
  }

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

  renderCell = (index, key) => {
    const {
      cart: { dic },
      dispatch
    } = this.props
    return (
      <SwipeAction
        className="swipe"
        autoClose
        right={[
          {
            text: '删除',
            onPress: () => {
              this.delCartPro(index, dic[key].cid)
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
          pro={dic[key]}
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
        {!expired && susume.length !== 2 ? (
          [
            <div className="content-lwp2s" key="content">
              {[
                <CustomTM
                  key="tm"
                  list={list}
                  forceRender={forceRender}
                  renderCell={this.renderCell}
                  marginBottom={10}
                />,
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
              onHandleClick={() => {
                dispatch({
                  type: 'cart/toggleSelectedAll',
                  checked: !all
                })
                this.forceRender()
              }}
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
