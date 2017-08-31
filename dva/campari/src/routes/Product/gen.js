import React from 'react';
import { connect } from 'dva';
import QueueAnim from 'rc-queue-anim'
import styles from './All.css';
import TopTabs from '../../components/Product/TopTab.js'
import ProListView from '../../components/Product/ProListView.js'
import { CategoryLayer, CategoryLayerF } from '../../components/Product/CategoryLayer.js'
import { SortLayer, SortLayerF } from '../../components/Product/SortLayer.js'

function gen(pro, lv, RowComponent, BodyComponent, replace = false) {
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
      const { cateLayerShow, sortLayerShow } = this.state
      if (!cateLayerShow && !sortLayerShow) return
      this.setState({
        cateLayerShow: false,
        sortLayerShow: false
      })
    }
    handleParamsChange = ({ ...payload }) => {
      console.log(payload);
    }
    render() {
      const { cls, page, hasMore, dispatch, data } = this.props
      const { cateLayerShow, sortLayerShow } = this.state
      const [CL, SL] = replace ? [CategoryLayerF, SortLayerF] : [CategoryLayer, SortLayer]
      return (
        <div className={styles.normal}>
          <QueueAnim type={'top'}>
            {
              cateLayerShow
                ? <div className={styles.layer} key={`${pro}-1`}><CL changeParams={this.handleParamsChange} /></div>
                : null
            }
          </QueueAnim>
          <QueueAnim type={'top'}>
            {
              sortLayerShow
                ? <div className={styles.layer} key={`${pro}-2`}><SL changeParams={this.handleParamsChange} /></div>
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
              RowComponent={RowComponent}
              BodyComponent={BodyComponent}
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
    const { dataBlob, sectionIDs, rowIDs } = state.lvStatus[lv.toLowerCase()]
    const data = {
      dataBlob: { ...dataBlob },
      sectionIDs: [...sectionIDs] ,
      rowIDs: [...rowIDs]
    }
    return { page, cls, hasMore, data };
  }

  return connect(mapStateToProps)(Component)
}

export default gen

