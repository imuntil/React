import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { PullToRefresh } from 'antd-mobile'
import QueueAnim from 'rc-queue-anim'
import { delay } from '@/utils/cts'
import { SA } from '@/services'
import './ProIndexPage.scss'
import ProTab from '@/components/ProTab'
import ProGrid from '@/components/ProGrid'
import Loading from '@/components/Common/Loading'

class ProIndexPage extends PureComponent {
  state = {
    refreshing: false
  }

  handleCellClick({ type, sort }) {
    if (type > 7) return
    this.props.history.push(`/pro/list?type=${type || -1}&sort=${sort || 1}`)
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
    const { list, perPage, currentIndex, dic } = this.props
    const data = list.slice(0, perPage * currentIndex)
    return (
      <div className="container pro-index-82nlf">
        {list.length ? (
          [
            <ProTab
              key="tab"
              className="header-82nlf"
              onTypeCellClick={type => this.handleCellClick({ type })}
              onSortCellClick={sort =>
                this.handleCellClick({
                  sort
                })
              }
            />,
            <div className="content-82nlf" key="content">
              <PullToRefresh
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
                      src={`${SA}${dic[v].image1}`}
                      price={dic[v].realPrice}
                      en={dic[v].englishname}
                      cn={dic[v].proname}
                      key={dic[v].id}
                      id={dic[v].id}
                    />
                  ))}
                </QueueAnim>
              </PullToRefresh>
            </div>
          ]
        ) : (
          <Loading />
        )}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { ...state.product }
}

export default connect(mapStateToProps)(ProIndexPage)
