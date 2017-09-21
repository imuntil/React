import React from 'react';
import { connect } from 'dva';
import QueueAnim from 'rc-queue-anim'
import styles from './All.css';
import TopTabs from '../../components/Product/TopTab.js'
import ProListView from '../../components/Product/ProListView.js'
import { CategoryLayer } from '../../components/Product/CategoryLayer.js'
import { SortLayer } from '../../components/Product/SortLayer.js'
import Loading from '../../components/Loading.js'
// import Card from '../../components/Card.js'
//
// function Row(props) {
//   return <Card {...props} />
// }

class All extends React.Component {
  constructor(props) {
    super(props)
    console.log('all-constructor');
    this.state = {
      cateLayerShow: false,
      sortLayerShow: false
    }
  }
  handleClick = (type) => {
    const { cateLayerShow, sortLayerShow } = this.state
    type === 'L'
      ? (this.setState({ cateLayerShow: !cateLayerShow, sortLayerShow: false }))
      : (this.setState({ sortLayerShow: !sortLayerShow, cateLayerShow: false }))
  }
  hideAll = () => {
    this.setState({
      cateLayerShow: false,
      sortLayerShow: false
    })
  }
  handleParamsChange = ({ flag, sort, type }) => {
    const { history } = this.props
    history.push(`/product/filter/${flag}/${sort}/${type}`)
  }
  render() {
    const { cls, page, hasMore, dispatch, a, store, loading } = this.props
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
                  <div className={styles.layer} key={'all-1'}>
                    <CategoryLayer changeParams={this.handleParamsChange} />
                  </div>
                )
                : null
            }
          </QueueAnim>
          <QueueAnim type={'top'}>
            {
              sortLayerShow
                ? (
                  <div className={styles.layer} key={'all-1'}>
                    <SortLayer changeParams={this.handleParamsChange} />
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
              data={a}
              onLoadMore={() => {
                dispatch({
                  type: 'product-all/updateCLs',
                  payload: {
                    page: page + 1
                  }
                })
              }}
              onUpdate={(dataBlob, sectionIDs, rowIDs) => {
                dispatch({
                  type: 'lvStatus/updateA',
                  payload: {
                    dataBlob,
                    sectionIDs,
                    rowIDs
                  }
                })
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { page, cls, hasMore } = state['product-all']
  const store = state['list-store']
  const { a: { dataBlob, sectionIDs, rowIDs } } = state.lvStatus
  const a = {
    dataBlob: { ...dataBlob },
    sectionIDs: [...sectionIDs],
    rowIDs: [...rowIDs]
  }
  return { page, cls, hasMore, a, store, loading: state.loading.global };
}

export default connect(mapStateToProps)(All);

