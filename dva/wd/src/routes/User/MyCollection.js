import React from 'react'
import { connect } from 'dva'
import _ from 'lodash'
import { SwipeAction, Toast } from 'antd-mobile'
import QueueAnim from 'rc-queue-anim'
import Item from '../../components/Item.js'
import Loading from '../../components/Loading.js'
import styles from './MyCollection.css'
import routeLoading from '../../components/HighComponent/routeLoading'
import { addProToCart } from "../../services/cart";

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
  handleAddToCart = async (id) => {
    const { user, dispatch } = this.props
    const userid = user && user.usersid
    if (!userid) {
      // 未登录处理
      return false
    }
    const { data = {}, err } = await addProToCart({ userid, id, pronum: 1 })
    if (err || (+data.resultcode !== 1 && +data.resultcode !== 0)) {
      dispatch({
        type: 'error/dataOperationError',
        payload: { msg: '添加购物车失败', code: data.resultcode || -10 }
      })
      return false
    }
    dispatch({ type: 'makeExpire' })
    Toast.success('已加入购物车', 1)
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
                      <Item
                        onAddToCart={this.handleAddToCart}
                        data={store[item]}
                        style={{ marginBottom: 0 }}
                      />
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
  const user = state['user-info']
  return {
    store,
    collections,
    user,
    globalLoading: loading['collection/fetchCollectionList'] || loading['list-store/fillStore'],
    partLoading: loading['collection/toggleLike']
  }
}

export default connect(mapStateToProps)(routeLoading(MyCollection))
