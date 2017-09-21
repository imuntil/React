import React from 'react'
import { connect } from 'dva'
import styles from './MyCollection.css'

class MyCollection extends React.Component {
  render() {
    return (
      <div className={styles.normal}>collection</div>
    )
  }
}

function mapStateToProps(state) {
  const store = state['list-store']
  const loading = state.loading.effects
  return {
    store,
    globalLoading: loading['collection/fetchCollectionList'],
    partLoading: loading['collection/toggleLike']
  }
}

export default connect(mapStateToProps)(MyCollection)
