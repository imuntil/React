import React from 'react';
import { connect } from 'dva'
import QueueAnim from 'rc-queue-anim'
import _ from 'lodash'
import TopTabs from '../../components/Product/TopTab.js'
import ProListView from '../../components/Product/ProListView.js'
import { CategoryLayerF } from "../../components/Product/CategoryLayer.js";
import { SortLayerF } from "../../components/Product/SortLayer.js";
import Row from '../../components/Item.js'
import styles from './Filter.css'

function Body({ children }) {
  return (
    <div className={styles.body_box}>
      {
        children
      }
    </div>
  )
}


class Filter extends React.Component {
  constructor(props) {
    super(props)
    console.log('filter-constructor');
    this.state = {
      cateLayerShow: false,
      sortLayerShow: false
    }
  }
  componentWillMount() {
    const { params, dispatch } = this.props
    dispatch({
      type: 'product-filter/fetchFilter',
      payload: { params }
    })
  }

  handleClick = (type) => {
    const { cateLayerShow, sortLayerShow } = this.state
    type === 'L'
      ? (this.setState({ cateLayerShow: !cateLayerShow, sortLayerShow: false }))
      : (this.setState({ sortLayerShow: !sortLayerShow, cateLayerShow: false }))
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
    // const { flag, sort, type } = nfp
    // history.replace(`/product/filter/${flag}/${sort}/${type}`)
    dispatch({
      type: 'product-filter/fetchFilter',
      payload: { params: this.nfp }
    })
  }

  nfp = {}
  render() {
    const { cls, page, hasMore, dispatch, data, store, fetching } = this.props
    const { cateLayerShow, sortLayerShow } = this.state
    return (
      <div className={styles.normal}>
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
            // onUpdate={(dataBlob, sectionIDs, rowIDs) => {
            //   dispatch({
            //     type: `lvStatus/clearB`,
            //     payload: {
            //       dataBlob,
            //       sectionIDs,
            //       rowIDs
            //     }
            //   })
            // }}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { page, cls, hasMore, fetching } = state[`product-filter`]
  const store = state['list-store']
  // const { dataBlob, sectionIDs, rowIDs } = state.lvStatus.b
  // const data = {
  //   dataBlob: { ...dataBlob },
  //   sectionIDs: [...sectionIDs],
  //   rowIDs: [...rowIDs]
  // }
  return { page, cls, hasMore, store, fetching };
}

export default connect(mapStateToProps)(Filter)
