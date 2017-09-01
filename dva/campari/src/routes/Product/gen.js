import React from 'react';
import _ from 'lodash'
import { connect } from 'dva';
import QueueAnim from 'rc-queue-anim'
import styles from './All.css';
import TopTabs from '../../components/Product/TopTab.js'
import ProListView from '../../components/Product/ProListView.js'
import { CategoryLayer, CategoryLayerF } from '../../components/Product/CategoryLayer.js'
import { SortLayer, SortLayerF } from '../../components/Product/SortLayer.js'
import { test } from '../../services/status'

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
    componentWillReceiveProps(nextProps) {
      // const { fp, history } = this.props
      // const { fp: nfp } = nextProps
      // if (!_.isEqual(fp, nfp)) {
      //   console.log(nfp);
      //   const { flag, sort, type } = nfp
      //   const path = `product/filter/${flag}/${sort}/${type}`
      //   replace ? history.replace(path) : history.push(path)
      //   return
      // }
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
      const { dispatch, fp, history } = this.props
      console.log('fp', fp);
      console.log('payload', payload);
      if (_.isEqual(fp, payload)) return
      if (replace) {
        if (payload.sort && payload.sort === fp.sort) return
        const pl2 = _.omit(fp, 'sort')
        if (_.isEqual(pl2, payload)) return
      }
      console.log('lalala');
      const nfp = Object.assign({}, fp, payload)
      if (replace) {
        dispatch({
          type: 'filter-params/update',
          payload: {
            ...nfp
          }
        })
      }

      const { flag, sort, type } = nfp
      if (replace) {
        history.replace(`/product/filter/${flag}/${sort}/${type}`)
      } else {
        history.push(`/product/filter/${flag}/${sort}/${type}`)
      }
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
              replace={replace}
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
    const filterParams = state['filter-params']
    const data = {
      dataBlob: { ...dataBlob },
      sectionIDs: [...sectionIDs],
      rowIDs: [...rowIDs]
    }
    return { page, cls, hasMore, data, fp: filterParams };
  }

  return connect(mapStateToProps)(Component)
}

export default gen
