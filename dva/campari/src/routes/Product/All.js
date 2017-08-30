import React from 'react';
import { connect } from 'dva';
import QueueAnim from 'rc-queue-anim'
import styles from './All.css';
import TopTabs from '../../components/Product/TopTab.js'
import ProListView from '../../components/Product/ProListView.js'
import CategoryLayer from '../../components/Product/CategoryLayer.js'
import SortLayer from '../../components/Product/SortLayer.js'

class All extends React.Component {
  constructor(props) {
    super(props)
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
  render() {
    const { cls, page, hasMore, dispatch, a } = this.props
    const { cateLayerShow, sortLayerShow } = this.state
    return (
      <div className={styles.normal}>
        <QueueAnim type={'top'}>
          {
            cateLayerShow
              ? <div className={styles.layer} key={'all-1'}><CategoryLayer /></div>
              : null
          }
        </QueueAnim>
        <QueueAnim type={'top'}>
          {
            sortLayerShow
              ? <div className={styles.layer} key={'all-1'}><SortLayer /></div>
              : null
          }
        </QueueAnim>
        <TopTabs
          onLeftClick={() => { this.handleClick('L') }}
          onRightClick={() => { this.handleClick('R') }}
        />
        <div className={styles.center_box}  onClick={this.hideAll}>
          <ProListView
            lists={cls}
            page={page}
            hasMore={hasMore}
            data={a}
            onLoadMore={() => {
              console.log('xxx');
              console.log(page);
              console.log('xxx');
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
    );
  }
}

function mapStateToProps(state) {
  const { page, cls, hasMore } = state['product-all']
  const { a } = state.lvStatus
  return { page, cls, hasMore, a };
}

export default connect(mapStateToProps)(All);
