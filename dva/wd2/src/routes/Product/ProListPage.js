import React, { PureComponent } from 'react'
import { connect } from 'dva'
// import QueueAnim from 'rc-queue-anim'
// import Animate from 'rc-animate'
import './ProListPage.scss'
import ReactList from 'react-list'
import ListCell from '@/components/ListCell'
import ProTab from '@/components/ProTab'
import { fetchProducts } from '@/services'

@connect()
class ProListPage extends PureComponent {
  state = {
    list: []
  }
  filter = {
    sort: null,
    type: null,
    get flag() {
      return this.type ? 2 : 1
    }
  }
  listEle = null
  componentWillMount() {
    const query = this.formatSearch()
    this.setFilterAndFetch(query)
  }

  componentWillReceiveProps({ location }) {
    const { search } = this.props.location
    if (location.search === search) return
    const query = this.formatSearch(location)
    this.setFilterAndFetch(query)
  }

  /* set filter and fetch */
  setFilterAndFetch(query) {
    const { type, sort } = query
    this.filter.sort = sort
    this.filter.type = type
    this.fetchFilterPro()
  }

  /* format search */
  formatSearch = location => {
    const { search } = location || this.props.location
    const res = {}
    search
      .substr(1)
      .split('&')
      .forEach(v => {
        const [key, value] = v.split('=')
        res[key] = +value === -1 ? '' : +value
      })
    return res
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
      list: data.result
    })
  }

  renderItem = (index, key) => {
    const pro = this.state.list[index]
    return (
      <div className="list-cell-xlw29" key={key}>
        <ListCell pro={pro} key={pro.id} />
      </div>
    )
  }

  render() {
    const list = this.state.list
    return (
      <div className="container pro-list-xlw29">
        <ProTab
          className="header-xlw29"
          onTypeCellClick={type => this.handleCellClick({ type })}
          onSortCellClick={sort => this.handleCellClick({ sort })}
        />
        {/* <QueueAnim className="content-xlw29">
          {list.map(v => (
            <ListCell className="list-cell-xlw29" key={v.id} pro={v} />
          ))}
        </QueueAnim> */}
        <div className="content-xlw29">
          <ReactList
            itemRenderer={this.renderItem}
            length={list.length}
            type="simple"
            pageSize={8}
            ref={el => (this.listEle = el)}
          />
        </div>
      </div>
    )
  }
}

export default ProListPage
