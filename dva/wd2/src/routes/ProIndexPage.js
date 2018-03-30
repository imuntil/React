import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { PullToRefresh } from 'antd-mobile'
import { delay } from '../utils/cts'
import { SA } from '../services'
import './ProIndexPage.scss'
import ProTab from '../components/ProTab'
import ProGrid from '../components/ProGrid'

class ProIndexPage extends PureComponent {
  state = {
    height: 200,
    refreshing: false,
    data: [...Array(20).keys()]
  }

  componentWillMount = () => {
    this.props.dispatch({
      type: 'product/fetch'
    })
  }

  handleLoadMore = async () => {
    this.setState({ refreshing: true })
    await delay(500)
    this.setState(preState => {
      return {
        // data: [...preState.data, ...Array(10).keys()],
        refreshing: false
      }
    })
  }
  render() {
    const { list, perPage, currentIndex } = this.props
    const data = list.slice(0, perPage * currentIndex)
    return (
      <div className="container pro-index-82nlf">
        <ProTab className="header-82nlf" />
        <div className="content-82nlf">
          <PullToRefresh
            ref={el => (this.ptr = el)}
            style={{ height: '100%', overflow: 'auto' }}
            indicator={{ deactivate: '上拉可以刷新' }}
            direction="up"
            refreshing={this.state.refreshing}
            onRefresh={this.handleLoadMore}
          >
            <div className="wrapper-82nlf">
              {data.map(v => (
                <ProGrid
                  className="selling-pro"
                  src={`${SA}${v.image1}`}
                  content={v.procontent}
                  price={v.proprice}
                  en={v.englishname}
                  cn={v.proname}
                  key={v.id}
                />
              ))}
            </div>
          </PullToRefresh>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { list, currentIndex, totalPage, perPage } = state.product
  return { list, currentIndex, totalPage, perPage }
}

export default connect(mapStateToProps)(ProIndexPage)
