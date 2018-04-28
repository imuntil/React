import React, { Component } from 'react'
import { connect } from 'dva'
import TweenOne from 'rc-tween-one'
import ReactList from 'react-list'
import { Toast } from 'antd-mobile'
import ListCell from '@/components/ListCell'
import ProTab from '@/components/ProTab'
import add2Cart_buyNow from '@/components/HOC/add2Cart_buyNow'
import Loading from '@/components/Common/Loading'
import { fetchProducts } from '@/services'
import { formatSearch } from '@/utils/cts.ts'
import './ProListPage.scss'

const mapStateToProps = state => {
  const {
    user,
    product: { dic, list: all }
  } = state
  return { user, isLogin: !!user.phone, dic, all }
}

// @connect(mapStateToProps)
class ProListPage extends Component {
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

  shouldComponentUpdate = (nextProps, nextState) => {
    const { all } = nextProps
    // 如果产品总列表没有加载，则不渲染
    if (!all.length) return false
    return true
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

  /* 根据条件查询 */
  fetchFilterPro = async () => {
    const { type, sort, flag } = this.filter
    const { data } = await fetchProducts(flag, sort, type)
    if (!data) {
      // error
      return
    }
    this.setState({
      list: data.result.map(v => v.id)
    })
  }

  toast = msg => {
    Toast.success(msg, 1)
  }

  renderItem = (index, key) => {
    const id = this.state.list[index]
    const { addToCart, buyNow, dic } = this.props
    return (
      <TweenOne
        animation={{ ...this.animation, delay: index * 100 }}
        className="list-cell-xlw29"
        key={key}
      >
        <ListCell
          pro={dic[id]}
          key={id}
          onCartClick={addToCart}
          onBuyClick={buyNow}
        />
      </TweenOne>
    )
  }

  render() {
    const { list, loadTime } = this.state
    const { type, sort } = this.filter
    return (
      <div className="container pro-list-xlw29">
        {this.props.all.length ? (
          [
            <ProTab
              key="tab"
              className="header-xlw29"
              onTypeCellClick={type => this.handleCellClick({ type })}
              onSortCellClick={sort => this.handleCellClick({ sort })}
              type={+type}
              sort={+sort}
            />,
            <div className="content-xlw29" key="content">
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
          ]
        ) : (
          <Loading />
        )}
      </div>
    )
  }
}

export default connect(mapStateToProps)(add2Cart_buyNow(ProListPage))
