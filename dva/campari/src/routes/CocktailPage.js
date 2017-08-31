import React from 'react';
import { connect } from 'dva';
import styles from './CocktailPage.css';
import CTListView from '../components/Product/ProListView.js'

class CocktailPage extends React.Component {
  render() {
    const { page, cls, hasMore, c, dispatch } = this.props
    return (
      <div className={styles.normal}>
        <CTListView
          lists={cls}
          page={page}
          hasMore={hasMore}
          data={c}
          onLoadMore={() => {
            dispatch({
              type: 'cocktail/updateCLs',
              payload: {
                page: page + 1
              }
            })
          }}
          onUpdate={(dataBlob, sectionIDs, rowIDs) => {
            dispatch({
              type: 'lvStatus/updateC',
              payload: {
                dataBlob,
                sectionIDs,
                rowIDs
              }
            })
          }}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { page, cls, hasMore } = state.cocktail
  const { c } = state.lvStatus
  return { page, cls, hasMore, c };
}

export default connect(mapStateToProps)(CocktailPage);
