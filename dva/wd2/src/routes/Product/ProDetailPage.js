import React, { Component } from 'react'
import { connect } from 'dva'
import Animate from 'rc-animate'
import { Toast } from 'antd-mobile'
import { SA, fetchRecommend } from '@/services'
import { drinks, mustLike } from '@/services/config'
import { currency, scrollTo } from '@/utils/cts'
import Susume from '@/components/RecommendPro'
import Loading from '@/components/Common/Loading'
import add2Cart_buyNow from '@/components/HOC/add2Cart_buyNow'
import './ProDetailPage.scss'

const Like = ({ like, handleClick }) => {
  return (
    <a
      href="javascript:;"
      className={`like-btn-u10n1`}
      onClick={() => handleClick(like)}
    >
      {!like ? (
        <img src={require('@/assets/not-like.png')} alt="" />
      ) : (
        <img src={require('@/assets/like.png')} alt="" />
      )}
    </a>
  )
}

const MoreInfo = ({ alcoholic, origin, type, weight, method }) => {
  return (
    <div className="more-msg-u10n1">
      <p>酒精度: {alcoholic}%</p>
      <p>来自: {origin}</p>
      <p>类别: {type}</p>
      <p>重量: {weight}g</p>
      <p>引用方式: {method}</p>
    </div>
  )
}

const AfterService = ({ more, handleClick }) => {
  return (
    <section className="after-service-u10n1">
      <h2 className="section-titles">配送及售后说明</h2>
      <ul>
        <li>
          关于图片：店内商品均为实物拍摄，由于显示器的不同可能会出现一些色差，请以实物为准
          <img src={require('@/assets/detail-sign.jpg')} alt="" />
        </li>
        <li>
          购买须知：配送地位于极端寒冷天气地域范围的，购买前请咨询客服人员
        </li>
        <li>
          包裹拆分：因为产品和订单较大，遇到系统拆单情况，可能需要您签收多次包裹，给您带来的不便敬请谅解
        </li>
        <Animate component="div" transitionName="max-height">
          {more ? (
            <div key="k1">
              <li>
                快递须知：本店默认发圆通快递，不支持买家指定。如圆通不到您指定的区域，请咨询客服人员。每天16:30前的订单正常情况当天发出，余下订单会在24小时内发出
              </li>
              <li>发货范围：全国可送（不含港澳台地区）</li>
              <li>
                破损情况：本店出售商品在签收是发现有破损情况，请及时与客服联系，经核实确认后我们会给您尽快补发。请放心购买。
              </li>
              <li>商品退换：该商品不支持七天无理由退换</li>
              <li>
                开票须知：如需开具发票，请在收到宝贝7天后，联系客服提交开票申请及要求。发票将在2个工作日内为您开具。
              </li>
            </div>
          ) : null}
        </Animate>
      </ul>
      <p>
        <a
          href="javascript:;"
          onClick={handleClick}
          className={`${more ? 'rotate' : ''}`}
        >
          更多<i>▼</i>
        </a>
      </p>
    </section>
  )
}

const BottomBar = ({ handleAddToCart, handleBuyNow }) => {
  return (
    <div className="bottom-bar-u10n1">
      <a href="javascript:;" onClick={handleAddToCart}>
        加入购物车
      </a>
      <a href="javascript:;" onClick={handleBuyNow}>
        立即购买
      </a>
    </div>
  )
}

class ProDetailPage extends Component {
  state = {
    maybeLike: [],
    more: false
  }
  el = null

  get proID() {
    return this.props.match.params.id
  }

  componentWillMount = () => {
    const {
      pro: { dic }
    } = this.props
    const pro = dic[this.proID] || {}
    pro.prolabel && this.fetchRecommendPros(pro.prolabel)
  }

  componentWillReceiveProps = nextProps => {
    const {
      pro: { dic },
      match
    } = this.props
    const preId = match.params.id
    const nextId = nextProps.match.params.id
    if (nextId === preId) return
    if (this.el) {
      scrollTo(this.el)
    }
    const [preType, nextType] = [dic[preId].prolabel, dic[nextId].prolabel]
    if (preType === nextType) return
    this.fetchRecommendPros(nextType)
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    const {
      pro: { dic }
    } = nextProps
    const { maybeLike } = nextState
    const d = dic[this.proID]
    if (!d) return false
    if (!maybeLike.length) {
      this.fetchRecommendPros(d.prolabel)
      return false
    }
    return true
  }

  /* 获取推荐商品 */
  fetchRecommendPros = async type => {
    const { data } = await fetchRecommend(type)
    if (!data) {
      // this.props.dispatch()
      // some error
      return
    }
    this.setState({
      maybeLike: data.result.map(v => v.id)
    })
  }

  /* toggle like */
  handleToggleLike = currentLike => {
    const { isLogin, dispatch } = this.props
    if (!isLogin) {
      this.toLogin()
      return
    }
    dispatch({
      type: 'col/toggleServerLike',
      payload: {
        status: currentLike,
        proID: this.proID
      }
    })
  }

  fn = el => {
    this.el = el
  }

  render() {
    const {
      pro: { dic },
      cols,
      addToCart,
      buyNow
    } = this.props
    const { maybeLike, more } = this.state
    const d = dic[this.proID]
    return d && maybeLike.length ? (
      <div className="inner-wrapper">
        <div className="container detail-page-u10n1" ref={this.fn}>
          <section className="top">
            <img src={`${SA}${d.image1}`} alt="" className="poster-u10n1" />
            <div className="short-msg-u10n1">
              <div>
                <p>{d.englishname}</p>
                <p>{d.proname}</p>
                <p>{d.procontent}ml</p>
                <p className="last-u10n1 color--red">{currency(d.proprice)}</p>
              </div>
              <Like
                like={cols.indexOf(this.proID) !== -1}
                handleClick={this.handleToggleLike}
              />
            </div>
            <p className="separator-u10n1" />
            <MoreInfo
              alcoholic={d.proalcoholic}
              origin={d.proarea}
              type={drinks[d.prolabel]}
              weight={d.proweight}
              method={d.drnk}
            />
          </section>
          <section
            className="rich-words-u10n1"
            dangerouslySetInnerHTML={{ __html: d.prodes }}
          />
          <AfterService
            more={more}
            handleClick={() =>
              this.setState(preState => ({
                more: !preState.more
              }))
            }
          />
          <Susume title={'猜你喜欢'} pros={maybeLike.map(v => dic[v])} />
          <Susume title={'一定喜欢'} pros={mustLike.map(v => dic[v])} />
        </div>
        <BottomBar
          handleAddToCart={() => addToCart(this.proID)}
          handleBuyNow={() => buyNow(this.proID)}
        />
      </div>
    ) : (
      <Loading />
    )
  }
}

function mapStateToProps(state) {
  const { product, col, user } = state
  return { pro: product, cols: col.list, isLogin: !!user.phone }
}

export default connect(mapStateToProps)(add2Cart_buyNow(ProDetailPage))
