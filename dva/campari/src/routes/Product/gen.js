import React from 'react';
import { connect } from 'dva';
import QueueAnim from 'rc-queue-anim'
import styles from './Filter.css';
import TopTabs from '../../components/Product/TopTab.js'
import ProListView from '../../components/Product/ProListView.js'
import CategoryLayer from '../../components/Product/CategoryLayer.js'
import SortLayer from '../../components/Product/SortLayer.js'

function gen(pro, lv) {
  class Component extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        cateLayerShow: false,
        sortLayerShow: false
      }
    }
    componentWillMount() {
      const { params, route: { name }, dispatch } = this.props
      if (name === 'ProFilterPage') {
        dispatch({
          type: 'product-filter/fetchFilter',
          payload: { params }
        })
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
    render() {
      const { cls, page, hasMore, dispatch, data } = this.props
      const { cateLayerShow, sortLayerShow } = this.state
      return (
        <div className={styles.normal}>
          <QueueAnim type={'top'}>
            {
              cateLayerShow
                ? <div className={styles.layer} key={`${pro}-1`}><CategoryLayer /></div>
                : null
            }
          </QueueAnim>
          <QueueAnim type={'top'}>
            {
              sortLayerShow
                ? <div className={styles.layer} key={`${pro}-2`}><SortLayer /></div>
                : null
            }
          </QueueAnim>
          <TopTabs
            onLeftClick={() => { this.handleClick('L') }}
            onRightClick={() => { this.handleClick('R') }}
          />
          <div className={styles.center_box} onClick={this.hideAll}>
            <ProListView
              lists={cls}
              page={page}
              hasMore={hasMore}
              data={data}
              onLoadMore={() => {
                dispatch({
                  type: `product-${pro}/updateCLs`,
                  payload: {
                    page: page + 1
                  }
                })
              }}
              onUpdate={(dataBlob, sectionIDs, rowIDs) => {
                dispatch({
                  type: `lvStatus/update${lv}`,
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
      );
    }
  }

  function mapStateToProps(state) {
    const { page, cls, hasMore } = state[`product-${pro}`]
    const { [lv.toLowerCase()]: data } = state.lvStatus
    return { page, cls, hasMore, data };
  }

  return connect(mapStateToProps)(Component)
}

export default gen

