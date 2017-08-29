import React from 'react';
import { connect } from 'dva';
import styles from './All.css';
import TopTabs from '../../components/Product/TopTab.js'
import ProListView from '../../components/Product/ProListView.js'

class All extends React.Component {
  render() {
    const { cls, page, hasMore, dispatch } = this.props
    return (
      <div className={styles.normal}>
        <TopTabs />
        <div className="center-box">
          <ProListView
            lists={cls}
            page={page}
            hasMore={hasMore}
            onLoadMore={() => {
              dispatch({
                type: 'product-all/updateCLs',
                payload: {
                  page: page + 1
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
  return { page, cls, hasMore };
}

export default connect(mapStateToProps)(All);
