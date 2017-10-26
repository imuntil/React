import React from 'react';
import { connect } from 'dva'
import QueueAnim from 'rc-queue-anim'
import _ from 'lodash'
import { Toast } from 'antd-mobile'
import TopTabs from '../../components/Product/TopTab.js'
import ProListView from '../../components/Product/ProListView.js'
import { CategoryLayerF } from "../../components/Product/CategoryLayer.js";
import { SortLayerF } from "../../components/Product/SortLayer.js";
import Item from '../../components/Item.js'
import Loading from '../../components/Loading.js'
import { addProToCart } from "../../services/cart";
import styles from './FilterPage.css'
import { afterLogin } from "../../services/bus";
import routeLoading from '../../components/HighComponent/routeLoading'


function Body({ children }) {
  return (
    <div className={styles.body_box}>
      {
        children
      }
    </div>
  )
}
function Row(props) {
  return <Item {...props} />
}


class Filter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cateLayerShow: false,
      sortLayerShow: false
    }
  }
  componentWillMount() {
    const { params, dispatch, location, cls } = this.props
    if (location.action === 'POP' && cls.length) {
      dispatch({ type: 'product-filter/forceRender' })
    } else {
      dispatch({
        type: 'product-filter/fetchFilter',
        payload: { params }
      })
    }
  }
  shouldComponentUpdate() {
    const { cls, store } = this.props
    if (!cls.length || _.isEmpty(store)) return false
    return true
  }

  handleClick = (type) => {
    const { cateLayerShow, sortLayerShow } = this.state
    if (type === 'L') {
      this.setState({ cateLayerShow: !cateLayerShow, sortLayerShow: false })
    } else {
      this.setState({ sortLayerShow: !sortLayerShow, cateLayerShow: false })
    }
  }
  hideAll = () => {
    const { cateLayerShow, sortLayerShow } = this.state
    if (!cateLayerShow && !sortLayerShow) return
    this.setState({
      cateLayerShow: false,
      sortLayerShow: false
    })
  }
  handleParamsChange = ({ ...payload }) => {
    const { params, dispatch } = this.props
    const nfp = _.isEmpty(this.nfp) ? params : this.nfp
    if (payload.sort && payload.sort === nfp.sort) return
    const pl2 = _.omit(nfp, 'sort')
    if (_.isEqual(pl2, payload)) return
    this.setState({
      cateLayerShow: false,
      sortLayerShow: false
    })
    this.nfp = Object.assign({}, nfp, payload)
    dispatch({
      type: 'product-filter/fetchFilter',
      payload: { params: this.nfp }
    })
  }
  handleAddToCart = async (id) => {
    const { user, dispatch, history } = this.props
    const userid = user && user.usersid
    if (!userid) {
      // 未登录处理
      afterLogin.path = -1
      history.push('/user/login')
      return false
    }
    const { data = {}, err } = await addProToCart({ userid, id, pronum: 1 })
    if (err || (+data.resultcode !== 1 && +data.resultcode !== 0)) {
      dispatch({
        type: 'error/dataOperationError',
        payload: { msg: '添加购物车失败', code: data.resultcode || -10 }
      })
      return false
    }
    dispatch({ type: 'cart/makeExpire' })
    Toast.success('已加入购物车', 1)
  }
  handleBuyNow = (id) => {
    console.log(id);
  }
  nfp = {}
  render() {
    const { cls, page, hasMore, dispatch, data, store, fetching, loading } = this.props
    const { cateLayerShow, sortLayerShow } = this.state
    return (
      <div style={{ position: 'relative', display: 'block', width: '100%', height: '100%' }}>
        {
          loading ? <Loading /> : null
        }
        <div className={styles.normal} style={{ visibility: loading ? 'hidden' : 'visible' }}>
          <QueueAnim type={'top'}>
            {
              cateLayerShow
                ? (
                  <div className={styles.layer} key={`filter-1`}>
                    <CategoryLayerF changeParams={this.handleParamsChange} />
                  </div>
                )
                : null
            }
          </QueueAnim>
          <QueueAnim type={'top'}>
            {
              sortLayerShow
                ? (
                  <div className={styles.layer} key={`filter-2`}>
                    <SortLayerF changeParams={this.handleParamsChange} />
                  </div>
                )
                : null
            }
          </QueueAnim>
          <TopTabs
            onLeftClick={() => { this.handleClick('L') }}
            onRightClick={() => { this.handleClick('R') }}
          />
          <div className={styles.center_box} onClick={this.hideAll}>
            <ProListView
              store={store}
              lists={cls}
              page={page}
              hasMore={hasMore}
              data={data}
              RowComponent={Row}
              BodyComponent={Body}
              replace
              fetching={fetching}
              onLoadMore={() => {
                dispatch({
                  type: `product-filter/updateCLs`,
                  payload: {
                    page: page + 1
                  }
                })
              }}
              handleAddToCart={this.handleAddToCart}
              handleBuyNow={this.handleBuyNow}
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { page, cls, hasMore, fetching } = state[`product-filter`]
  const store = state['list-store']
  const user = state['user-info']
  return {
    page,
    cls,
    hasMore,
    store,
    fetching,
    user,
    loading: state.loading.global
    // loading: state.loading.models['product-filter'] || state.loading.models['list-store']
  };
}

export default connect(mapStateToProps)(routeLoading(Filter))
