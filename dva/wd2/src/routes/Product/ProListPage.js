import React, { PureComponent } from 'react'
import { connect } from 'dva'
import TweenOne from 'rc-tween-one'
import './ProListPage.scss'
import ReactList from 'react-list'
import ListCell from '@/components/ListCell'
import ProTab from '@/components/ProTab'
import { fetchProducts } from '@/services'
import { formatSearch } from '@/utils/cts'
import { add2Cart_buyNow } from '@/services/decorator'

const mapStateToProps = state => {
  const { user } = state
  return { user, isLogin: !!user.phone }
}

@connect(mapStateToProps)
@add2Cart_buyNow  
class ProListPage extends PureComponent {
  state = {
    list: [],
    loadTime: 1
  }
  filter = {
    sort: null,
    type: null,
    get flag() {
      return this.type ? 2 : 1
    }
  }
  listEle = null
  animation = {
    translateX: 0,
    translateY: 0,
    opacity: 1,
    duration: 250
  }
  componentWillMount() {
    const query = formatSearch(this.props.location.search)
    this.setFilterAndFetch(query)
  }

  componentWillReceiveProps({ location }) {
    const { search } = this.props.location
    if (location.search === search) return
    this.setState(preState => {
      return { loadTime: ++preState.loadTime }
    })
    const query = formatSearch(location.search)
    this.setFilterAndFetch(query)
  }

  /* set filter and fetch */
  setFilterAndFetch(query) {
    const { type, sort } = query
    this.filter.sort = sort
    this.filter.type = type
    this.fetchFilterPro()
  }

  handleCellClick = ({ type, sort }) => {
    if (type > 7) return
    const t = type || this.filter.type
    const s = sort || this.filter.sort
    this.listEle.scrollTo(0)
    this.props.history.replace(`/pro/list?type=${t}&sort=${s}`)
  }

  /* 加入购物车 */
  handleAddToCart = id => {
    const { isLogin, dispatch } = this.props
    if (!isLogin) {
      this.toLogin()
      return
    }
    // await dispatch
  }

  /* 立即购买 */
  handleBuyNow = id => {
    // ...
  }

  /* 根据条件查询 */
  fetchFilterPro = async () => {
    const { type, sort, flag } = this.filter
    const { data } = await fetchProducts(flag, sort, type)
    if (!data) {
      // error
      return
    }
    this.setState({
      list: data.result
    })
  }

  renderItem = (index, key) => {
    const pro = this.state.list[index]
    return (
      <TweenOne
        animation={{ ...this.animation, delay: index * 100 }}
        className="list-cell-xlw29"
        key={key}
      >
        <ListCell
          pro={pro}
          key={pro.id}
          onCartClick={this.handleAddToCart}
          onBuyClick={this.handleBuyNow}
        />
      </TweenOne>
    )
  }

  render () {
    const { list, loadTime } = this.state
    const { type, sort } = this.filter
    return (
      <div className="container pro-list-xlw29">
        <ProTab
          className="header-xlw29"
          onTypeCellClick={type => this.handleCellClick({ type })}
          onSortCellClick={sort => this.handleCellClick({ sort })}
          type={+type}
          sort={+sort}
        />
        <div className="content-xlw29">
          {loadTime % 2 === 0 ? (
            <ReactList
              itemRenderer={this.renderItem}
              length={list.length}
              type="simple"
              pageSize={8}
              ref={el => (this.listEle = el)}
              key={1}
            />
          ) : (
            <ReactList
              itemRenderer={this.renderItem}
              length={list.length}
              type="simple"
              pageSize={8}
              ref={el => (this.listEle = el)}
              key={2}
            />
          )}
        </div>
      </div>
    )
  }
}

export default ProListPage
