import React from 'react'
import { connect } from 'dva'
import _ from 'lodash'
import { List, SwipeAction } from 'antd-mobile'
import QueueAnim from 'rc-queue-anim'
import Item from '../../components/Item.js'
import Loading from '../../components/Loading.js'
import styles from './MyCollection.css'

class MyCollection extends React.Component {
  componentWillMount() {
    const { store, collections, dispatch } = this.props
    if (!collections || !collections.length) {
      dispatch({ type: 'collection/fetchCollectionList' })
    }
    if (_.isEmpty(store)) {
      dispatch({ type: 'list-store/fillStore' })
    }
  }
  handleDeleteClick = id => {
    const { dispatch } = this.props
    setTimeout(() => {
      dispatch({ type: 'collection/toggleLike', payload: { id, currentStatus: true } })
    }, 200)
  }
  render() {
    const { collections, store, globalLoading } = this.props
    return (
      <div style={{ width: '100%', height: '100%', display: 'block' }}>
        {
          globalLoading
            ? <Loading />
            : (
              <QueueAnim className={styles.normal} component="div" type={['right', 'scaleY']}>
                {
                  collections.map((item) => (
                    <SwipeAction
                      key={item}
                      autoClose
                      className={styles.like}
                      right={[
                        {
                          text: '删除',
                          onPress: () => this.handleDeleteClick(item),
                          style: { backgroundColor: '#f4333c', color: '#fff' }
                        }
                      ]}
                    >
                      <Item data={store[item]} style={{ marginBottom: 0 }} />
                    </SwipeAction>
                  ))
                }
              </QueueAnim>
            )
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  const store = state['list-store']
  const collections = state.collection
  const loading = state.loading.effects
  return {
    store,
    collections,
    globalLoading: loading['collection/fetchCollectionList'] || loading['list-store/fillStore'],
    partLoading: loading['collection/toggleLike']
  }
}

export default connect(mapStateToProps)(MyCollection)
