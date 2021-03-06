import React from 'react';
import { connect } from 'dva';
import styles from './CocktailPage.css';
import CTListView from '../components/Product/ProListView.js'
import routeLoading from '../components/HighComponent/routeLoading'
import CocktailCard from '../components/CocktailCard.js'

function Card(props) {
  return <CocktailCard more width="46%" {...props} />
}
function Body({ children }) {
  return (
    <div
      className={styles.list_body}
    >
      {children}
    </div>
  )
}

class CocktailPage extends React.Component {
  render() {
    const { page, cls, hasMore, c, dispatch, store } = this.props
    return (
      <div className={styles.normal}>
        <CTListView
          lists={cls}
          page={page}
          hasMore={hasMore}
          data={c}
          store={store}
          RowComponent={Card}
          BodyComponent={Body}
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
  const { page, cls, hasMore, list } = state.cocktail
  const { c: { dataBlob, sectionIDs, rowIDs } } = state.lvStatus
  const c = {
    dataBlob: { ...dataBlob },
    sectionIDs: [...sectionIDs],
    rowIDs: [...rowIDs]
  }
  return { page, cls, hasMore, c, store: list };
}

export default connect(mapStateToProps)(routeLoading(CocktailPage));
