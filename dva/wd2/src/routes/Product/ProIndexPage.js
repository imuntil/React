import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { PullToRefresh } from 'antd-mobile'
import QueueAnim from 'rc-queue-anim'
import { delay } from '@/utils/cts'
import { SA } from '@/services'
import './ProIndexPage.scss'
import ProTab from '@/components/ProTab'
import ProGrid from '@/components/ProGrid'

class ProIndexPage extends PureComponent {
  state = {
    refreshing: false
  }

  componentWillMount = () => {
    this.props.dispatch({
      type: 'product/fetch'
    })
  }

  handleLoadMore = async () => {
    this.setState({ refreshing: true })
    await delay(500)
    this.props.dispatch({ type: 'product/loadMore' })
    this.setState(preState => {
      return {
        refreshing: false
      }
    })
  }

  get hasMore() {
    const { totalPage, currentIndex } = this.props
    return totalPage > currentIndex
  }
  render() {
    const { list, perPage, currentIndex } = this.props
    const data = list.slice(0, perPage * currentIndex)
    console.log(this.hasMore)
    return (
      <div className="container pro-index-82nlf">
        <ProTab className="header-82nlf" />
        <div className="content-82nlf">
          <PullToRefresh
            ref={el => (this.ptr = el)}
            style={{ height: '100%', overflow: 'auto' }}
            indicator={
              this.hasMore
                ? {
                    deactivate: '上拉加载',
                    activate: '松开加载更多',
                    finish: '完成'
                  }
                : {
                    deactivate: '没有更多了',
                    activate: '再拉也没有了╮(￣▽￣)╭',
                    finish: '╮(￣▽￣)╭'
                  }
            }
            direction="up"
            refreshing={this.state.refreshing}
            onRefresh={this.handleLoadMore}
            distanceToRefresh={50}
          >
            <QueueAnim className="wrapper-82nlf">
              {data.map(v => (
                <ProGrid
                  className="selling-pro"
                  src={`${SA}${v.image1}`}
                  price={v.proprice}
                  en={v.englishname}
                  cn={v.proname}
                  key={v.id}
                  id={v.id}
                />
              ))}
            </QueueAnim>
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
