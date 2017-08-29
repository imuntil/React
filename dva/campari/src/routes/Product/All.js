import React from 'react';
import { connect } from 'dva';
import styles from './All.css';
import TopTabs from '../../components/Product/TopTab.js'
import ProListView from '../../components/Product/ProListView.js'

class All extends React.Component {
  render() {
    const { cls, page, hasMore, dispatch, a } = this.props
    return (
      <div className={styles.normal}>
        <TopTabs />
        <div className={styles.center_box}>
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
