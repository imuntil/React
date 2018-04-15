import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { SwipeAction } from 'antd-mobile'
import Loading from '@/components/Common/Loading'
import Radio from '@/components/Form/AdrRadio'
import { SA, fetchRecommend } from '@/services'
import Susume from '@/components/RecommendPro'
import CustomTM from '@/components/Common/CustomTM'
import { currency } from '@/utils/cts'
import './CartPage.scss'

const Cell = ({ pro = {}, onChange }) => {
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
          <div className="num-box-lwp2s">
            <a href="javascript:;" />
            <span>{pro.pronum}</span>
            <a href="javascript:;" />
          </div>
        </div>
      </div>
    </section>
  )
}

const CartBar = () => {
  return (
    <div className="cart-bar-lwp2s">
      <div className="bar-content">
        <p className="bar-left">
          <Radio />全选
        </p>
        <p className="bar-right">
          <span>合计: {currency(100000)}</span>
          <a href="javascript:;">去结算</a>
        </p>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  const { cart, product } = state
  return { cart, product: product.dic }
}

@connect(mapStateToProps)
export default class CartPage extends PureComponent {
  state = {
    susume: [103, 102],
    forceRender: false
  }
  constructor(props) {
    super(props)
    this.props.dispatch({ type: 'cart/fetch' })
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

  renderCell = (index, key) => {
    const { cart: { dic }, dispatch } = this.props
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
            this.setState(({ forceRender }) => ({
              forceRender: !forceRender
            }))
          }}
        />
      </SwipeAction>
    )
  }

  render() {
    const { cart: { list, dic, expired }, product } = this.props
    const { susume, forceRender } = this.state
    if (list.length && susume.length === 2) {
      this.fetchRecommendPros(dic[list[0]].prolabel)
    }
    return (
      <div className="container cart-lwp2s">
        {!expired && susume.length !== 2 ? (
          <div className="content-lwp2s">
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
          </div>
        ) : (
          <Loading />
        )}
        <CartBar />
      </div>
    )
  }
}
