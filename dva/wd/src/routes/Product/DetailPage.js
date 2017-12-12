import React from 'react';
import { connect } from 'dva';
import QueueAnim from 'rc-queue-anim'
import { WhiteSpace as WS, Icon, Toast } from 'antd-mobile'
import { IMGURL, mustLikeIds, types } from '../../constant'
import Loading from '../../components/Loading.js'
import Like from '../../components/Like/Like.js'
import styles from './DetailPage.css';
import { addProToCart } from "../../services/cart";
import { afterLogin } from "../../services/bus";
import routeLoading from '../../components/HighComponent/routeLoading'
import PriceLabel from '../../components/PriceLabel.js'

function LikeLoading({ like, loading }) {
  return (
    loading
      ? <Icon type="loading" />
      : (
      like
        ? <img src={require('../../assets/ig-dir/like.png')} alt="" />
        : <img src={require('../../assets/ig-dir/not-like.png')} alt="" />
    )
  )
}
function Tabbar({ onAddToCart }) {
  return (
    <div className={styles.tabbar}>
      <a className={styles.cart} href="javascript:;" onClick={onAddToCart}>加入购物车</a>
      <a className={styles.buy} href="javascript:;">立即购买</a>
    </div>
  )
}
class Detail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      more: false
    }
  }
  componentWillMount() {
    const { params: { sku }, dispatch } = this.props
    dispatch({
      type: 'detail/fetchDetail',
      payload: [sku, ...mustLikeIds]
    })
  }
  shouldComponentUpdate() {
    const { current, must = [] } = this.props
    if (!current || !must.length) return false
    return true
  }
  handleClick = () => {
    const { more } = this.state
    this.setState({ more: !more })
  }
  handleCollectionClick = currentStatus => {
    const { params: { sku }, dispatch } = this.props
    const whether = this.whetherToLogin()
    if (whether) return false
    dispatch({ type: 'collection/toggleLike', payload: { sku, currentStatus } })
  }
  handleAddToCart = async () => {
    const { params: { sku }, dispatch, user } = this.props
    if (this.whetherToLogin()) return false
    const { data = {}, err } = await addProToCart({ uid: user._id, sku, pronum: 1 })
    if (err || (+data.code !== 0)) {
      dispatch({
        type: 'error/dataOperationError',
        payload: { msg: '添加购物车失败', code: data.code || -10 }
      })
      return false
    }
    dispatch({ type: 'cart/makeExpire' })
    Toast.success('已加入购物车', 1)
  }
  whetherToLogin = () => {
    const { history, user, params: { sku } } = this.props
    if (!user._id) {
      // 未登录状况
      afterLogin.path = `/product/detail/${sku}`
      history.push('/user/login')
      return true
    }
    return false
  }
  render() {
    const { current, loading, store,
      likeLoading, must, maybe, collection, params: { sku } } = this.props
    const { more } = this.state
    const like = collection.indexOf(+sku) > -1
    const data = store[current]
    const maybeData = maybe.map(i => store[i])
    const mustData = must.map(i => store[i])
    return (
      <div className={styles.body}>
        {
          loading || !current
            ? <Loading />
            : (
              <div className={styles.normal}>
                <div className="section" style={{ paddingTop: 0 }}>
                  <img src={IMGURL + data.images[0]} alt="" width="100%" />
                  <WS />
                  <div className={styles.info}>
                    <div className={styles.name}>
                      <p className={styles.font}>{data.en}</p>
                      <p className={styles.font}>{data.cn}</p>
                    </div>
                    <div className={styles.heart}>
                      <a href="javascript:;" onClick={() => this.handleCollectionClick(like)}>
                        <LikeLoading like={like} loading={likeLoading} />
                      </a>
                    </div>
                  </div>
                  <p className={styles.content}>{data.content}ml</p>
                  <WS />
                  <p className={styles.price}>
                    <PriceLabel price={data.truePrice} />
                  </p>
                  <WS size="lg" />
                  <div className={styles.pro_params}>
                    <span>酒精度:{data.alcoholic}%</span>
                    <span>来自:{data.origin}</span>
                    <span>类别:{types[data._type]}</span>
                    <span>重量:{data.weight}g</span>
                    <span>饮用方式:{data.drnk}</span>
                  </div>
                </div>
                <WS />
                <div className="section">
                  <div className={styles.rich} dangerouslySetInnerHTML={{ __html: data.introduce }} />
                </div>
                <WS />
                <div className="section">
                  <div className={styles.after_service}>
                    <p className="section_title">配送及售后说明</p>
                    <div className={styles.box}>
                      <p className={styles.fc}>
                        <span>关于图片：店内商品均为实物拍摄，由于显示器的不同可能会出现一些色差，请以实物为准</span>
                        <a href="javascript:;">
                          <img src={require('../../assets/ig-dir/detail-sign.jpg')} alt="" />
                        </a>
                      </p>
                      <p>购买须知：配送地位于极端寒冷天气地域范围的，购买前请咨询客服人员</p>
                      <p>包裹拆分：因为产品和订单较大，遇到系统拆单情况，可能需要您签收多次包裹，给您带来的不便敬请谅解</p>
                      <QueueAnim type={'top'}>
                        {
                          !more
                            ? null
                            : (
                              <div key="_9dke0">
                                <p>快递须知：本店默认发圆通快递，不支持买家指定。如圆通不到您指定的区域，请咨询客服人员。
                                  每天16:30前的订单正常情况当天发出，余下订单会在24小时内发出</p>
                                <p>发货范围：全国可送（不含港澳台地区）</p>
                                <p>破损情况：本店出售商品在签收是发现有破损情况，请及时与客服联系，经核实确认后我们会给您尽快补发。请放心购买。</p>
                                <p>商品退换：该商品不支持七天无理由退换</p>
                                <p>开票须知：如需开具发票，请在收到宝贝7天后，联系客服提交开票申请及要求。发票将在2个工作日内为您开具。</p>
                              </div>
                            )
                        }
                      </QueueAnim>
                    </div>
                    <a href="javascript:;" onClick={this.handleClick} className={styles.more}>更多 <span /></a>
                  </div>
                </div>
                <WS />
                <Like title={'猜你喜欢'} data={maybeData} />
                <WS />
                <Like title={'一定喜欢'} data={mustData} />
              </div>
            )
        }
        <Tabbar onAddToCart={this.handleAddToCart} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { current, maybe, must } = state.detail
  const collection = state.collection
  const load = state.loading.models
  const user = state['user-info']
  const store = state['list-store']
  return {
    current,
    maybe,
    must,
    loading: load.detail,
    likeLoading: load.collection,
    collection,
    user,
    store
  };
}

export default connect(mapStateToProps)(routeLoading(Detail));
